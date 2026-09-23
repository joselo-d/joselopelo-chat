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

// ================================
// ÚLTIMOS VODS DE TWITCH
// ================================

async function cargarVods() {

    const vodsGrid =
        document.getElementById("vods-grid");

    if (!vodsGrid) {
        return;
    }

    try {

        const response =
            await fetch(
                "https://jpbot.josediazdungey.workers.dev/vods"
            );

        if (!response.ok) {
            throw new Error(
                "No se pudieron cargar los VODs"
            );
        }

        const data =
            await response.json();


        // Limpiar mensaje "Cargando..."
        vodsGrid.innerHTML = "";


        // Si no hay VODs
        if (
            !data.videos ||
            data.videos.length === 0
        ) {

            vodsGrid.innerHTML =
                "<p>No hay directos guardados.</p>";

            return;
        }


        // Crear una tarjeta por cada VOD
        data.videos.forEach(
            function (video) {

                const tarjeta =
                    document.createElement("a");

                tarjeta.className =
                    "vod-card";

                tarjeta.href =
                    video.url;

                tarjeta.target =
                    "_blank";

                tarjeta.rel =
                    "noopener noreferrer";


                // Miniatura Twitch
                const miniatura =
                    video.thumbnail_url
                        .replace(
                            "%{width}",
                            "640"
                        )
                        .replace(
                            "%{height}",
                            "360"
                        );


                // Fecha
                const fecha =
                    new Date(
                        video.created_at
                    );

                const fechaTexto =
                    fecha.toLocaleDateString(
                        "es-UY",
                        {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric"
                        }
                    );


                tarjeta.innerHTML = `
    <div class="vod-miniatura">

        <img
            class="vod-imagen"
            src="${miniatura}"
            alt=""
            loading="lazy"
        >

        <span class="vod-duracion">
            ${video.duration}
        </span>

    </div>

    <strong>
        ${video.title}
    </strong>

    <span class="vod-fecha">
        ${fechaTexto}
    </span>
`;

                vodsGrid.appendChild(
                    tarjeta
                );

            }
        );

    }

    catch (error) {

        console.error(
            "Error cargando VODs:",
            error
        );

        vodsGrid.innerHTML =
            "<p>No se pudieron cargar los últimos directos.</p>";

    }
}


// Cargar VODs al abrir la página
cargarVods();
