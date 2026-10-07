const content = window.RegeneraContent;
const grid = document.getElementById("volunteerGrid");
const volunteers = content.getPublicVolunteers();
const escapeHtml = content.escapeHtml;

function categoryFilter(volunteer) {
    return content.normalizeCategory(volunteer.categoria)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replaceAll(" ", "-");
}

function renderVolunteers(list = volunteers) {
    grid.innerHTML = list.map(volunteer => {
        const detail = content.detailUrl("voluntariado", volunteer.voluntariados_id);
        const fullness = volunteer.capacidad
            ? Math.min(100, volunteer.participantes / volunteer.capacidad * 100)
            : 0;
        return `<article class="volunteer-card">
            <div class="volunteer-image" style="background-image:url('${escapeHtml(volunteer.imagen)}')"></div>
            <div class="volunteer-card-content">
                <div class="volunteer-card-top">
                    <span class="volunteer-category">${escapeHtml(volunteer.categoria)}</span>
                    ${content.statusBadge(volunteer.estado)}
                </div>
                <h3>${escapeHtml(volunteer.titulo)}</h3>
                <div class="volunteer-info">
                    <span>📅 ${escapeHtml(content.formatDate(volunteer.fecha))}</span>
                    <span>🕐 ${escapeHtml(content.formatTime(volunteer.horarioInicio))}–${escapeHtml(content.formatTime(volunteer.horarioFin))}</span>
                    <span>📍 ${escapeHtml(volunteer.lugar?.nombre || "Lugar por confirmar")}</span>
                    <span>👥 ${volunteer.participantes}/${escapeHtml(volunteer.capacidad)} participantes</span>
                </div>
                <div class="capacity-bar" aria-label="Ocupación del cupo"><span style="width:${fullness}%"></span></div>
                <p>${escapeHtml(volunteer.descripcion)}</p>
                <a class="volunteer-button" href="${detail}">Ver voluntariado →</a>
            </div>
        </article>`;
    }).join("") || '<p class="empty-state">No hay voluntariados publicados con este filtro.</p>';

    grid.querySelectorAll(".volunteer-card").forEach(card => {
        const link = card.querySelector("a");
        card.addEventListener("click", event => {
            if (!event.target.closest("a, button")) window.location.href = link.href;
        });
    });
}

document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".filter").forEach(filter => filter.classList.remove("active"));
        button.classList.add("active");
        const category = button.dataset.filter;
        renderVolunteers(category === "todos"
            ? volunteers
            : volunteers.filter(volunteer => categoryFilter(volunteer) === category));
    });
});

renderVolunteers();
