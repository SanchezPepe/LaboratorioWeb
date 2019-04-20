// Idiomas
var idiomas;

// Makes the API call and creates an array of objects with each language
function requestAPI(url) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.onload = function () {
            if (request.status == 200) {
                document.getElementById("flag").textContent = "Success";
                resolve(this.responseText);
            } else {
                document.getElementById("flag").textContent = "Error al consumir del API";
                reject(Error(req.statusText));
            }
        };
        request.onerror = function () {
            reject(Error("Network Error"));
        };
        request.send();
    });
}

// Onload() call
function createObjects() {
    clearAll();
    var url = "https://apiidiomas.firebaseapp.com/idiomas.json";
    requestAPI(url).then(function (response) {
        idiomas = response;
        console.log("Success!");
    }, function (error) {
        console.error("Failed!", error);
    })
    // Fill Select list
    setTimeout(function () {
        var json = JSON.parse(idiomas);
        var languages = [];
        for (idioma in json) {
            var obj = json[idioma];
            obj["idioma"] = idioma;
            languages.push(obj);
        }
        idiomas = languages;

        var list = document.getElementById("dpl_langs");
        idiomas.forEach(element => {
            var lang = document.createElement("option");
            lang.textContent = element.idioma;
            list.appendChild(lang);
        });
    }, 250);
}

function onClickSelect(evt) {
    var dpl = document.getElementById("dpl_langs");
    createLangCard(dpl.value);
}

function createLangCard(lang) {
    var obj = idiomas.find(function (element) {
        return element.idioma == lang
    });
    createCard(obj.idioma, obj.precio, obj.profesor, obj.descuento, obj.niveles);

}

function createCard(idioma, precio, profesor, descuento, niveles) {
    // NAME
    var div = document.createElement("div");
    div.className = "lang-card subtitle";
    div.id = idioma;

    // TITLE
    var title = document.createElement("h3");
    title.innerHTML = "<strong>" + idioma + "</strong>";
    title.className = "column is-three-quarters has-text-centered";

    // DELETE BUTTON
    var deleteButton = document.createElement("p");
    deleteButton.className = "column buttons";
    deleteButton.id = "btElim-lang"
    deleteButton.innerHTML = "<a class='button is-danger is-outlined has-text-right'><span class='icon is-small'><i class='fas fa-times'></i></span></a>";
    deleteButton.addEventListener('click', function () {
        var element = document.getElementById(idioma);
        element.parentNode.removeChild(element);
    }, false);

    //TITLE + BUTTON
    var header = document.createElement("div");
    header.className = "columns is-vcentered";
    header.appendChild(title);
    header.appendChild(deleteButton);

    // CONTENT
    var desc = parseInt(descuento.replace('%', ''));
    var precioDesc = parseFloat(precio) * (1 - (desc / 100));
    precioDesc = Number((precioDesc).toFixed(2));
    var text = document.createElement("p");
    text.id = "text";
    text.className = "is-size-6";
    text.innerHTML =
        "Precio: $" + precio + "<br/>" +
        "Descuento: " + descuento + "<br/>" +
        "Precio con descuento: $" + precioDesc + "<br/>" +
        "Profesor: " + profesor + "<br/>" +
        "Niveles: " + "<br><br>";

    // LEVELS
    var nivSelect = document.createElement("div");
    nivSelect.className = "select is-rounded is-small";
    var select = document.createElement("select");
    niveles.forEach(element => {
        var nivel = document.createElement("option");
        nivel.textContent = element;
        select.appendChild(nivel);
    });
    nivSelect.appendChild(select);


    div.appendChild(header);
    div.appendChild(text);
    div.appendChild(nivSelect);
    document.getElementById("tarjetas").appendChild(div);
}

function generaReporte() {
    var container = document.getElementById("tarjetas");
    var childs = container.childNodes;
    if (childs[0] == undefined) {
        var r = childs.shift();
    }
    var lang, precio, prof, level;
    var text = "<strong>";
    var total = 0;
    for (i = 0; i < childs.length; i++) {
        lang = childs[i].id;
        precio = childs[i].childNodes[1].childNodes[4].textContent;
        prof = childs[i].childNodes[1].childNodes[6].textContent;
        level = childs[i].childNodes[2].childNodes[0].value;

        total += parseFloat(precio.replace("Precio con descuento: $", ""));
        text += lang + "<br/>" + precio + "<br/>" + prof + "<br/>Nivel: " + level + "<br/>";
        text += "-----------------------------------------------------<br/>"
        console.log(lang, precio, prof, level);
    }
    text += "TOTAL: " + Number((total).toFixed(2));
    document.getElementById("modal-text").innerHTML = text + "</strong>";
    activeModal();
}

function randomCourses() {
    var select = document.getElementById('dpl_langs');
    var options = select.children;
    var numberOfLangs = Math.floor(Math.random() * 6) + 1;
    for (i = 0; i < numberOfLangs; i++) {
        var num = Math.floor(Math.random() * options.length);
        createLangCard(options[num].value);
    }
}

function clearAll() {
    var cards = document.getElementById("tarjetas");
    while (cards.hasChildNodes()) {
        cards.removeChild(cards.firstChild);
    }
}

function activeModal() {
    var modal = document.getElementById("modal");
    if (!modal.classList.contains("is-active")) {
        modal.classList.add("is-active");
    } else {
        modal.classList.remove("is-active");
    }
}