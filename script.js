function generaPiramide() {
    var tamBase = document.getElementById("size").value;
    if (tamBase <= 0) {
        alert("Tienes que ingresar un número mayor a 0");
        return;
    } else {
        var text = "";
        for (i = 0; i <= tamBase; i++) {
            for (j = 0; j < i; j++) {
                text += "  *  ";
            }
            text += "<br/>";
        }
        var piramide = document.getElementById("piramide");
        piramide.innerHTML = text;
    }
}

function generaTarjeta() {
    var div = document.createElement("div");
    var imagenID = Math.floor(Math.random() * 999) + 1;
    var img = document.createElement("img");
    var text = document.createElement("p");
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.id = "btElim"
    deleteButton.addEventListener('click', function () {
        var element = document.getElementById(imagenID);
        element.parentNode.removeChild(element);
    }, false);
    div.className = "card";
    div.id = imagenID;
    text.textContent = "ID: " + imagenID;
    img.src = "https://picsum.photos/200/?image" + imagenID;
    div.appendChild(deleteButton);
    div.appendChild(text);
    div.appendChild(img);

    var element = document.getElementById("tarjetas");
    element.appendChild(div);
}

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
    var div = document.createElement("div");
    div.className = "lang-card";
    div.id = idioma;
    var desc = parseInt(descuento.replace('%', ''));
    var precioDesc = parseFloat(precio) * (1 - (desc / 100));
    precioDesc = Number((precioDesc).toFixed(2));
    var text = document.createElement("p");
    text.id = "text";
    var title = document.createElement("H3");
    title.align = "center";
    //Delete button
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.id = "btElim-lang"
    deleteButton.addEventListener('click', function () {
        var element = document.getElementById(idioma);
        element.parentNode.removeChild(element);
    }, false);
    div.appendChild(deleteButton);
    // Card text
    title.textContent = idioma;
    div.appendChild(title);
    text.innerHTML =
        "Precio: " + precio + "<br/>" +
        "Descuento: " + descuento + "<br/>" +
        "Precio con descuento: " + precioDesc + "<br/>" +
        "Profesor: " + profesor + "<br/>" +
        "Niveles: " + "<br/>";
    div.appendChild(text);
    // Niveles select
    var nivSelect = document.createElement("select");
    niveles.forEach(element => {
        var nivel = document.createElement("option");
        nivel.textContent = element;
        nivSelect.appendChild(nivel);
    });
    div.appendChild(nivSelect);

    document.getElementById("tarjetas").appendChild(div);
}

function generaReporte() {
    var container = document.getElementById("tarjetas");
    var childs = container.childNodes;
    if (childs[0] == undefined){
        var r = childs.shift();
        alert(r);
    }
    var lang, precio, prof, level;
    var text = "Lenguages inscritos: <br/> <br/>";
    var total = 0;
    for (i = 0; i < childs.length; i++) {
        lang = childs[i].childNodes[1].textContent;
        precio = childs[i].childNodes[2].childNodes[4].textContent;
        prof = childs[i].childNodes[2].childNodes[6].textContent;
        level = childs[i].childNodes[3].value;

        total += parseFloat(precio.replace("Precio con descuento: ", ""));
        text += lang + "<br/>" + precio + "<br/>" + prof + "<br/>Nivel: " + level + "<br/>";
        text += "-----------------------------------------------------<br/> <br/>"
        console.log(lang);
        console.log(precio);
        console.log(prof);
        console.log(level);
    }
    text += "TOTAL: " + Number((total).toFixed(2));

    var ticket = window.open("");
    ticket.document.write("<html><head><title>Registro correcto</title></head><h3>" + text + "</h3></html>");

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