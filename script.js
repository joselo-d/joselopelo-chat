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
// --------------------
// TWITCH
// --------------------

const player = new Twitch.Player("twitch-player", {
    channel: "joselopelo",
    width: "100%",
    height: 450,
    autoplay: false
});

const offline = document.getElementById("offline");
const twitchPlayer = document.getElementById("twitch-player");

player.addEventListener(Twitch.Player.ONLINE, function () {

    twitchPlayer.style.display = "block";
    offline.classList.add("oculto");

});

player.addEventListener(Twitch.Player.OFFLINE, function () {

    twitchPlayer.style.display = "none";
    offline.classList.remove("oculto");

});
