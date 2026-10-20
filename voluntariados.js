const content = window.RegeneraContent;
const grid = document.getElementById("volunteerGrid");
const escapeHtml = content.escapeHtml;
const placeFilter = document.getElementById("volunteerPlaceFilter");

function categoryFilter(volunteer) {
    return content.normalizeCategory(volunteer.categoria)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replaceAll(" ", "-");
}

    function normalizeText(value) {
        return String(value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
    }

function renderVolunteers(list) {
    grid.innerHTML = list.map(volunteer => {
        const detail = content.detailUrl("voluntariado", volunteer.voluntariados_id);
        const capacity = Number(volunteer.capacidad);
        const participants = Number(volunteer.participantes) || 0;
        const fullness = capacity > 0 ? Math.min(100, participants / capacity * 100) : 0;
        const placesLeft = Math.max(0, capacity - participants);
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
                <div class="capacity-text"><span>${placesLeft ? `${placesLeft} lugares disponibles` : "Cupo lleno"}</span><strong>${participants}/${escapeHtml(capacity)}</strong></div>
                <div class="capacity-bar" aria-label="Ocupación del cupo"><span style="width:${fullness}%"></span></div>
                <p>${escapeHtml(volunteer.descripcion)}</p>
                <span class="volunteer-points">✦ +50 puntos al completar</span>
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

function applyFilters() {
    const activeCategory = document.querySelector(".filter.active")?.dataset.filter || "todos";
    const search = normalizeText(document.getElementById("volunteerSearch").value);
    const date = document.getElementById("volunteerDateFilter").value;
    const placeId = placeFilter.value;
    const availableOnly = document.getElementById("volunteerAvailabilityFilter").checked;
    const volunteers = content.getPublicVolunteers();

    renderVolunteers(volunteers.filter(volunteer => {
        const matchesCategory = activeCategory === "todos" || categoryFilter(volunteer) === activeCategory;
        const searchableText = normalizeText(`${volunteer.titulo} ${volunteer.descripcion} ${volunteer.categoria} ${volunteer.lugar?.nombre || ""}`);
        const matchesSearch = !search || searchableText.includes(search);
        const matchesDate = !date || volunteer.fecha === date;
        const matchesPlace = !placeId || volunteer.lugar_id === placeId;
        const matchesAvailability = !availableOnly || volunteer.participantes < Number(volunteer.capacidad);
        return matchesCategory && matchesSearch && matchesDate && matchesPlace && matchesAvailability;
    }));
}

const initialVolunteers = content.getPublicVolunteers();
const places = [...new Map(initialVolunteers
    .filter(volunteer => volunteer.lugar)
    .map(volunteer => [volunteer.lugar_id, volunteer.lugar])).values()];
placeFilter.innerHTML += places.map(place => `<option value="${escapeHtml(place.lugares_id)}">${escapeHtml(place.nombre)}</option>`).join("");

document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".filter").forEach(filter => filter.classList.remove("active"));
        button.classList.add("active");
        applyFilters();
    });
});

["volunteerSearch", "volunteerDateFilter", "volunteerPlaceFilter", "volunteerAvailabilityFilter"].forEach(id => {
    document.getElementById(id).addEventListener("input", applyFilters);
    document.getElementById(id).addEventListener("change", applyFilters);
});

applyFilters();
