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
    var del = document.createElement("button");
    //div.setAttribute(imagenID);
    del.textContent = " X ";
    //del.onclick = elimina(imagenID);
    div.id = "card";
    text.textContent = "ID: " + imagenID;
    img.src = "https://picsum.photos/200/?image" + imagenID;
    div.appendChild(del);
    div.appendChild(text);
    div.appendChild(img);

    var element = document.getElementById("tarjetas");
    element.appendChild(div);
}

function elimina(elementID){
    var element = document.getElementById(elementID);
    element.parentNode.removeChild(element)
}
