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
    name.textContent = title;
    name.classList.add("dishTitle");

    const desc = document.createElement("p");
    desc.textContent = description;
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
    priceEl.textContent = "€" + price;

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

    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        try {
            const dishes = JSON.parse(xhr.responseText);
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
function showMain() {
    document.getElementById("main").classList.remove("hidden");
    document.getElementById("menuPage").classList.add("hidden");
}