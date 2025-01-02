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
    xhr.open("GET", "menu/daily.json");
    xhr.send();
}

function swapToMenu() {
    document.getElementById("topBar").classList.add("hidden");
    document.getElementById("main").classList.add("hidden");
    document.getElementById("menuPage").classList.remove("hidden");
    document.getElementById("dishScroll").innerHTML = "";
}

var currentMenu = 0;

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
    xhr.open("GET", "menu/daily.json");
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
    xhr.open("GET", "menu/specials.json");
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
    funzione che simula una prenotazione:
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

    const name = nameElement.value.trim().toLowerCase();
    const surname = surnameElement.value.trim().toLowerCase();
    const date = dateElement.value.trim();
    const phone = phoneElement.value.trim();
    const time = timeElement.value.trim();
    const people = peopleElement.value.trim();


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
    const openingTime = new Date(`1970-01-01T11:30:00`);
    const closingTime = new Date(`1970-01-01T15:30:00`);
    if (bookingTime < openingTime || bookingTime > closingTime) {
        error.innerText = "The resturant is open from 11:30 am to 3:30 pm .";
        timeElement.classList.add("error");
        return;
    }

    for (let i = 0; i < phone.length; i++) {
        if (phone[i] < '0' || phone[i] > '9') {
            error.innerText = "The phone number can only contain numbers.";
            phoneElement.classList.add("error");
            return;
        }
    }

    if (phone.length !== 10) {
        error.innerText = "The phone number must be 10 digits long.";
        phoneElement.classList.add("error");
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

    alert("Booking submitted successfully!");
    let booking = {
        name: name,
        surname: surname,
        date: date,
        phone: phone,
        time: time,
        people: people
    }
    localStorage.setItem("booking", JSON.stringify(booking));

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