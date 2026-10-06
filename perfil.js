const usuario =
    JSON.parse(
        localStorage.getItem("usuarioRegenera")
    );


if (!usuario) {

    window.location.href = "login.html";

}


document.getElementById("profileName")
    .textContent = usuario.nombre;


document.getElementById("profileEmail")
    .textContent = usuario.correo;


const participaciones =
    JSON.parse(
        localStorage.getItem("participacionesRegenera")
    ) || [];


document.getElementById(
    "totalParticipaciones"
).textContent = participaciones.length;


const voluntariados = [

    {
        id: 1,
        titulo: "Limpieza de Playa Balandra",
        fecha: "12 Octubre 2026",
        lugar: "Playa Balandra",
        estado: "Inscrito"
    },

    {
        id: 2,
        titulo: "Restauración de zona costera",
        fecha: "18 Octubre 2026",
        lugar: "El Manglito",
        estado: "Inscrito"
    },

    {
        id: 3,
        titulo: "Monitoreo de fauna marina",
        fecha: "25 Octubre 2026",
        lugar: "Zona costera de La Paz",
        estado: "Inscrito"
    },

    {
        id: 4,
        titulo: "Limpieza de espacios públicos",
        fecha: "01 Noviembre 2026",
        lugar: "Centro de La Paz",
        estado: "Inscrito"
    }

];


const lista =
    document.getElementById(
        "participationList"
    );


if (participaciones.length === 0) {

    lista.innerHTML = `

        <div class="empty-state">

            <h3>
                Aún no has participado.
            </h3>

            <p>
                Encuentra una actividad ambiental
                y comienza a formar parte.
            </p>

            <a href="voluntariados.html">
                Ver voluntariados →
            </a>

        </div>

    `;

} else {

    participaciones.forEach(id => {

        const actividad =
            voluntariados.find(
                v => v.id === id
            );

        if (!actividad) return;


        const item =
            document.createElement("article");


        item.className =
            "participation-item";


        item.innerHTML = `

            <div>

                <span>
                    ${actividad.estado}
                </span>

                <h3>
                    ${actividad.titulo}
                </h3>

                <p>
                    📅 ${actividad.fecha}
                    ·
                    📍 ${actividad.lugar}
                </p>

            </div>

            <strong>
                →
            </strong>

        `;


        lista.appendChild(item);

    });

}


document
    .getElementById("logoutButton")
    .addEventListener("click", () => {

        localStorage.removeItem(
            "usuarioRegenera"
        );

        localStorage.removeItem(
            "participacionesRegenera"
        );

        window.location.href =
            "index.html";

    });