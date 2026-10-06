const voluntariados = [
    {
        id: 1,
        titulo: "Limpieza de Playa Balandra",
        categoria: "limpieza",
        fecha: "12 Octubre 2026",
        hora: "08:00 AM",
        lugar: "Playa Balandra",
        cupo: 30,
        inscritos: 18,
        organizador: "Regenera BCS",
        descripcion:
            "Actividad comunitaria para retirar residuos y mantener limpia la zona costera."
    },

    {
        id: 2,
        titulo: "Restauración de zona costera",
        categoria: "restauracion",
        fecha: "18 Octubre 2026",
        hora: "07:30 AM",
        lugar: "El Manglito",
        cupo: 20,
        inscritos: 12,
        organizador: "Iniciativa local",
        descripcion:
            "Actividad enfocada en restauración y cuidado de espacios naturales urbanos."
    },

    {
        id: 3,
        titulo: "Monitoreo de fauna marina",
        categoria: "conservacion",
        fecha: "25 Octubre 2026",
        hora: "07:00 AM",
        lugar: "Zona costera de La Paz",
        cupo: 15,
        inscritos: 9,
        organizador: "Regenera BCS",
        descripcion:
            "Participación en una jornada de observación y registro de fauna marina."
    },

    {
        id: 4,
        titulo: "Limpieza de espacios públicos",
        categoria: "limpieza",
        fecha: "01 Noviembre 2026",
        hora: "08:00 AM",
        lugar: "Centro de La Paz",
        cupo: 25,
        inscritos: 7,
        organizador: "Comunidad Regenera",
        descripcion:
            "Jornada comunitaria para recuperar y mantener espacios públicos."
    }
];


const grid = document.getElementById("volunteerGrid");


function renderVoluntariados(lista = voluntariados) {

    grid.innerHTML = "";

    lista.forEach(voluntariado => {

        const porcentaje =
            (voluntariado.inscritos / voluntariado.cupo) * 100;

        const card = document.createElement("article");

        card.className = "volunteer-card";

        card.innerHTML = `

            <div class="volunteer-card-top">

                <span class="volunteer-category">
                    ${voluntariado.categoria}
                </span>

                <span class="volunteer-status">
                    Inscripciones abiertas
                </span>

            </div>

            <h3>
                ${voluntariado.titulo}
            </h3>

            <div class="volunteer-info">

                <span>
                    📅 ${voluntariado.fecha}
                </span>

                <span>
                    🕐 ${voluntariado.hora}
                </span>

                <span>
                    📍 ${voluntariado.lugar}
                </span>

            </div>

            <p>
                ${voluntariado.descripcion}
            </p>

            <div class="volunteer-capacity">

                <div class="capacity-text">

                    <span>
                        Participantes
                    </span>

                    <strong>
                        ${voluntariado.inscritos}/${voluntariado.cupo}
                    </strong>

                </div>

                <div class="capacity-bar">
                    <span style="width:${porcentaje}%"></span>
                </div>

            </div>

            <button
                class="volunteer-button"
                onclick="participar(${voluntariado.id})">

                Ver voluntariado →

            </button>

        `;

        grid.appendChild(card);

    });

}


function participar(id) {

    const voluntariado =
        voluntariados.find(v => v.id === id);

    const usuario =
        JSON.parse(localStorage.getItem("usuarioRegenera"));

    if (!usuario) {

        alert(
            "Para participar en un voluntariado necesitas iniciar sesión."
        );

        window.location.href = "login.html";

        return;
    }

    const participaciones =
        JSON.parse(
            localStorage.getItem("participacionesRegenera")
        ) || [];

    if (participaciones.includes(id)) {

        alert(
            "Ya estás inscrito en este voluntariado."
        );

        return;
    }

    participaciones.push(id);

    localStorage.setItem(
        "participacionesRegenera",
        JSON.stringify(participaciones)
    );

    alert(
        `Te has inscrito en "${voluntariado.titulo}".`
    );

}


document.querySelectorAll(".filter").forEach(button => {

    button.addEventListener("click", () => {

        document
            .querySelectorAll(".filter")
            .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const categoria =
            button.dataset.filter;

        if (categoria === "todos") {

            renderVoluntariados();

        } else {

            renderVoluntariados(
                voluntariados.filter(
                    v => v.categoria === categoria
                )
            );

        }

    });

});


renderVoluntariados();