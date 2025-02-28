let bookings = [];

/*
    classe prenotazione:

    name: nome del cliente
    surname: cognome del cliente
    people: numero di persone
    date: data della prenotazione
    time: orario della prenotazione
    phone: numero di telefono del cliente
*/

function Booking(name, surname, people, date, time, phone) {
    this.name = name
    this.surname = surname
    this.people = people
    this.date = date
    this.time = time
    this.phone = phone
}

Booking.prototype = {
    constructor: Booking,
    getName: function () {
        return this.name
    },
    getSurname: function () {
        return this.surname
    },
    getPeople: function () {
        return this.people
    },
    getDate: function () {
        return this.date
    },
    getTime: function () {
        return this.time
    },
    getPhone: function () {
        return this.phone
    }
}

/*
    funzione per mostrare un piatto del giorno nella pagina principale:
*/
function showTodaysSpecial() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        try {
            const dishes = JSON.parse(xhr.responseText);
            const today = new Date().getDay();
            const todayDishes = dishes[today];
            document.getElementById("dailyMenuImg").src = todayDishes.dish2.img_url;
        } catch (e) {
            console.log("Errore di parsing");
        }
    }
    xhr.onerror = function () {
        console.log("Errore di comunicazione");
    }
    xhr.open("GET", "menu/daily.json" + "?n" + Math.random());
    xhr.send();
}

/*
    funczione che nasconde la pagina principale e mostra la pagina del menu:
*/
function swapToMenu() {
    document.getElementById("topBar").classList.add("hidden");
    document.getElementById("main").classList.add("hidden");
    document.getElementById("menuPage").classList.remove("hidden");
    document.getElementById("dishScroll").innerHTML = "";
}

/*
    funzione che si occupa di appendere un piatto alla pagina del menu:
*/

function appendDish(title, description, img_url, allergens, price) {
    const cont = document.createElement("div");
    cont.classList.add("dish");
    const img = document.createElement("img");
    img.src = img_url;
    img.classList.add("dishImage");
    cont.appendChild(img);

    const infoCont = document.createElement("div");
    infoCont.classList.add("dishInfo");

    const name = document.createElement("h3");
    name.innerText = title;
    name.classList.add("dishTitle");

    const desc = document.createElement("p");
    desc.innerText = description;
    desc.classList.add("dishDescription");

    const allergensCont = document.createElement("div");
    allergensCont.classList.add("allergens");

    allergens.forEach(a => {
        const allergen = document.createElement("img");
        switch (a) {
            case 0:
                allergen.src = "resources/icons/gluten.svg";
                break;
            case 1:
                allergen.src = "resources/icons/soy.svg";
                break;
            case 2:
                allergen.src = "resources/icons/nuts.svg";
                break;
            case 3:
                allergen.src = "resources/icons/corn.svg";
                break;
            default:
                return;
        }
        allergen.classList.add("allergen");
        allergensCont.appendChild(allergen);
    });

    const priceEl = document.createElement("p");
    priceEl.classList.add("dishPrice");
    priceEl.innerText = "€" + price;

    infoCont.appendChild(name);
    infoCont.appendChild(desc);
    infoCont.appendChild(allergensCont);
    infoCont.appendChild(priceEl);
    cont.appendChild(infoCont);
    document.getElementById("dishScroll").appendChild(cont);
}

/*
    funzione per caricare il menu del giorno:
*/
function loadDailyMenu() {
    swapToMenu();
    document.getElementById("menuTitle").innerText = "Daily Menu";

    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        try {
            const dishes = JSON.parse(xhr.responseText);
            currentMenu = dishes;
            const today = new Date().getDay();
            const todayDishes = dishes[today];
            Object.values(todayDishes).forEach(e => {
                appendDish(e.title, e.description, e.img_url, e.allergenes, e.price);
            });

        } catch (e) {
            console.log("Errore di parsing");
        }
    }
    xhr.onerror = function () {
        console.log("Errore di comunicazione");
    }
    xhr.open("GET", "menu/daily.json" + "?n" + Math.random());
    xhr.send();
}

