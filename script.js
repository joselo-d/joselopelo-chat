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

        // ================================
        // PEDIR VODS AL WORKER
        // ================================

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


        // Quitar "Cargando..."
        vodsGrid.innerHTML = "";


        // ================================
        // SIN VODS
        // ================================

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
                // CLICK EN EL VOD
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
                        // Buscar reproductor
                        // ------------------------

                        const vodPlayer =
                            document.getElementById(
                                "vod-player"
                            );


                        const vodContainer =
                            document.getElementById(
                                "vod-player-container"
                            );


                        // ------------------------
                        // Cargar VOD de Twitch
                        // IMPORTANTE:
                        // Twitch necesita "v" antes del ID
                        // ------------------------

                        vodPlayer.src =
                            "https://player.twitch.tv/" +
                            "?video=v" + video.id +
                            "&parent=joselo-d.github.io" +
                            "&autoplay=true";


                        // ------------------------
                        // Mostrar reproductor
                        // ------------------------

                        vodContainer.classList.remove(
                            "oculto"
                        );


                        // ------------------------
                        // Llevar pantalla al VOD
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


                // ================================
                // AGREGAR TARJETA
                // ================================

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
