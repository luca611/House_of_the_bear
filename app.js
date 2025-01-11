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
    document.getElementById("topBar").classList.add("hidden");
    document.getElementById("main").classList.add("hidden");
    document.getElementById("bookPage").classList.remove("hidden");
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

    const bookingTime = new Date(`1970-01-01T${time}:00`);
    const openingTime = new Date('1970-01-01T11:30:00');
    const closingTime = new Date('1970-01-01T15:30:00');

    if (bookingTime < openingTime || bookingTime > closingTime) {
        error.innerText = "The restaurant is open from 11:30 am to 3:30 pm.";
        timeElement.classList.add("error");
        return;
    }

    const currentDateTime = new Date();
    const bookingDateTime = new Date(`${date}T${time}:00`);

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