/*
    funzione che carica i dessert:
*/

function loadDesserts() {
    swapToMenu();
    document.getElementById("menuTitle").innerText = "Desserts";
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        try {
            const dishes = JSON.parse(xhr.responseText);
            dishes.forEach(e => {
                appendDish(e.title, e.description, e.img_url, e.allergenes, e.price);
            });
        } catch (e) {
            console.log("Errore di parsing");
        }
    }
    xhr.onerror = function () {
        console.log("Errore di comunicazione");
    }
    xhr.open("GET", "menu/desserts.json");
    xhr.send();
}

/*
    funzione che carica i primi:
*/

function loadFirstCourses() {
    swapToMenu();
    document.getElementById("menuTitle").innerText = "Mains Courses";
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        try {
            const dishes = JSON.parse(xhr.responseText);
            dishes.forEach(e => {
                appendDish(e.title, e.description, e.img_url, e.allergenes, e.price);
            });
        } catch (e) {
            console.log("Errore di parsing");
        }
    }
    xhr.onerror = function () {
        console.log("Errore di comunicazione");
    }
    xhr.open("GET", "menu/dish.json");
    xhr.send();
}

/*
    funzione che carica i drink:
*/

function loadDrinks() {
    swapToMenu();
    document.getElementById("menuTitle").innerText = "Drinks";
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        try {
            const dishes = JSON.parse(xhr.responseText);
            dishes.forEach(e => {
                appendDish(e.title, e.description, e.img_url, e.allergenes, e.price);
            });
        } catch (e) {
            console.log("Errore di parsing");
        }
    }
    xhr.onerror = function () {
        console.log("Errore di comunicazione");
    }
    xhr.open("GET", "menu/drink.json");
    xhr.send();
}

/*
    funzione che carica gli special dello chef:
*/

function loadChefSpecials() {
    swapToMenu();
    document.getElementById("menuTitle").innerText = "Chef Specials";
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        try {
            const dishes = JSON.parse(xhr.responseText);
            dishes.forEach(e => {
                appendDish(e.title, e.description, e.img_url, e.allergenes, e.price);
            });
        } catch (e) {
            console.log("Errore di parsing");
        }
    }
    xhr.onerror = function () {
        console.log("Errore di comunicazione");
    }
    xhr.open("GET", "menu/specials.json" + "?n" + Math.random());
    xhr.send();
}

/*
    funzione per mostrare la pagina principale:
*/
function closeMenu() {
    document.getElementById("topBar").classList.remove("hidden");
    document.getElementById("main").classList.remove("hidden");
    document.getElementById("menuPage").classList.add("hidden");
}

/*
    funzione per mostrare la pagina di prenotazione:
*/
function showbooking() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        try {
            const response = JSON.parse(xhr.responseText);
            if (response.error == "0") {
                showDashboard();
            }
            else {
                document.getElementById("topBar").classList.add("hidden");
                document.getElementById("main").classList.add("hidden");
                document.getElementById("bookPage").classList.remove("hidden");

                isLogged(function (isLogged) {
                    if (isLogged) {
                        console.log("logged");
                        document.getElementById("booking").classList.remove("hidden");
                        document.getElementById("login").classList.add("hidden");
                    } else {
                        console.log("not logged");
                        document.getElementById("booking").classList.add("hidden");
                        document.getElementById("login").classList.remove("hidden");
                    }
                });
            }
        } catch (e) {
            console.log("Errore di parsing");
        }
    }

    xhr.onerror = function () {
        console.log("Errore di comunicazione");
    }

    xhr.open("GET", "./php/api.php?op=isAdmin");
    xhr.send();
}

function toggleForm() {
    document.getElementById("loginForm").classList.toggle("hidden");
    document.getElementById("registerForm").classList.toggle("hidden");
}

