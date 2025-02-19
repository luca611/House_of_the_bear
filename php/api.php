<?php
    include "noCache.php";
    include "_db.php";
    session_start();
    header("Content-type: application/json, charset=utf-8");
    if(!isset($_SESSION["email"])){
        $_SESSION["email"]="";
        $_SESSION["isAdmin"] = FALSE;
    }
    if(!isset($_GET["op"])){
        $ret=["error"=>1];
    }else{
        try{
            $conn=new mysqli($db_hostname, $db_username, $db_password, $db_name);
            switch($_GET["op"]){
                
                # ---------------- Gestione utenti ----------------

                # API per la registrazione
                # parametri: email, password, cellulare
                case "registrazione":{

                    # controllo parametri
                    if(!isset($_POST["email"]) || !isset($_POST["password"]) || !isset($_POST["cellulare"])){
                        $ret=["error"=>1, "message"=>"parametri mancanti"];
                        break;
                    }

                    if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
                        $ret=["error"=>1, "message"=>"email non valida"];
                        break;
                    }

                    # pulizia parametri ricevuti in ingresso

                    $email = trim($_POST["email"]);

                    $password = trim($_POST["password"]);
                    $password = hash("sha256", preg_replace('/\s+/u', '', $password));

                    $cellulare = trim($_POST["cellulare"]);

                    # inserimento nel database 
                    try{
                        $q=$conn->prepare("insert into utenti(email, password, cellulare) values (?, ?, ?)");
                        $q->bind_param("sss", $email, $password, $cellulare);
                        $q->execute();
                        $q->close();
                        $_SESSION["email"]= $email;

                        # registrazione avvenuta con successo
                        $ret=["error"=>0];
                    }
                    catch(Exception $ex){
                        # errore riscontrato nella query (principalmente duplicazione di chiave primaria -> utente già esistente)
                        $ret=["error"=>1 , "message"=>"account già esistente"];
                    }
                } break;


                # API per il login
                # parametri: email, password
                # risposta: error = 0 se il login è avvenuto con successo, error=1 altrimenti con un messaggio di errore
                case "login":{
                    if(!isset($_POST["email"]) || !isset($_POST["password"])){
                        $ret=["error"=>1, "message"=>"parametri mancanti"];
                        break;
                    }

                    # pulizia dei parametri ricevuti in ingresso
                    $email = trim($_POST["email"]);
                    $password = hash("sha256", preg_replace('/\s+/u', '', $_POST["password"]));

                    # ricerca dell'utente nel database
                    try{
                        $q=$conn->prepare("select * from utenti where email=? and password=?");
                        $q->bind_param("ss", $email, $password);
                        $q->execute();
                        $res = $q->get_result();
                        if($res->num_rows == 0){
                            # se non sono presenti risultati, l'utente non esiste
                            $ret=["error"=>1, "message"=>"email o password errati"];
                        }else{
                            # verifico se l'utente è un admin

                            $res = $res->fetch_array();
                            if ($res["isAdmin"] == 1) {
                                $_SESSION["isAdmin"] = TRUE;
                            } else {
                                $_SESSION["isAdmin"] = FALSE;
                            }

                            $_SESSION["email"]= $email;
                            $ret=["error"=>0];
                        }
                    }
                    catch(Exception $ex){
                        # errore riscontrato nella query
                        $ret=["error"=>1 , "message"=>"errore interno"];
                    }
                } break;

                # ---------------- Gestione sessione ----------------

                # API per verificare che l'utente sia loggato
                # risposta: error = 0 se l'utente è loggato, error=1 altrimenti
                case "isLogged":{
                    if(isset($_SESSION["email"]) && $_SESSION["email"] != ""){
                        $ret=["error"=>0];
                    }else{
                        $ret=["error"=>1, "message"=>"non loggato"];
                    }
                }break;

                # API per il logout (elimina la sessione)
                case "logout":{
                    session_unset();
                    setcookie("PHPSESSID", "", 0, "/");
                    $ret=["error"=>0];
                }break;

                # ---------------- Gestione ordinazioni ----------------
                
                # API per la visualizzazione delle ordinazioni future
                # parametri: untilDate (data massima delle ordinazioni da visualizzare)
                # risposta: error = 0 se l'operazione è avvenuta con successo con array delle prenotazioni, error=1 altrimenti con un messaggio di errore
                case "getPrenotazioni":{
                    
                    # controllo se l'utente è loggato
                    if(!isset($_SESSION["email"]) || $_SESSION["email"] == ""){
                        $ret=["error"=>1, "message"=>"login richiesto"];
                        break;
                    }

                    $email = $_SESSION["email"];

                    # ricerca delle prenotazioni future dell'utente
                    if($_GET["untilDate"] == "") {
                        $ret=["error"=>1, "message"=>"data non valida"];
                    }
                    
                    $untilDate = $_GET["untilDate"];

                    # ricerca delle prenotazioni future
                    try{
                        # se è un utente normale, visualizza solo le sue prenotazioni future
                        if($_SESSION["isAdmin"] === FALSE){
                            $q=$conn->prepare("select * from prenotazioni where idUtente=? and dataora >= CURRENT_DATE() and dataora <= ? order by dataora");
                            $q->bind_param("ss", $email, $untilDate);
                        }else{
                            # se è un admin, visualizza tutte le prenotazioni future
                            $q=$conn->prepare("select * from prenotazioni where dataora >= CURRENT_DATE() and dataora <= ? order by dataora");
                            $q->bind_param("s", $untilDate);
                        }
                        
                        $q->execute();
                        $res = $q->get_result();
                        $prenotazioni = [];
                        while($row = $res->fetch_assoc()){
                            $prenotazioni[] = $row;
                        }
                        $ret=["error"=>0, "prenotazioni"=>$prenotazioni];
                    }
                    catch(Exception $ex){
                        $ret=["error"=>1 , "message"=>"errore interno"];
                    }
                }break;

                # API per la creazione di una nuova prenotazione
                # parametri: dataora, numPersone, tavolo, note
                # risposta: error = 0 se l'operazione è avvenuta con successo, error=1 altrimenti con un messaggio di errore
                case "addPrenotazione":{
                    # controllo se l'utente è loggato
                    if(!isset($_SESSION["email"]) || $_SESSION["email"] == ""){
                        $ret=["error"=>1, "message"=>"login richiesto"];
                        break;
                    }

                    $email = $_SESSION["email"];

                    # controllo parametri
                    if(!isset($_POST["dataora"]) || !isset($_POST["numPersone"]) || !isset($_POST["tavolo"])){
                        $ret=["error"=>1, "message"=>"parametri mancanti"];
                        break;
                    }

                    # se non è presente la nota, essendo facoltativa, la imposto come stringa vuota
                    $note = isset($_POST["note"]) ? $_POST["note"] : "";

                    # controllo se la data/ora è valida
                    $dataora = $_POST["dataora"];
                    $currentDateTime = new DateTime();
                    $reservationDateTime = new DateTime($dataora);

                    # controllo se la data/ora è valida (non passata)
                    if ($reservationDateTime < $currentDateTime) {
                        $ret=["error"=>1, "message"=>"data non valida"];
                        break;
                    }

                    # controllo se l'ora è valida (dalle 11:30 alle 15:30)
                    $reservationHour = (int)$reservationDateTime->format('H');
                    $reservationMinute = (int)$reservationDateTime->format('i');

                    if (($reservationHour < 11 || ($reservationHour == 11 && $reservationMinute < 30)) || 
                        ($reservationHour > 15 || ($reservationHour == 15 && $reservationMinute > 30))) {
                        $ret=["error"=>1, "message"=>"orario non valido"];
                        break;
                    }

                    $numPersone = $_POST["numPersone"];
                    $tavolo = $_POST["tavolo"];

                    # controllo se il tavolo è abbastanza capiente per il numero di persone
                    try{
                        $q=$conn->prepare("SELECT maxposti FROM tavoli WHERE id = ?");
                        $q->bind_param("s", $tavolo);
                        $q->execute();
                        $res = $q->get_result();
                        $row = $res->fetch_assoc();
                        if ($row) {
                            $maxposti = $row["maxposti"];
                        } else {
                            $ret=["error"=>1, "message"=>"tavolo non trovato"];
                            break;
                        }
                    }
                    catch(Exception $ex){
                        $ret=["error"=>1 , "message"=>"errore interno"];
                    }

                    if ($numPersone > $maxposti) {
                        $ret=["error"=>1, "message"=>"tavolo non abbastanza capiente"];
                        break;
                    }
                    
                    # controllo se ci sono abbondanti posti per la prenotazione in quella fascia oraria
                    try{
                        # ottengo le prenotazioni per quel tavolo in quella data
                        $q=$conn->prepare("SELECT * FROM prenotazioni WHERE idTavolo = ?");
                        $q->bind_param("s", $tavolo);
                        $q->execute();
                        $res = $q->get_result();

                        # controllo se c'è un ordinazione per quel tavolo meno di un'ora prima o entro un ora dopo
                        $occupato = FALSE;
                        $firstBefore = null;
                        $firstAfter = null;
                        while($row = $res->fetch_assoc()){
                            $reservationDateTimeDB = new DateTime($row["dataora"]);
                            if ($reservationDateTimeDB < $reservationDateTimeDB) {
                                if ($firstBefore === null || $reservationDateTimeDB > $firstBefore) {
                                    $firstBefore = $reservationDateTimeDB;
                                }
                            } else {
                                if ($firstAfter === null || $reservationDateTimeDB < $firstAfter) {
                                    $firstAfter = $reservationDateTimeDB;
                                }
                            }
                        }
                        
                        if($firstBefore !== null) {
                            $diffBefore = $firstBefore->diff($reservationDateTime);
                            if ($diffBefore->h < 1) {
                                $occupato = TRUE;
                            }
                        }

                        if($firstAfter !== null) {
                            $diff = $reservationDateTime->diff($firstAfter);
                            if ($diff->h < 1) {
                                $occupato = TRUE;
                            }
                        }
                        
                        if($occupato === TRUE){
                            $ret=["error"=>1, "message"=>"tavolo già occupato", "firstBefore"=>$firstBefore, "firstAfter"=>$firstAfter, "reservationDateTime"=>$reservationDateTime,"diffBefore"=>$diffBefore, "diff"=>$diff];
                            break;
                        }
                    }catch(Exception $ex){
                        $ret=["error"=>1 , "message"=>"errore interno"];
                    }

                    # aggiunta della prenotazione
                    try{
                        $q=$conn->prepare("insert into prenotazioni(idUtente, dataora, numPersone, idTavolo, note) values (?, ?, ?, ?,?)");
                        $q->bind_param("sssss", $email, $dataora, $numPersone, $tavolo, $note);
                        $q->execute();
                        $q->close();
                        $ret=["error"=>0];
                    }
                    catch(Exception $ex){
                        $ret=["error"=>1 , "message"=>"errore interno"];
                    }

                }break;

                # API per la cancellazione di una prenotazione
                # parametri: id
                # risposta: error = 0 se l'operazione è avvenuta con successo, error=1 altrimenti con un messaggio di errore
                case "deletePrenotazione":{
                    # controllo se l'utente è loggato
                    if(!isset($_SESSION["email"]) || $_SESSION["email"] == ""){
                        $ret=["error"=>1, "message"=>"login richiesto"];
                        break;
                    }

                    $email = $_SESSION["email"];

                    # controllo parametri
                    if(!isset($_GET["id"])){
                        $ret=["error"=>1, "message"=>"parametri mancanti"];
                        break;
                    }

                    $id = $_GET["id"];

                    # controllo se l'utente è autorizzato a cancellare la prenotazione
                    try{
                        # verifico se esiste la prenotazione con distizione tra utente normale e admin
                        if($_SESSION["isAdmin"] === TRUE){
                            $q=$conn->prepare("select * from prenotazioni where id=?");
                            $q->bind_param("s", $id);
                        }else{
                            $q=$conn->prepare("select * from prenotazioni where id=? and idUtente=?");
                            $q->bind_param("ss", $id, $email);
                        }

                        # verifica della presenza della prenotazione
                        $q->execute();
                        $res = $q->get_result();
                        if($res->num_rows == 0){
                            $ret=["error"=>1, "message"=>"non trovato"];
                        }else{
                            # cancellazione della prenotazione
                            $q=$conn->prepare("delete from prenotazioni where id=?");
                            $q->bind_param("s", $id);
                            $q->execute();
                            $q->close();
                            $ret=["error"=>0];
                        }
                    }
                    catch(Exception $ex){
                        $ret=["error"=>1 , "message"=>"errore interno"];
                    }
                }break;


                # ---------------- altro  ----------------

                # Caso in cui l'operazione richiesta non è valida
                default:{
                    $ret=["error"=>1, "message"=>"operazione non valida"];
                } break;
            }
        }catch(Exception $ex){
            $ret=["error"=>1];
        }
    }
    echo json_encode($ret);
?>