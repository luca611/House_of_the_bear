<?php
    include "nonCachare.php";
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
                case "getPrenotazioni":{
                    
                    # controllo se l'utente è loggato
                    if(!isset($_SESSION["email"]) || $_SESSION["email"] == ""){
                        $ret=["error"=>1, "message"=>"login richiesto"];
                        break;
                    }

                    $email = $_SESSION["email"];

                    # ricerca delle prenotazioni future dell'utente
                    if($_POST["untilDate"] == "") {
                        $ret=["error"=>1, "message"=>"data non valida"];
                    }
                    
                    $untilDate = $_POST["untilDate"];

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
                        while($row = $res->fetch_array()){
                            $prenotazioni[] = $row;
                        }
                        $ret=["error"=>0, "prenotazioni"=>$prenotazioni];
                    }
                    catch(Exception $ex){
                        $ret=["error"=>1 , "message"=>"errore interno"];
                    }
                }

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