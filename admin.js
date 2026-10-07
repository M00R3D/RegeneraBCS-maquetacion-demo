const content = window.RegeneraContent;
const currentUser = content.getCurrentUser();
const adminMessage = document.getElementById("adminMessage");
const escapeHtml = content.escapeHtml;
const tabNames = {
    dashboard: "Dashboard",
    voluntariados: "Voluntariados",
    articulos: "Artículos",
    usuarios: "Usuarios",
    lugares: "Lugares",
    flora: "Flora y fauna",
    notificaciones: "Notificaciones",
    auditoria: "Auditoría"
};

if (!currentUser || currentUser.rol !== "administrador") {
    window.location.replace(currentUser ? "index.html" : "login.html?returnTo=admin.html");
} else {
    document.getElementById("adminUserName").textContent = currentUser.nombre;

    function report(message, isError = false) {
        adminMessage.textContent = message;
        adminMessage.className = `admin-message ${isError ? "is-error" : "is-success"}`;
    }

    function runAction(action, successMessage) {
        try {
            action();
            report(successMessage);
            renderAll();
        } catch (error) {
            report(error.message, true);
        }
    }

    function showTab(tab) {
        document.querySelectorAll("[data-tab]").forEach(button => {
            button.classList.toggle("active", button.dataset.tab === tab);
        });
        document.querySelectorAll("[data-section]").forEach(section => {
            section.classList.toggle("active", section.dataset.section === tab);
        });
        document.getElementById("adminGreeting").textContent = tabNames[tab] || "Dashboard";
        history.replaceState(null, "", `admin.html?tab=${encodeURIComponent(tab)}`);
    }

    document.getElementById("adminTabs").addEventListener("click", event => {
        const button = event.target.closest("[data-tab]");
        if (button) showTab(button.dataset.tab);
    });
    document.getElementById("adminNotificationIndicator").addEventListener("click", () => showTab("notificaciones"));
    document.getElementById("adminLogout").addEventListener("click", content.logout);

    function renderStats() {
        const unreadCount = content.getCollection("notificaciones").filter(notification => !notification.leido).length;
        const notificationIndicator = document.getElementById("adminNotificationIndicator");
        notificationIndicator.textContent = unreadCount ? `Notificaciones · ${unreadCount}` : "Notificaciones";
        notificationIndicator.setAttribute("aria-label", unreadCount ? `${unreadCount} notificaciones sin leer` : "Abrir notificaciones");
        const volunteers = content.getCollection("voluntariados");
        const articles = content.getCollection("articulos");
        const stats = [
            ["Total usuarios", content.getCollection("usuarios").length],
            ["Total voluntariados", volunteers.length],
            ["Pendientes", volunteers.filter(row => row.estado === "pendiente").length + articles.filter(row => row.estado === "pendiente").length],
            ["Artículos publicados", articles.filter(row => row.estado === "publicado").length],
            ["Voluntariados publicados", volunteers.filter(row => row.estado === "publicado").length]
        ];
        document.getElementById("adminStats").innerHTML = stats.map(([label, value]) => `
            <article class="admin-stat"><span>${escapeHtml(label)}</span><strong>${value}</strong></article>`).join("");

        const inscriptions = content.getCollection("inscripciones");
        const attendance = content.getCollection("asistencias").filter(row => row.confirmada);
        const users = content.getCollection("usuarios");
        const earnedMedals = content.getCollection("usuarioMedallas");
        const participationStats = [
            ["Voluntariados", volunteers.length],
            ["Inscripciones activas", inscriptions.filter(row => ["activa", "completada"].includes(row.estado)).length],
            ["Asistencias registradas", attendance.length],
            ["Usuarios activos", users.filter(row => row.estado === "activo").length],
            ["Artículos publicados", articles.filter(row => row.estado === "publicado").length],
            ["Medallas desbloqueadas", earnedMedals.length]
        ];
        document.getElementById("participationStats").innerHTML = participationStats.map(([label, value]) => `
            <div class="admin-impact-stat"><span>${escapeHtml(label)}</span><strong>${value}</strong></div>`).join("");
        const activityLabels = {
            ASISTENCIA_REGISTRADA: "Registró asistencia",
            MEDALLA_DESBLOQUEADA: "Desbloqueó una medalla",
            PUNTOS_OTORGADOS: "Recibió puntos",
            ARTICULO_APROBADO: "Artículo aprobado"
        };
        const participationActivity = content.getCollection("auditoria")
            .filter(row => activityLabels[row.accion])
            .slice(0, 8);
        document.getElementById("participationActivity").innerHTML = participationActivity.length
            ? participationActivity.map(row => `<div class="participation-activity-item">
                <strong>${escapeHtml(content.getById("usuarios", row.usuario_id)?.nombre || "Sistema")}</strong>
                <span>${escapeHtml(activityLabels[row.accion])} · ${escapeHtml(row.detalles)}</span>
                <time>${escapeHtml(content.formatDate(row.fecha))}</time>
            </div>`).join("")
            : '<p class="admin-empty">Las acciones de participación aparecerán aquí.</p>';

        const pendingArticles = articles.filter(row => row.estado === "pendiente");
        const pendingVolunteers = volunteers.filter(row => row.estado === "pendiente");
        const pending = [
            ...pendingArticles.map(row => ({ title: row.titulo, type: "Artículo", id: row.articulos_id, tab: "articulos" })),
            ...pendingVolunteers.map(row => ({ title: row.titulo, type: "Voluntariado", id: row.voluntariados_id, tab: "voluntariados" }))
        ];
        document.getElementById("pendingSummary").innerHTML = pending.length
            ? `<div class="admin-list">${pending.slice(0, 8).map(row => `
                <div class="admin-summary-row">
                    <span>${escapeHtml(row.type)}</span><a href="${content.detailUrl(row.type === "Artículo" ? "articulo" : "voluntariado", row.id)}"><strong>${escapeHtml(row.title)}</strong></a><button type="button" data-review-tab="${row.tab}">Revisar</button>
                </div>`).join("")}</div>`
            : '<p class="admin-empty">No hay contenido pendiente de revisión.</p>';
        document.querySelectorAll("[data-review-tab]").forEach(button => button.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();
            showTab(button.dataset.reviewTab);
        }));

        const audit = content.getCollection("auditoria").slice(0, 6);
        document.getElementById("recentAudit").innerHTML = audit.length
            ? audit.map(record => `<div class="audit-mini"><time>${escapeHtml(content.formatDate(record.fecha))}</time><strong>${escapeHtml(record.accion)}</strong><span>${escapeHtml(record.detalles)}</span></div>`).join("")
            : '<p class="admin-empty">Aún no hay actividad registrada.</p>';
    }

    function renderVolunteerTable() {
        const filter = document.getElementById("volunteerStateFilter").value;
        const rows = content.getCollection("voluntariados").filter(row => filter === "todos" || row.estado === filter);
        document.getElementById("volunteerTable").innerHTML = rows.length ? `<table class="admin-table">
            <thead><tr><th>Voluntariado</th><th>Lugar</th><th>Fecha</th><th>Participantes</th><th>Estado</th><th>Acciones</th></tr></thead>
            <tbody>${rows.map(volunteer => {
                const place = content.getPlace(volunteer);
                const count = content.getVolunteerParticipants(volunteer.voluntariados_id).length;
                const canPublish = volunteer.estado === "pendiente";
                return `<tr>
                    <td><a href="${content.detailUrl("voluntariado", volunteer.voluntariados_id)}">${escapeHtml(volunteer.titulo)}</a></td>
                    <td>${escapeHtml(place?.nombre || "—")}</td>
                    <td>${escapeHtml(content.formatDate(volunteer.fecha))}</td>
                    <td>${count}/${escapeHtml(volunteer.capacidad)}</td>
                    <td>${content.statusBadge(volunteer.estado)}</td>
                    <td><div class="admin-actions">
                        ${canPublish ? `<button data-action="publish-volunteer" data-id="${escapeHtml(volunteer.voluntariados_id)}">Publicar</button>` : ""}
                        ${["publicado", "pendiente"].includes(volunteer.estado) ? `<button class="secondary-button" data-action="cancel-volunteer" data-id="${escapeHtml(volunteer.voluntariados_id)}">Cancelar</button>` : ""}
                        ${volunteer.estado === "publicado" ? `<button class="secondary-button" data-action="finish-volunteer" data-id="${escapeHtml(volunteer.voluntariados_id)}">Finalizar</button>` : ""}
                        <button class="danger-button" data-action="delete-volunteer" data-id="${escapeHtml(volunteer.voluntariados_id)}">Eliminar</button>
                    </div></td>
                </tr>`;
            }).join("")}</tbody></table>` : '<p class="admin-empty">No hay voluntariados para este filtro.</p>';
    }

    function renderArticleTable() {
        const filter = document.getElementById("articleStateFilter").value;
        const rows = content.getCollection("articulos").filter(row => filter === "todos" || row.estado === filter);
        document.getElementById("articleTable").innerHTML = rows.length ? `<table class="admin-table">
            <thead><tr><th>Artículo</th><th>Autor</th><th>Categoría</th><th>Actualizado</th><th>Estado</th><th>Acciones</th></tr></thead>
            <tbody>${rows.map(article => {
                const author = content.getById("usuarios", article.autor_id);
                return `<tr>
                    <td><a href="${content.detailUrl("articulo", article.articulos_id)}">${escapeHtml(article.titulo)}</a></td>
                    <td>${escapeHtml(author?.nombre || "—")}</td>
                    <td>${escapeHtml(article.categoria)}</td>
                    <td>${escapeHtml(content.formatDate(article.fechaActualizacion))}</td>
                    <td>${content.statusBadge(article.estado)}</td>
                    <td><div class="admin-actions">
                        ${article.estado !== "publicado" ? `<button data-action="publish-article" data-id="${escapeHtml(article.articulos_id)}">Publicar</button>` : ""}
                        ${article.estado === "pendiente" ? `<button class="secondary-button" data-action="reject-article" data-id="${escapeHtml(article.articulos_id)}">Rechazar</button>` : ""}
                        <button class="danger-button" data-action="delete-article" data-id="${escapeHtml(article.articulos_id)}">Eliminar</button>
                    </div></td>
                </tr>`;
            }).join("")}</tbody></table>` : '<p class="admin-empty">No hay artículos para este filtro.</p>';
    }

    function renderUserTable() {
        const users = content.getCollection("usuarios");
        document.getElementById("userTable").innerHTML = `<table class="admin-table">
            <thead><tr><th>Usuario</th><th>Rol</th><th>Estado</th><th>Organizador</th><th>Registro</th><th>Acciones</th></tr></thead>
            <tbody>${users.map(user => `<tr data-user-row="${escapeHtml(user.usuario_id)}">
                <td>${escapeHtml(user.nombre)}<small>${escapeHtml(user.correo)}</small></td>
                <td><select data-user-role ${user.usuario_id === currentUser.usuario_id ? "disabled" : ""}><option value="usuario" ${user.rol === "usuario" ? "selected" : ""}>usuario</option><option value="organizador" ${user.rol === "organizador" ? "selected" : ""}>organizador</option><option value="administrador" ${user.rol === "administrador" ? "selected" : ""}>administrador</option></select></td>
                <td><select data-user-state ${user.usuario_id === currentUser.usuario_id ? "disabled" : ""}><option value="activo" ${user.estado === "activo" ? "selected" : ""}>activo</option><option value="inactivo" ${user.estado === "inactivo" ? "selected" : ""}>inactivo</option></select></td>
                <td><label class="verify-check"><input data-user-verified type="checkbox" ${user.organizadorVerificado ? "checked" : ""}> Verificado</label></td>
                <td>${escapeHtml(content.formatDate(user.fechaRegistro))}</td>
                <td><button data-action="save-user" data-id="${escapeHtml(user.usuario_id)}">Guardar</button></td>
            </tr>`).join("")}</tbody></table>`;
    }

    function renderPlaceTable() {
        const rows = content.getCollection("lugares");
        document.getElementById("placeTable").innerHTML = rows.length ? `<table class="admin-table">
            <thead><tr><th>Lugar</th><th>Dirección</th><th>Coordenadas</th><th>Estado</th><th>Acciones</th></tr></thead>
            <tbody>${rows.map(place => `<tr>
                <td>${escapeHtml(place.nombre)}</td><td>${escapeHtml(place.ubicacion.direccion)}</td>
                <td>${escapeHtml(place.ubicacion.latitud ?? "—")}, ${escapeHtml(place.ubicacion.longitud ?? "—")}</td>
                <td>${content.statusBadge(place.estado)}</td>
                <td><div class="admin-actions"><button data-action="edit-place" data-id="${escapeHtml(place.lugares_id)}">Editar</button><button class="danger-button" data-action="delete-place" data-id="${escapeHtml(place.lugares_id)}">Desactivar/eliminar</button></div></td>
            </tr>`).join("")}</tbody></table>` : '<p class="admin-empty">No hay lugares.</p>';
    }

    function renderSpeciesTable() {
        const rows = content.getCollection("floraFauna");
        document.getElementById("speciesTable").innerHTML = rows.length ? `<table class="admin-table">
            <thead><tr><th>Especie</th><th>Tipo</th><th>Hábitat</th><th>Conservación</th><th>Acciones</th></tr></thead>
            <tbody>${rows.map(item => `<tr>
                <td>${escapeHtml(item.nombre)}<small>${escapeHtml(item.nombreCientifico)}</small></td><td>${escapeHtml(item.tipo)}</td>
                <td>${escapeHtml(item.habitat)}</td><td>${escapeHtml(item.estadoConservacion)}</td>
                <td><div class="admin-actions"><button data-action="edit-species" data-id="${escapeHtml(item.floraFauna_id)}">Editar</button><button class="danger-button" data-action="delete-species" data-id="${escapeHtml(item.floraFauna_id)}">Eliminar</button></div></td>
            </tr>`).join("")}</tbody></table>` : '<p class="admin-empty">No hay especies en el catálogo.</p>';
    }

    function renderNotifications() {
        const rows = content.getCollection("notificaciones");
        document.getElementById("adminNotifications").innerHTML = rows.length ? rows.map(row => {
            const recipient = content.getById("usuarios", row.usuario_id);
            return `<article class="admin-notification ${row.leido ? "is-read" : "is-unread"}">
                <strong>${escapeHtml(row.titulo)}</strong><p>${escapeHtml(row.mensaje)}</p>
                <span>Para: ${escapeHtml(recipient?.nombre || "Usuario")} · ${escapeHtml(row.prioridad)}</span>
                <time>${escapeHtml(content.formatDate(row.fechaCreacion))}</time>
                ${content.statusBadge(row.leido ? "leído" : "no leído")}
            </article>`;
        }).join("") : '<p class="admin-empty">No hay notificaciones.</p>';
    }

    function renderAuditTable() {
        const rows = content.getCollection("auditoria");
        document.getElementById("auditTable").innerHTML = rows.length ? `<table class="admin-table">
            <thead><tr><th>Fecha</th><th>Usuario</th><th>Acción</th><th>Entidad</th><th>Detalles</th></tr></thead>
            <tbody>${rows.map(record => `<tr>
                <td>${escapeHtml(content.formatDate(record.fecha))}</td>
                <td>${escapeHtml(content.getById("usuarios", record.usuario_id)?.nombre || "Sistema")}</td>
                <td>${escapeHtml(record.accion)}</td><td>${escapeHtml(record.entidad)} · ${escapeHtml(record.entidad_id)}</td><td>${escapeHtml(record.detalles)}</td>
            </tr>`).join("")}</tbody></table>` : '<p class="admin-empty">No hay registros de auditoría.</p>';
    }

    function renderAll() {
        renderStats();
        renderVolunteerTable();
        renderArticleTable();
        renderUserTable();
        renderPlaceTable();
        renderSpeciesTable();
        renderNotifications();
        renderAuditTable();
    }

    document.getElementById("volunteerStateFilter").addEventListener("change", renderVolunteerTable);
    document.getElementById("articleStateFilter").addEventListener("change", renderArticleTable);
    document.querySelectorAll("#volunteerTable, #articleTable, #userTable, #placeTable, #speciesTable").forEach(table => {
        table.addEventListener("click", event => {
            const button = event.target.closest("[data-action]");
            if (!button) return;
            const { action, id } = button.dataset;
            if (action === "edit-place") {
                const place = content.getById("lugares", id);
                const form = document.getElementById("placeForm");
                form.elements.id.value = place.lugares_id;
                form.elements.nombre.value = place.nombre;
                form.elements.direccion.value = place.ubicacion.direccion;
                form.elements.latitud.value = place.ubicacion.latitud ?? "";
                form.elements.longitud.value = place.ubicacion.longitud ?? "";
                form.scrollIntoView({ behavior: "smooth", block: "center" });
                return;
            }
            if (action === "edit-species") {
                const item = content.getById("floraFauna", id);
                const form = document.getElementById("speciesForm");
                Object.entries({ id: item.floraFauna_id, nombre: item.nombre, nombreCientifico: item.nombreCientifico, tipo: item.tipo, habitat: item.habitat, estadoConservacion: item.estadoConservacion, ubicacion: item.ubicacion, descripcion: item.descripcion }).forEach(([key, value]) => form.elements[key].value = value || "");
                form.scrollIntoView({ behavior: "smooth", block: "center" });
                return;
            }
            if (action.startsWith("delete-") && !window.confirm("¿Eliminar este registro? La acción no se puede deshacer.")) return;
            runAction(() => {
                if (action === "publish-volunteer") content.moderateContent("voluntariados", id, "publicado");
                if (action === "cancel-volunteer") content.moderateContent("voluntariados", id, "cancelado");
                if (action === "finish-volunteer") content.moderateContent("voluntariados", id, "finalizado");
                if (action === "delete-volunteer") content.removeContent("voluntariados", id);
                if (action === "publish-article") content.moderateContent("articulos", id, "publicado");
                if (action === "reject-article") content.moderateContent("articulos", id, "rechazado");
                if (action === "delete-article") content.removeContent("articulos", id);
                if (action === "delete-place") content.removePlace(id);
                if (action === "delete-species") content.removeFlora(id);
                if (action === "save-user") {
                    const row = button.closest("[data-user-row]");
                    content.updateUser(id, {
                        rol: row.querySelector("[data-user-role]").value,
                        estado: row.querySelector("[data-user-state]").value,
                        organizadorVerificado: row.querySelector("[data-user-verified]").checked
                    });
                }
            }, "Cambios guardados y registrados en auditoría.");
        });
    });

    document.getElementById("placeForm").addEventListener("submit", event => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const id = String(data.get("id"));
        const values = { nombre: String(data.get("nombre")).trim(), direccion: String(data.get("direccion")).trim(), latitud: data.get("latitud"), longitud: data.get("longitud") };
        runAction(() => {
            if (id) content.updatePlace(id, { nombre: values.nombre, ubicacion: { ...content.getById("lugares", id).ubicacion, nombre: values.nombre, direccion: values.direccion, latitud: Number(values.latitud) || null, longitud: Number(values.longitud) || null } });
            else content.createPlace(values);
            form.reset();
        }, "Lugar guardado.");
    });

    document.getElementById("speciesForm").addEventListener("submit", event => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const id = String(data.get("id"));
        const values = Object.fromEntries(["nombre", "nombreCientifico", "tipo", "habitat", "estadoConservacion", "ubicacion", "descripcion"].map(key => [key, String(data.get(key) || "").trim()]));
        runAction(() => {
            if (id) content.updateFlora(id, values);
            else content.createFlora(values);
            form.reset();
        }, "Registro de flora/fauna guardado.");
    });

    document.getElementById("placeForm").addEventListener("reset", () => window.setTimeout(() => document.querySelector('#placeForm [name="id"]').value = "", 0));
    document.getElementById("speciesForm").addEventListener("reset", () => window.setTimeout(() => document.querySelector('#speciesForm [name="id"]').value = "", 0));

    const requestedTab = new URLSearchParams(window.location.search).get("tab");
    showTab(tabNames[requestedTab] ? requestedTab : "dashboard");
    renderAll();
}
