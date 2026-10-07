const usuario = window.RegeneraContent.getUser();


if (!usuario) window.location.replace("login.html");


document.getElementById("profileName")
    .textContent = usuario ? usuario.nombre : "";


document.getElementById("profileEmail")
    .textContent = usuario ? usuario.correo : "";


const participaciones =
    JSON.parse(
        localStorage.getItem("participacionesRegenera")
    ) || [];


document.getElementById(
    "totalParticipaciones"
).textContent = participaciones.length;


const voluntariados = window.RegeneraContent
    .getItems("voluntariado")
    .map(actividad => ({
        id: actividad.id,
        titulo: actividad.titulo || actividad.title,
        fecha: actividad.fecha || actividad.date || "Fecha por confirmar",
        lugar: actividad.lugar || actividad.place || "Baja California Sur",
        estado: "Inscrito"
    }));


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