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

function inserta(texto) {
    var div = document.createElement("div");
    div.textContent = texto;
    var element = document.getElementById("langs");
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
    }, 5);
}

function onClickSelect(evt) {
    var dpl = document.getElementById("dpl_langs");
    alert(dpl.value);
}