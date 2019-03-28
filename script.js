/**
 * Recursos : 
 */

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
    deleteButton.addEventListener('click', function(){
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

function getLanguages() {
    const Http = new XMLHttpRequest();
    const url = "https://apiidiomas.firebaseapp.com/idiomas.json";
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange=(e)=>{
        inserta(Http.responseText);
        alert(Http.responseText);
    }
}

function inserta(string){
    var div = document.createElement("div");
    div.textContent = string;
    var element = document.getElementById("body");
    element.appendChild(div);
}

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}


function prueba(){
    var xhr = createCORSRequest("GET", "https://apiidiomas.firebaseapp.com/idiomas.json");
    alert(xhr.status);
    
    if (!xhr) {
        throw new Error('CORS not supported');
    }
}
