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

var json = null;

function inserta(texto){
    var div = document.createElement("div");
    div.textContent = texto;
    var element = document.getElementById("langs");
    element.appendChild(div);
}

function requestAPI(){
    var request = new XMLHttpRequest()

    request.open('GET', 'https://apiidiomas.firebaseapp.com/idiomas.json', true);
    request.onload = function() {
      // Begin accessing JSON data here
      this.response.charAt(0) = '[';
      this.response.charAt(this.response.length-1) = ']';
      alert(this.response);
      json = "[" + this.response + "]";
      //json = JSON.parse(json);
      if (request.status >= 200 && request.status < 400) {
        document.getElementById("flag").textContent = "Fetch correcto";
        getLanguages();
      } else {
        document.getElementById("flag").textContent = "Error al consumir del API";  
        console.log('error');
      }
    }
    request.send();
}

function getLanguages(){
    console.log(json);
    json.forEach(lang => {
        console.log(lang);
        inserta(JSON.stringify(lang));
    })
    
}