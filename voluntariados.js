const content = window.RegeneraContent;
const grid = document.getElementById("volunteerGrid");
const voluntariados = content.getItems("voluntariado");
const escapeHtml = content.escapeHtml;

function categoryFilter(item) {
    const category = String(item.categoria || item.category || "").toLowerCase();
    if (category.includes("limpieza")) return "limpieza";
    if (category.includes("restaur")) return "restauracion";
    if (category.includes("conserv")) return "conservacion";
    return category.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function renderVoluntariados(list = voluntariados) {
    grid.replaceChildren();

    list.forEach(voluntariado => {
        const title = voluntariado.titulo || voluntariado.title;
        const category = voluntariado.categoria || voluntariado.category;
        const date = content.formatDate(voluntariado.fecha || voluntariado.date || "Fecha por confirmar");
        const hour = content.formatTime(voluntariado.hora || voluntariado.hour || "Horario por confirmar");
        const place = voluntariado.lugar || voluntariado.place || "Baja California Sur";
        const participants = Number(voluntariado.inscritos ?? voluntariado.participants ?? 0);
        const capacity = Number(voluntariado.cupo ?? voluntariado.capacity ?? 0);
        const description = voluntariado.descripcion || voluntariado.summary || "";
        const percentage = capacity ? Math.min(100, participants / capacity * 100) : 0;
        const card = document.createElement("article");
        card.className = "volunteer-card";
        const detail = content.detailUrl("voluntariado", voluntariado.id);

        card.innerHTML = `
            <div class="volunteer-card-top">
                <span class="volunteer-category">${escapeHtml(category)}</span>
                <span class="volunteer-status">${capacity && participants >= capacity ? "Cupo completo" : "Inscripciones abiertas"}</span>
            </div>
            <h3>${escapeHtml(title)}</h3>
            <div class="volunteer-info">
                <span>📅 ${escapeHtml(date)}</span>
                <span>🕐 ${escapeHtml(hour)}</span>
                <span>📍 ${escapeHtml(place)}</span>
            </div>
            <p>${escapeHtml(description)}</p>
            <div class="volunteer-capacity">
                <div class="capacity-text">
                    <span>Participantes</span>
                    <strong>${participants}${capacity ? `/${capacity}` : ""}</strong>
                </div>
                <div class="capacity-bar"><span style="width:${percentage}%"></span></div>
            </div>
            <a class="volunteer-button" href="${detail}">Ver voluntariado →</a>
        `;

        card.addEventListener("click", event => {
            if (event.target.closest("a, button")) return;
            window.location.href = detail;
        });
        grid.appendChild(card);
    });
}

document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".filter").forEach(filter => filter.classList.remove("active"));
        button.classList.add("active");

        const category = button.dataset.filter;
        renderVoluntariados(
            category === "todos"
                ? voluntariados
                : voluntariados.filter(item => categoryFilter(item) === category)
        );
    });
});

renderVoluntariados();