/*
    funzione per verificare che sia loggato
*/
function isLogged(action) {
    let xhr = new XMLHttpRequest();

    xhr.onload = function () {
        let response = JSON.parse(xhr.responseText);
        console.log(response.error);
        if (response.error == "0") {
            action(true);
        } else {
            action(false);
        }
    }

    xhr.onerror = function () {
        console.log("Errore di comunicazione");
        action(false);
    }

    xhr.open("GET", "./php/api.php?op=isLogged");
    xhr.send();
}

/*
    funzione per mostrare la pagina principale:
*/
function closeBooking() {
    document.getElementById("topBar").classList.remove("hidden");
    document.getElementById("main").classList.remove("hidden");
    document.getElementById("bookPage").classList.add("hidden");
}

/*
    funzione che simula una prenotazione con tutti i possibli controlli che mi veniano in mente:
*/

function submitBooking() {
    const error = document.getElementById("error");
    error.innerText = "";

    const nameElement = document.getElementById("name");
    const surnameElement = document.getElementById("surname");
    const dateElement = document.getElementById("date");
    const phoneElement = document.getElementById("phoneNumber");
    const timeElement = document.getElementById("time");
    const peopleElement = document.getElementById("people");

    nameElement.classList.remove("error");
    surnameElement.classList.remove("error");
    dateElement.classList.remove("error");
    phoneElement.classList.remove("error");
    timeElement.classList.remove("error");
    peopleElement.classList.remove("error");

    let name = nameElement.value.trim().toLowerCase();
    let surname = surnameElement.value.trim().toLowerCase();
    let date = dateElement.value.trim();
    let phone = phoneElement.value.trim();
    let time = timeElement.value.trim();
    let people = peopleElement.value.trim();


    if (name === "" || surname === "" || phone === "" || date === "" || time === "" || people === "") {
        error.innerText = "Please fill all the fields";
        if (name === "") {
            nameElement.classList.add("error");
        }
        if (surname === "") {
            surnameElement.classList.add("error");
        }
        if (date === "") {
            dateElement.classList.add("error");
        }
        if (phone === "") {
            phoneElement.classList.add("error");
        }
        if (time === "") {
            timeElement.classList.add("error");
        }
        if (people === "") {
            peopleElement.classList.add("error");
        }
        return;
    }

    // controllo che la data sia valida ossia non prima di oggi, non oltre 6 mesi e che sia un giorno in cui il ristorante è aperto

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!isAfter(date, today)) {
        error.innerText = "The booking date cannot be in the past.";
        dateElement.classList.add("error");
        return;
    }

    const maxBookingDate = new Date();
    maxBookingDate.setMonth(maxBookingDate.getMonth() + 6);

    if (isAfter(date, maxBookingDate)) {
        error.innerText = "The booking date cannot be more than 6 months in the future.";
        dateElement.classList.add("error");
        return;
    }

    const timeParts = time.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    if (hours < 11 || (hours === 11 && minutes < 30) || hours > 15 || (hours === 15 && minutes > 30)) {
        error.innerText = "The restaurant is open from 11:30 am to 3:30 pm.";
        timeElement.classList.add("error");
        return;
    }

    const currentDateTime = new Date();
    const bookingDateTime = new Date(date + 'T' + time + ':00');

    if (bookingDateTime < currentDateTime) {
        error.innerText = "The booking time cannot be in the past.";
        timeElement.classList.add("error");
        return;
    }


    // controllo che il numero di telefono sia un numero e che il numero di cifre sia corretto

    if (phone.length !== 10) {
        error.innerText = "The phone number must be 10 digits long.";
        phoneElement.classList.add("error");
        return;
    }

    phone = Number(phone);

    if (isNaN(phone)) {
        error.innerText = "The phone number must contain only numbers.";
        phoneElement.classList.add("error");
        return;
    }

    // controllo che il numero di persone sia un numero e che il valore sia valido
    people = Number(people);

    if (isNaN(people)) {
        error.innerText = "The number of people must be a number.";
        peopleElement.classList.add("error");
        return;
    }

    if (people < 1) {
        error.innerText = "The number of people must be at least 1.";
        peopleElement.classList.add("error");
        return;
    }

    if (people > 10) {
        error.innerText = "The number of people cannot exceed 10.";
        peopleElement.classList.add("error");
        return;
    }

    // se tutto è andato bene creo la prenotazione e la salvo

    let booking = new Booking(name, surname, people, date, time, phone);
    bookings.push(booking);
    saveBooking();

    alert("Booking submitted successfully!");

    nameElement.value = "";
    surnameElement.value = "";
    dateElement.value = "";
    phoneElement.value = "";
    timeElement.value = "";
    peopleElement.value = "";
}

