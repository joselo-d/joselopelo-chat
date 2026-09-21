const boton = document.getElementById("enviar");
const input = document.getElementById("mensaje");
const mensajes = document.getElementById("mensajes");

// --------------------
// CHAT WEB → JP BOT → TWITCH
// --------------------

async function enviarMensaje() {

    const texto = input.value.trim();

    if (texto === "") {
        return;
    }

    boton.disabled = true;

    try {

        const response = await fetch(
            "https://jpbot.josediazdungey.workers.dev/chat/send",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username: "Web",
                    message: texto
                })
            }
        );

        if (!response.ok) {

            const error = await response.text();

            console.error(
                "Error JP Bot:",
                error
            );

            return;
        }

        input.value = "";

    } catch (error) {

        console.error(
            "No se pudo conectar con JP Bot:",
            error
        );

    } finally {

        boton.disabled = false;

    }
}

boton.addEventListener(
    "click",
    enviarMensaje
);

// Enviar también con ENTER
input.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {
            enviarMensaje();
        }

    }
);


// --------------------
// TWITCH
// --------------------

const player = new Twitch.Player(
    "twitch-player",
    {
        channel: "joselopelo",
        width: "100%",
        height: 450,
        autoplay: false
    }
);

const offline =
    document.getElementById("offline");

const twitchPlayer =
    document.getElementById("twitch-player");

player.addEventListener(
    Twitch.Player.ONLINE,
    function () {

        twitchPlayer.style.display = "block";
        offline.classList.add("oculto");

    }
);

player.addEventListener(
    Twitch.Player.OFFLINE,
    function () {

        twitchPlayer.style.display = "none";
        offline.classList.remove("oculto");

    }
);
