// ================================
// REPRODUCTOR TWITCH EN VIVO
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

        offline.classList.add(
            "oculto"
        );

    }
);


// ================================
// CANAL OFFLINE
// ================================

player.addEventListener(
    Twitch.Player.OFFLINE,
    function () {

        twitchPlayer.style.display = "none";

        offline.classList.remove(
            "oculto"
        );

    }
);


// ================================
// ÚLTIMOS VODS DE TWITCH
// ================================

async function cargarVods() {

    const vodsGrid =
        document.getElementById(
            "vods-grid"
        );

    if (!vodsGrid) {
        return;
    }


    try {

        // Pedir VODs al Worker
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


        // Quitar mensaje "Cargando..."
        vodsGrid.innerHTML = "";


        // Si Twitch no devuelve videos
        if (
            !data.videos ||
            data.videos.length === 0
        ) {

            vodsGrid.innerHTML =
                "<p>No hay directos guardados.</p>";

            return;

        }


        // ================================
        // CREAR TARJETAS
        // ================================

        data.videos.forEach(
            function (video) {

                const tarjeta =
                    document.createElement(
                        "a"
                    );


                tarjeta.className =
                    "vod-card";

                tarjeta.href =
                    "#vods";


                // ================================
                // CLICK EN UN VOD
                // ================================

                tarjeta.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();


                        // ------------------------
                        // Quitar VOD activo anterior
                        // ------------------------

                        document
                            .querySelectorAll(
                                ".vod-card"
                            )
                            .forEach(
                                function (card) {

                                    card.classList.remove(
                                        "vod-activo"
                                    );

                                }
                            );


                        // ------------------------
                        // Marcar VOD seleccionado
                        // ------------------------

                        tarjeta.classList.add(
                            "vod-activo"
                        );


                        // ------------------------
                        // Contenedor reproductor
                        // ------------------------

                        const vodContainer =
                            document.getElementById(
                                "vod-player-container"
                            );


                        const vodPlayerElement =
                            document.getElementById(
                                "vod-player"
                            );


                        // Mostrar reproductor
                        vodContainer.classList.remove(
                            "oculto"
                        );


                        // Limpiar reproductor anterior
                        vodPlayerElement.innerHTML = "";


                        // ------------------------
                        // Crear reproductor Twitch
                        // ------------------------

                        const vodPlayer =
                            new Twitch.Player(
                                "vod-player",
                                {
                                    video:
                                        video.id,

                                    width:
                                        "100%",

                                    height:
                                        "100%",

                                    autoplay:
                                        true
                                }
                            );


                        // ------------------------
                        // Reproducir cuando esté listo
                        // ------------------------

                        vodPlayer.addEventListener(
                            Twitch.Player.READY,
                            function () {

                                vodPlayer.play();

                            }
                        );


                        // ------------------------
                        // Ir al reproductor
                        // ------------------------

                        vodContainer.scrollIntoView({
                            behavior:
                                "smooth",

                            block:
                                "center"
                        });

                    }
                );


                // ================================
                // MINIATURA
                // ================================

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


                // ================================
                // FECHA
                // ================================

                const fecha =
                    new Date(
                        video.created_at
                    );


                const fechaTexto =
                    fecha.toLocaleDateString(
                        "es-UY",
                        {
                            day:
                                "2-digit",

                            month:
                                "2-digit",

                            year:
                                "numeric"
                        }
                    );


                // ================================
                // CONTENIDO DE LA TARJETA
                // ================================

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


                // Agregar tarjeta
                vodsGrid.appendChild(
                    tarjeta
                );

            }
        );

    }


    // ================================
    // ERROR
    // ================================

    catch (error) {

        console.error(
            "Error cargando VODs:",
            error
        );


        vodsGrid.innerHTML =
            "<p>No se pudieron cargar los últimos directos.</p>";

    }

}


// ================================
// CARGAR VODS AL ABRIR LA WEB
// ================================

cargarVods();