function isAfter(date1, date2) {
    return new Date(date1) > new Date(date2);
}

/*
    funzione che salva le prenotazioni sul local storage:
*/
function saveBooking() {
    localStorage.bookings = JSON.stringify(bookings);
}

/*
    funzione per caricare le recensioni:
*/
function loadReviews() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        try {
            document.getElementById("reviewScroll").innerHTML = "";
            const reviews = JSON.parse(xhr.responseText);
            reviews.forEach(e => {
                appendReview(e.name, e.comment, e.rating);
            });
        } catch (e) {
            console.log("Errore di parsing");
        }
    }
    xhr.onerror = function () {
        console.log("Errore di comunicazione");
    }
    xhr.open("GET", "reviews/reviews.json" + "?n" + Math.random());
    xhr.send();
}

/*
    funzione che si occupa di mostrare una recensione sulla pagina:
*/
function appendReview(name, comment, rating) {
    const cont = document.createElement("div");
    cont.classList.add("review");

    const commentEl = document.createElement("p");
    commentEl.innerText = comment;
    commentEl.classList.add("reviewComment");

    const ratingCont = document.createElement("div");
    ratingCont.classList.add("rating");

    for (let i = 0; i < rating; i++) {
        const star = document.createElement("img");
        star.src = "resources/icons/star.svg";
        star.classList.add("star");
        ratingCont.appendChild(star);
    }

    const nameEl = document.createElement("p");
    nameEl.innerText = name;
    nameEl.classList.add("reviewName");

    cont.appendChild(commentEl);
    cont.appendChild(ratingCont);
    cont.appendChild(nameEl);
    document.getElementById("reviewScroll").appendChild(cont);
}

/*
    funzione che carica l'evento dal file JSON:
*/
function loadAd() {
    console.log("loadAd");
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        try {
            const adList = Object.entries(JSON.parse(xhr.responseText));
            console.log(adList);
            let ad;
            adList.forEach(e => {
                console.log(e);
                let oggi = new Date();
                if (typeof ad === 'undefined' || isAfter(new Date(e[1].ending_date), oggi) && isAfter(new Date(ad.ending_date), e[1].ending_date)) {
                    ad = e[1];
                }
            });
            const adContainer = document.getElementById("ad");

            const img = document.createElement("img");
            img.src = ad.bg_url;
            img.classList.add("eventBg");

            const content = document.createElement("div");
            content.classList.add("eventContent");

            const name = document.createElement("h3");
            name.innerText = ad.name;
            name.classList.add("eventName");

            const separator1 = document.createElement("hr");
            separator1.classList.add("eventSeparator");

            const description = document.createElement("p");
            description.innerText = ad.description;
            description.classList.add("eventDescription");

            const separator2 = document.createElement("hr");
            separator2.classList.add("eventSeparator");

            const date = document.createElement("p");
            date.innerText = ad.ending_date;
            date.classList.add("eventDate");

            content.appendChild(name);
            content.appendChild(separator1);
            content.appendChild(description);
            content.appendChild(separator2);
            content.appendChild(date);

            adContainer.appendChild(img);
            adContainer.appendChild(content);

        } catch (e) {
            console.log("Errore di parsing");
        }
    }
    xhr.onerror = function () {
        console.log("Errore di comunicazione");
    }
    xhr.open("GET", "events/events.json" + "?n" + Math.random());
    xhr.send();
}


