// ================================
// REPRODUCTOR TWITCH
// ================================

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


// ================================
// CANAL ONLINE
// ================================

player.addEventListener(
    Twitch.Player.ONLINE,
    function () {

        twitchPlayer.style.display = "block";
        offline.classList.add("oculto");

    }
);


// ================================
// CANAL OFFLINE
// ================================

player.addEventListener(
    Twitch.Player.OFFLINE,
    function () {

        twitchPlayer.style.display = "none";
        offline.classList.remove("oculto");

    }
);
