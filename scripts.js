const boton = document.getElementById("enviar");
const input = document.getElementById("mensaje");
const mensajes = document.getElementById("mensajes");

boton.addEventListener("click", function () {

    const texto = input.value;

    if (texto !== "") {

        const nuevoMensaje = document.createElement("p");

        nuevoMensaje.innerHTML =
            "<strong>Joselo:</strong> " + texto;

        mensajes.appendChild(nuevoMensaje);

        input.value = "";
    }

});
