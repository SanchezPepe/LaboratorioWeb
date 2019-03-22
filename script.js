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
            for (j = 0; j < i; j++){
                text += "  *  ";
            } 
            text += "<br/>";
        }
        var piramide = document.getElementById("piramide");
        piramide.innerHTML = text;
    }
}