//--------------------------Funzioni API e nuove-------------------------------

function login() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        let response = JSON.parse(xhr.responseText);
        if (response.error == "0") {
            redirectUser();
        } else {
            document.getElementById("loginError").innerText = "Email o password errati";
        }
    }

    xhr.onerror = function () {
        console.log("Errore di comunicazione");
    }

    xhr.open("POST", "./php/api.php?op=login");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("email=" + email + "&password=" + password);
}


function register() {
    let email = document.getElementById("registerEmail").value.trim();
    let password = document.getElementById("registerPassword").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();

    let prefix = document.getElementById("registerPrefix").value;
    let phoneNumber = document.getElementById("phone").value.trim();

    if (password !== confirmPassword) {
        document.getElementById("registerError").innerText = "Passwords do not match";
        return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
        document.getElementById("registerError").innerText = "Invalid phone number";
        return;
    }

    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        let response = JSON.parse(xhr.responseText);
        if (response.error == "0") {
            redirectUser();
        } else {
            document.getElementById("registerError").innerText = response.message;
        }
    }

    xhr.onerror = function () {
        console.log("Errore di comunicazione");
    }

    xhr.open("POST", "./php/api.php?op=registrazione");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("email=" + email + "&password=" + password + "&cellulare=" + prefix + phoneNumber);
}


/*
    funzione per mostrare la dashboard se admin o la pagina di prenotazione se utente normale:
*/
function redirectUser() {
    let xhr = new XMLHttpRequest();

    xhr.onload = function () {
        let response = JSON.parse(xhr.responseText);
        if (response.error == "0") {
            console.log("admin");
            showDashboard();
        } else {
            console.log("user");
            showbooking();
        }
    }

    xhr.onerror = function () {
        console.log("Errore di comunicazione");
    }

    xhr.open("GET", "./php/api.php?op=isAdmin");
    xhr.send();
}

function showDashboard() {
    document.getElementById("bookPage").classList.add("hidden");
    document.getElementById("topBar").classList.add("hidden");
    document.getElementById("main").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    loadBookings();
}

/* 
    0: passato
    1: oggi
    2: settimana
    3: mese
*/
let rangeFilter = 1;
let loadedBookings = [];

function loadBookings() {
    document.getElementById("reservationList").innerHTML = "";
    let xhr = new XMLHttpRequest();

    xhr.onload = function () {
        let response = JSON.parse(xhr.responseText);
        if (response.error == "1" || response.prenotazioni.length == 0) {
            document.getElementById("reservationPlaceholder").classList.remove("hidden");
            document.getElementById("reservationList").classList.add("hidden");
            return;
        }
        document.getElementById("reservationPlaceholder").classList.add("hidden");
        document.getElementById("reservationList").classList.remove("hidden");

        loadedBookings = response.prenotazioni;
        showFilteredBookings(loadedBookings);
    }

    xhr.onerror = function () {
        console.log("Errore di comunicazione");
    }

    let url = "./php/api.php?op=";
    switch (rangeFilter) {
        case 0:
            url += "getStorico";
            break;
        case 1:
            url += "getPrenotazioni&untilDate=" + new Date(new Date().setHours(24, 0, 0, 0)).toISOString();
            break;
        case 2:
            url += "getPrenotazioni&untilDate=" + new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
            break;
        case 3:
            let endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
            endOfMonth.setHours(23, 59, 59, 999);
            url += "getPrenotazioni&untilDate=" + endOfMonth.toISOString();
            break;
        default:
            break;
    }

    xhr.open("GET", url);
    xhr.send();
}

function timeFilter(filter) {
    let buttons = document.getElementsByClassName("arrayButton");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("selected");
    }

    buttons[filter].classList.add("selected");
    rangeFilter = filter;
    loadBookings();
}

