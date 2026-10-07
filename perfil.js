const content = window.RegeneraContent;
const user = content.getCurrentUser();

if (!user) {
    window.location.replace("login.html?returnTo=perfil.html");
} else {
    const escapeHtml = content.escapeHtml;
    const enrollments = content.getCollection("inscripciones")
        .filter(row => row.usuario_id === user.usuario_id);
    const volunteers = content.getCollection("voluntariados");
    const assistances = content.getCollection("asistencias")
        .filter(row => row.usuario_id === user.usuario_id && row.confirmada);
    const completedEnrollments = enrollments.filter(row => row.estado === "completada");
    const supportedPlaces = new Set(completedEnrollments
        .map(row => volunteers.find(item => item.voluntariados_id === row.voluntariado_id)?.lugar_id)
        .filter(Boolean));

    const hours = assistances.reduce((total, attendance) => {
        const volunteer = volunteers.find(row => row.voluntariados_id === attendance.voluntariado_id);
        if (!volunteer) return total;
        const [startHour, startMinute] = volunteer.horarioInicio.split(":").map(Number);
        const [endHour, endMinute] = volunteer.horarioFin.split(":").map(Number);
        if ([startHour, startMinute, endHour, endMinute].some(Number.isNaN)) return total;
        return total + Math.max(0, (endHour * 60 + endMinute - startHour * 60 - startMinute) / 60);
    }, 0);

    document.getElementById("profileName").textContent = user.nombre;
    document.getElementById("profileEmail").textContent = user.correo;
    document.getElementById("profileRole").textContent = user.rol;
    document.getElementById("profileJoined").textContent = `Miembro desde ${content.formatDate(user.fechaRegistro)}`;
    const photo = document.getElementById("profilePhoto");
    if (user.foto && /^https?:\/\//i.test(user.foto)) {
        photo.src = user.foto;
    } else {
        photo.alt = user.nombre.slice(0, 1).toUpperCase();
        photo.classList.add("profile-initial");
    }
    document.getElementById("totalParticipaciones").textContent = enrollments.filter(row => ["activa", "completada"].includes(row.estado)).length;
    document.getElementById("totalCompletados").textContent = completedEnrollments.length;
    document.getElementById("totalHoras").textContent = Number.isInteger(hours) ? hours : hours.toFixed(1);
    document.getElementById("totalLugares").textContent = supportedPlaces.size;

    const participationList = document.getElementById("participationList");
    const visibleEnrollments = enrollments.filter(row => ["activa", "completada"].includes(row.estado));
    participationList.innerHTML = visibleEnrollments.length ? visibleEnrollments.map(enrollment => {
        const volunteer = volunteers.find(row => row.voluntariados_id === enrollment.voluntariado_id);
        const place = volunteer && content.getPlace(volunteer);
        if (!volunteer) return "";
        return `<article class="participation-item">
            <div>
                ${content.statusBadge(enrollment.estado)}
                <h3>${escapeHtml(volunteer.titulo)}</h3>
                <p>📅 ${escapeHtml(content.formatDate(volunteer.fecha))} · 📍 ${escapeHtml(place?.nombre || "Lugar no disponible")}</p>
            </div>
            <a href="${content.detailUrl("voluntariado", volunteer.voluntariados_id)}" aria-label="Ver ${escapeHtml(volunteer.titulo)}">→</a>
        </article>`;
    }).join("") : `<div class="empty-state"><h3>Aún no tienes inscripciones.</h3><p>Encuentra una actividad y comienza a participar.</p><a href="voluntariados.html">Ver voluntariados →</a></div>`;

    const attendanceList = document.getElementById("attendanceList");
    attendanceList.innerHTML = assistances.length ? assistances.map(attendance => {
        const volunteer = volunteers.find(row => row.voluntariados_id === attendance.voluntariado_id);
        return volunteer ? `<article class="participation-item">
            <div><span>ASISTENCIA CONFIRMADA · QR</span><h3>${escapeHtml(volunteer.titulo)}</h3>
            <p>${escapeHtml(content.formatDate(attendance.fecha))} · ${escapeHtml(content.formatTime(attendance.hora))}</p></div>
            <a href="${content.detailUrl("voluntariado", volunteer.voluntariados_id)}">→</a>
        </article>` : "";
    }).join("") : '<div class="empty-state"><p>Tus asistencias confirmadas aparecerán aquí.</p></div>';

    const organizerSection = document.getElementById("organizerSection");
    if (user.rol === "organizador") {
        organizerSection.hidden = false;
        const organized = volunteers.filter(volunteer => volunteer.organizador_id === user.usuario_id);
        document.getElementById("organizedList").innerHTML = organized.length ? organized.map(volunteer => {
            const count = content.getVolunteerParticipants(volunteer.voluntariados_id).length;
            return `<article class="participation-item">
                <div>${content.statusBadge(volunteer.estado)}<h3>${escapeHtml(volunteer.titulo)}</h3><p>${count} participantes · ${escapeHtml(content.formatDate(volunteer.fecha))}</p></div>
                <a href="${content.detailUrl("voluntariado", volunteer.voluntariados_id)}">Gestionar →</a>
            </article>`;
        }).join("") : '<div class="empty-state"><p>Aún no has creado voluntariados.</p></div>';
    }
}
