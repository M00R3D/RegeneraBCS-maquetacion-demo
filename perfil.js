const content = window.RegeneraContent;
const user = content.getCurrentUser();
const profileMessage = document.getElementById("profileActionMessage");

if (!user) {
    window.location.replace("login.html?returnTo=perfil.html");
} else {
    const escapeHtml = content.escapeHtml;
    const profileRoot = document.querySelector(".profile-page");
    const photo = document.getElementById("profilePhoto");

    document.getElementById("profileName").textContent = user.nombre;
    document.getElementById("profileEmail").textContent = user.correo;
    document.getElementById("profileRole").textContent = user.rol === "organizador"
        ? user.organizadorVerificado ? "Organizador verificado" : "Organizador · pendiente de verificación"
        : user.rol === "administrador" ? "Administración Regenera" : "Participante ambiental";
    document.getElementById("profileJoined").textContent = `Miembro desde ${content.formatDate(user.fechaRegistro)}`;
    if (user.foto && /^https?:\/\//i.test(user.foto)) {
        photo.src = user.foto;
    } else {
        photo.alt = user.nombre.slice(0, 1).toUpperCase();
        photo.classList.add("profile-initial");
    }

    function renderProfile() {
        const impact = content.getUserImpact(user.usuario_id);
        const enrollments = content.getCollection("inscripciones").filter(row =>
            row.usuario_id === user.usuario_id && ["activa", "completada"].includes(row.estado));
        const volunteers = content.getCollection("voluntariados");
        const assistances = content.getCollection("asistencias").filter(row =>
            row.usuario_id === user.usuario_id && row.confirmada);
        const articles = content.getCollection("articulos").filter(row =>
            row.autor_id === user.usuario_id && row.estado === "publicado");

        document.getElementById("totalCompletados").textContent = impact.voluntariados;
        document.getElementById("impactAssistance").textContent = impact.asistencias;
        document.getElementById("totalHoras").textContent = Number.isInteger(impact.horas) ? impact.horas : impact.horas.toFixed(1);
        document.getElementById("impactPoints").textContent = impact.puntos;
        document.getElementById("impactArticles").textContent = impact.articulos;
        document.getElementById("impactBadges").textContent = impact.medallas;

        const next = document.getElementById("nextAchievement");
        next.innerHTML = impact.nextAchievement
            ? content.renderAchievementCard(impact.nextAchievement)
            : '<div class="empty-state"><p>Desbloqueaste todas las medallas disponibles. Gracias por regenerar BCS.</p></div>';

        const earned = impact.achievements.filter(item => item.unlocked);
        document.getElementById("earnedMedals").innerHTML = earned.length
            ? earned.slice(0, 4).map(content.renderAchievementCard).join("")
            : '<div class="empty-state"><p>Tus medallas aparecerán aquí a medida que participes.</p></div>';

        const visibleEnrollments = enrollments.filter(enrollment =>
            volunteers.some(volunteer => volunteer.voluntariados_id === enrollment.voluntariado_id));
        document.getElementById("participationList").innerHTML = visibleEnrollments.length
            ? visibleEnrollments.map(enrollment => {
                const volunteer = volunteers.find(item => item.voluntariados_id === enrollment.voluntariado_id);
                const place = content.getPlace(volunteer);
                const attendance = assistances.find(row => row.voluntariado_id === volunteer.voluntariados_id);
                const currentCode = content.getAttendanceCode(volunteer.voluntariados_id);
                const availableCode = currentCode?.activo && (!currentCode.fechaExpiracion || new Date(currentCode.fechaExpiracion) > new Date());
                const attendanceAction = attendance
                    ? '<p class="attendance-confirmed">✓ Asistencia registrada · Voluntariado completado</p>'
                    : enrollment.estado === "activa"
                        ? `<form class="profile-code-form" data-volunteer-id="${escapeHtml(volunteer.voluntariados_id)}">
                            <label for="profile-code-${escapeHtml(volunteer.voluntariados_id)}">Código de asistencia</label>
                            <div><input id="profile-code-${escapeHtml(volunteer.voluntariados_id)}" name="codigo" placeholder="${availableCode ? "REGENERA-XXXXXX" : "Aún no hay código"}" autocomplete="one-time-code" required ${availableCode ? "" : "disabled"}>
                            <button type="submit" ${availableCode ? "" : "disabled"}>Registrar asistencia</button></div>
                        </form>`
                        : "";
                return `<article class="participation-item">
                    <div>${content.statusBadge(enrollment.estado)}<h3>${escapeHtml(volunteer.titulo)}</h3>
                        <p>📅 ${escapeHtml(content.formatDate(volunteer.fecha))} · 📍 ${escapeHtml(place?.nombre || "Lugar no disponible")}</p>
                        ${attendanceAction}
                    </div>
                    <a href="${content.detailUrl("voluntariado", volunteer.voluntariados_id)}" aria-label="Ver ${escapeHtml(volunteer.titulo)}">→</a>
                </article>`;
            }).join("")
            : '<div class="empty-state"><h3>Aún no tienes inscripciones.</h3><p>Encuentra una actividad y comienza a participar.</p><a href="voluntariados.html">Ver voluntariados →</a></div>';

        document.getElementById("attendanceList").innerHTML = assistances.length
            ? assistances.map(attendance => {
                const volunteer = volunteers.find(row => row.voluntariados_id === attendance.voluntariado_id);
                return volunteer ? `<article class="participation-item">
                    <div><span>ASISTENCIA CONFIRMADA · ${escapeHtml(attendance.metodo)}</span><h3>${escapeHtml(volunteer.titulo)}</h3>
                    <p>${escapeHtml(content.formatDate(attendance.fecha))} · ${escapeHtml(content.formatTime(attendance.hora))}</p></div>
                    <a href="${content.detailUrl("voluntariado", volunteer.voluntariados_id)}">→</a>
                </article>` : "";
            }).join("")
            : '<div class="empty-state"><p>Tus asistencias confirmadas aparecerán aquí.</p></div>';

        document.getElementById("publishedArticles").innerHTML = articles.length
            ? articles.map(article => `<article class="participation-item">
                <div>${content.statusBadge("publicado")}<h3>${escapeHtml(article.titulo)}</h3>
                    <p>${escapeHtml(article.categoria)} · ${escapeHtml(content.formatDate(article.fechaPublicacion))}</p></div>
                <a href="${content.detailUrl("articulo", article.articulos_id)}">Leer →</a>
            </article>`).join("")
            : '<div class="empty-state"><p>Tus artículos aprobados aparecerán aquí.</p><a href="crear-contenido.html?tipo=articulo">Crear un artículo →</a></div>';

        const organizerSection = document.getElementById("organizerSection");
        if (user.rol === "organizador" || user.rol === "administrador") {
            organizerSection.hidden = false;
            const organized = volunteers.filter(volunteer => volunteer.organizador_id === user.usuario_id);
            document.getElementById("organizedList").innerHTML = organized.length
                ? organized.map(volunteer => `<article class="participation-item">
                    <div>${content.statusBadge(volunteer.estado)}<h3>${escapeHtml(volunteer.titulo)}</h3>
                    <p>${content.getVolunteerParticipants(volunteer.voluntariados_id).length} participantes · ${escapeHtml(content.formatDate(volunteer.fecha))}</p></div>
                    <a href="${content.detailUrl("voluntariado", volunteer.voluntariados_id)}">Control de asistencia →</a>
                </article>`).join("")
                : '<div class="empty-state"><p>Aún no has creado voluntariados.</p><a href="crear-contenido.html?tipo=voluntariado">Crear voluntariado →</a></div>';
        }
    }

    profileRoot.addEventListener("submit", event => {
        const form = event.target.closest(".profile-code-form");
        if (!form) return;
        event.preventDefault();
        const result = content.registerAttendance(form.dataset.volunteerId, new FormData(form).get("codigo"));
        profileMessage.textContent = result.ok ? "¡Asistencia registrada! Tus puntos y medallas se actualizaron." : result.message;
        profileMessage.className = `profile-action-message ${result.ok ? "is-success" : "is-error"}`;
        if (result.ok) renderProfile();
    });

    renderProfile();
}