function appendBooking(id, idUtente, idTavolo, dataora, numPersone, note) {
    let cont = document.createElement("div");
    cont.classList.add("reservation");
    cont.id = id;
    cont.onclick = function () {
        openReservation(id);
    };


    let emailEl = document.createElement("p");
    emailEl.classList.add("email");
    emailEl.innerText = idUtente;

    let tableEl = document.createElement("p");
    tableEl.classList.add("table");
    tableEl.innerText = idTavolo;

    let peopleEl = document.createElement("p");
    peopleEl.classList.add("people");
    peopleEl.innerText = numPersone;

    let dateEl = document.createElement("p");
    dateEl.classList.add("date");
    dateEl.innerText = dataora;

    let noteEl = document.createElement("p");
    noteEl.classList.add("note");
    noteEl.innerText = note;

    cont.appendChild(emailEl);
    cont.appendChild(tableEl);
    cont.appendChild(peopleEl);
    cont.appendChild(dateEl);
    cont.appendChild(noteEl);

    document.getElementById("reservationList").appendChild(cont);
}

function showFilteredBookings(booking = loadedBookings) {
    document.getElementById("reservationList").innerHTML = "";
    if (document.getElementById("filterEmailCheckbox").checked && document.getElementById("filterEmail").value.trim() !== "") {
        booking = booking.filter(e => e.idUtente === document.getElementById("filterEmail").value);
    }

    if (document.getElementById("filtertableCheckbox").checked && document.getElementById("filterTable").value.trim() !== "") {
        if (Number(document.getElementById("filterTable").value)) {
            booking = booking.filter(e => e.idTavolo === Number(document.getElementById("filterTable").value));
        }
    }

    if (booking.length == 0) {
        document.getElementById("reservationPlaceholder").classList.remove("hidden");
        document.getElementById("reservationList").classList.add("hidden");
        return;
    }

    document.getElementById("reservationPlaceholder").classList.add("hidden");
    document.getElementById("reservationList").classList.remove("hidden");
    booking.forEach(e => {
        appendBooking(e.id, e.idUtente, e.idTavolo, e.dataora, e.numPersone, e.note);
    });
}


function closeDashboard() {
    document.getElementById("topBar").classList.remove("hidden");
    document.getElementById("main").classList.remove("hidden");
    document.getElementById("dashboard").classList.add("hidden");
}

function openPopup() {
    document.getElementById("popUp").classList.remove("closed");
    document.getElementById("overlay").classList.remove("hidden");
}

function closePopup() {
    document.getElementById("popUp").classList.add("closed");
    document.getElementById("overlay").classList.add("hidden");
}

function openReservation(id) {
    let email = document.getElementById("popUpemail");
    let table = document.getElementById("popUptable");
    let people = document.getElementById("popUppeople");
    let date = document.getElementById("popUpdate");
    let note = document.getElementById("popUpnote");
    let phone = document.getElementById("popUpphone");
    let emailbtn = document.getElementById("emailButton");

    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        try {
            console.log(xhr.responseText);
            const response = JSON.parse(xhr.responseText);
            if (response.error === 0) {
                email.innerText = "Email: " + response.prenotazione.email;
                phone.innerText = "Phone: " + response.prenotazione.cellulare;
                table.innerText = "Table: " + response.prenotazione.idTavolo;
                date.innerText = "Date: " + response.prenotazione.dataora;
                people.innerText = "People: " + response.prenotazione.nPersone;
                note.innerText = "Additional Notes: " + response.prenotazione.note;
                emailbtn.onclick = function () {
                    window.location.href = "mailto:" + response.prenotazione.email;
                };
                openPopup();
            } else {
                console.log("Error loading reservation details error: " + response.error);
            }
        } catch (e) {
            console.log("Parsing error " + e);
        }
    };

    xhr.onerror = function () {
        console.log("Communication error");
    };

    xhr.open("GET", "http://localhost:80/resturantSite/php/api.php?op=getAllInformazioni&id=" + id);
    xhr.send();
}