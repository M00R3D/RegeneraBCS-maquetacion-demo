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
            ["Voluntariados finalizados", volunteers.filter(row => row.estado === "finalizado").length],
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
        const participants = new Set(attendance.map(row => row.usuario_id)).size;
        const supportedHours = users.reduce((total, user) => total + content.getUserImpact(user.usuario_id).horas, 0);
        const participationStats = [
            ["Participantes únicos", participants],
            ["Participaciones verificadas", attendance.length],
            ["Horas reconocidas", Number(supportedHours.toFixed(1))],
            ["Voluntariados finalizados", volunteers.filter(row => row.estado === "finalizado").length],
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
                const canPublish = volunteer.estado === "pendiente" || volunteer.estado === "rechazado";
                return `<tr>
                    <td><a href="${content.detailUrl("voluntariado", volunteer.voluntariados_id)}">${escapeHtml(volunteer.titulo)}</a></td>
                    <td>${escapeHtml(place?.nombre || "—")}</td>
                    <td>${escapeHtml(content.formatDate(volunteer.fecha))}</td>
                    <td>${count}/${escapeHtml(volunteer.capacidad)}</td>
                    <td>${content.statusBadge(volunteer.estado)}</td>
                    <td><div class="admin-actions">
                        ${canPublish ? `<button data-action="publish-volunteer" data-id="${escapeHtml(volunteer.voluntariados_id)}">Publicar</button><button class="secondary-button" data-action="reject-volunteer" data-id="${escapeHtml(volunteer.voluntariados_id)}">Rechazar</button>` : ""}
                        ${volunteer.estado === "publicado" ? `<button class="secondary-button" data-action="cancel-volunteer" data-id="${escapeHtml(volunteer.voluntariados_id)}">Cancelar</button>` : ""}
                        ${volunteer.estado === "publicado" ? `<button class="secondary-button" data-action="finish-volunteer" data-id="${escapeHtml(volunteer.voluntariados_id)}">Finalizar</button>` : ""}
                        ${volunteer.estado === "publicado" ? `<button class="secondary-button" data-action="delete-volunteer" data-id="${escapeHtml(volunteer.voluntariados_id)}">Retirar</button>` : `<button class="danger-button" data-action="delete-volunteer" data-id="${escapeHtml(volunteer.voluntariados_id)}">Eliminar</button>`}
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
                        ${article.estado !== "publicado" ? `<button data-action="publish-article" data-id="${escapeHtml(article.articulos_id)}">Publicar</button>` : `<button class="secondary-button" data-action="retire-article" data-id="${escapeHtml(article.articulos_id)}">Retirar</button>`}
                        ${article.estado === "pendiente" ? `<button class="secondary-button" data-action="reject-article" data-id="${escapeHtml(article.articulos_id)}">Rechazar</button>` : ""}
                        ${article.estado === "rechazado" ? `<button class="secondary-button" data-action="review-article" data-id="${escapeHtml(article.articulos_id)}">Devolver a revisión</button>` : ""}
                        ${article.estado !== "publicado" ? `<button class="danger-button" data-action="delete-article" data-id="${escapeHtml(article.articulos_id)}">Eliminar</button>` : ""}
                    </div></td>
                </tr>`;
            }).join("")}</tbody></table>` : '<p class="admin-empty">No hay artículos para este filtro.</p>';
    }

    function renderUserTable() {
        const users = content.getCollection("usuarios");
        document.getElementById("userTable").innerHTML = `<table class="admin-table">
            <thead><tr><th>Usuario</th><th>Rol</th><th>Estado</th><th>Solicitud de organizador</th><th>Verificación</th><th>Registro</th><th>Acciones</th></tr></thead>
            <tbody>${users.map(user => `<tr data-user-row="${escapeHtml(user.usuario_id)}">
                <td>${escapeHtml(user.nombre)}<small>${escapeHtml(user.correo)}</small></td>
                <td><select data-user-role ${user.usuario_id === currentUser.usuario_id ? "disabled" : ""}><option value="usuario" ${user.rol === "usuario" ? "selected" : ""}>usuario</option><option value="organizador" ${user.rol === "organizador" ? "selected" : ""}>organizador</option><option value="administrador" ${user.rol === "administrador" ? "selected" : ""}>administrador</option></select></td>
                <td><select data-user-state ${user.usuario_id === currentUser.usuario_id ? "disabled" : ""}><option value="activo" ${user.estado === "activo" ? "selected" : ""}>activo</option><option value="inactivo" ${user.estado === "inactivo" ? "selected" : ""}>inactivo</option></select></td>
                <td><select data-user-request aria-label="Solicitud de organizador de ${escapeHtml(user.nombre)}"><option value="sin solicitar" ${(user.solicitudOrganizadorEstado || "sin solicitar") === "sin solicitar" ? "selected" : ""}>sin solicitar</option><option value="pendiente" ${user.solicitudOrganizadorEstado === "pendiente" ? "selected" : ""}>pendiente</option><option value="aprobada" ${user.solicitudOrganizadorEstado === "aprobada" ? "selected" : ""}>aprobada</option><option value="rechazada" ${user.solicitudOrganizadorEstado === "rechazada" ? "selected" : ""}>rechazada</option></select></td>
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
                <td><div class="admin-actions"><button data-action="edit-place" data-id="${escapeHtml(place.lugares_id)}">Editar</button><button class="secondary-button" data-action="toggle-place" data-id="${escapeHtml(place.lugares_id)}">${place.estado === "inactivo" ? "Reactivar" : "Desactivar"}</button></div></td>
            </tr>`).join("")}</tbody></table>` : '<p class="admin-empty">No hay lugares.</p>';
    }

    function renderSpeciesTable() {
        const rows = content.getCollection("floraFauna");
        document.getElementById("speciesTable").innerHTML = rows.length ? `<table class="admin-table">
            <thead><tr><th>Especie</th><th>Tipo</th><th>Hábitat</th><th>Conservación</th><th>Estado</th><th>Acciones</th></tr></thead>
            <tbody>${rows.map(item => `<tr>
                <td>${escapeHtml(item.nombre)}<small>${escapeHtml(item.nombreCientifico)}</small></td><td>${escapeHtml(item.tipo)}</td>
                <td>${escapeHtml(item.habitat)}</td><td>${escapeHtml(item.estadoConservacion)}</td><td>${content.statusBadge(item.estado || "activo")}</td>
                <td><div class="admin-actions"><button data-action="edit-species" data-id="${escapeHtml(item.floraFauna_id)}">Editar</button><button class="secondary-button" data-action="toggle-species" data-id="${escapeHtml(item.floraFauna_id)}">${item.estado === "inactivo" ? "Reactivar" : "Desactivar"}</button></div></td>
            </tr>`).join("")}</tbody></table>` : '<p class="admin-empty">No hay especies en el catálogo.</p>';
    }

    function renderNotifications() {
        const rows = content.getCollection("notificaciones");
        document.getElementById("adminNotifications").innerHTML = rows.length ? rows.map(row => {
            const recipient = content.getById("usuarios", row.usuario_id);
            const entity = row.entidad;
            const entityLink = entity?.tipo && entity.id
                ? `<a href="${content.detailUrl(entity.tipo === "articulos" ? "articulo" : entity.tipo, entity.id)}">Abrir contenido →</a>`
                : "";
            return `<article class="admin-notification ${row.leido ? "is-read" : "is-unread"}">
                <strong>${escapeHtml(row.titulo)}</strong><p>${escapeHtml(row.mensaje)}</p>
                <span>Para: ${escapeHtml(recipient?.nombre || "Usuario")} · ${escapeHtml(row.prioridad)}</span>
                <time>${escapeHtml(content.formatDate(row.fechaCreacion))}</time>
                ${entityLink}
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

    function normalizeSearch(value) {
        return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    }

    function applyTableSearch(input) {
        const wrapper = document.getElementById(input.dataset.tableSearch);
        const rows = [...(wrapper?.querySelectorAll("tbody tr") || [])];
        const query = normalizeSearch(input.value);
        const matching = rows.filter(row => normalizeSearch(row.innerText).includes(query));
        const pageSize = 10;
        const pageCount = Math.max(1, Math.ceil(matching.length / pageSize));
        const page = Math.min(Number(input.dataset.page) || 1, pageCount);
        input.dataset.page = String(page);
        const visibleRows = new Set(matching.slice((page - 1) * pageSize, page * pageSize));
        rows.forEach(row => { row.hidden = !visibleRows.has(row); });

        let pagination = wrapper?.querySelector(".admin-table-pagination");
        if (!wrapper || matching.length <= pageSize) {
            pagination?.remove();
            return;
        }
        if (!pagination) {
            pagination = document.createElement("nav");
            pagination.className = "admin-table-pagination";
            pagination.setAttribute("aria-label", "Paginación de la tabla");
            wrapper.append(pagination);
        }
        pagination.innerHTML = `<button type="button" data-page="${page - 1}" ${page === 1 ? "disabled" : ""}>Anterior</button><span>Página ${page} de ${pageCount} · ${matching.length} registros</span><button type="button" data-page="${page + 1}" ${page === pageCount ? "disabled" : ""}>Siguiente</button>`;
        pagination.querySelectorAll("[data-page]").forEach(button => button.addEventListener("click", () => {
            input.dataset.page = button.dataset.page;
            applyTableSearch(input);
        }));
    }

    function applyListSearch(input) {
        const list = document.getElementById(input.dataset.listSearch);
        const query = normalizeSearch(input.value);
        list?.querySelectorAll(".admin-notification").forEach(item => {
            item.hidden = !normalizeSearch(item.innerText).includes(query);
        });
    }

    function applyAdminSearches() {
        document.querySelectorAll("[data-table-search]").forEach(applyTableSearch);
        document.querySelectorAll("[data-list-search]").forEach(applyListSearch);
    }

    function addActionDescriptions() {
        document.querySelectorAll(".admin-actions button, .admin-table-pagination button").forEach(button => {
            const label = button.textContent.trim();
            if (!button.dataset.tooltip) button.dataset.tooltip = label;
            button.setAttribute("aria-description", button.dataset.tooltip);
        });
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
        applyAdminSearches();
        addActionDescriptions();
    }

    document.getElementById("volunteerStateFilter").addEventListener("change", renderAll);
    document.getElementById("articleStateFilter").addEventListener("change", renderAll);
    document.querySelectorAll("[data-table-search]").forEach(input => input.addEventListener("input", () => {
        input.dataset.page = "1";
        applyTableSearch(input);
    }));
    document.querySelectorAll("[data-list-search]").forEach(input => input.addEventListener("input", () => applyListSearch(input)));
    document.querySelectorAll("#volunteerTable, #articleTable, #userTable, #placeTable, #speciesTable").forEach(table => {
        table.addEventListener("click", event => {
            const button = event.target.closest("[data-action]");
            if (!button) return;
            const { action, id } = button.dataset;
            if (action === "edit-place") {
                const place = content.getById("lugares", id);
                const form = document.getElementById("placeForm");
                form.closest("details").open = true;
                form.elements.id.value = place.lugares_id;
                form.elements.nombre.value = place.nombre;
                form.elements.tipo.value = place.tipo || "otro";
                form.elements.descripcion.value = place.descripcion || "";
                form.elements.direccion.value = place.ubicacion.direccion;
                form.elements.latitud.value = place.ubicacion.latitud ?? "";
                form.elements.longitud.value = place.ubicacion.longitud ?? "";
                form.elements.informacionConservacion.value = place.informacionConservacion || "";
                form.elements.fuenteInformacion.value = place.fuenteInformacion || "";
                form.scrollIntoView({ behavior: "smooth", block: "center" });
                return;
            }
            if (action === "edit-species") {
                const item = content.getById("floraFauna", id);
                const form = document.getElementById("speciesForm");
                form.closest("details").open = true;
                Object.entries({ id: item.floraFauna_id, nombre: item.nombre, nombreCientifico: item.nombreCientifico, tipo: item.tipo, habitat: item.habitat, estadoConservacion: item.estadoConservacion, ubicacion: item.ubicacion, funcionEcologica: item.funcionEcologica, datoCurioso: item.datoCurioso, amenazas: item.amenazas, recomendaciones: item.recomendaciones, fuentes: item.fuentes?.join("\n"), imagen: item.imagenes?.[0], descripcion: item.descripcion }).forEach(([key, value]) => form.elements[key].value = value || "");
                form.scrollIntoView({ behavior: "smooth", block: "center" });
                return;
            }
            if (action === "toggle-place" && !window.confirm("¿Cambiar el estado del lugar? El registro se conservará para las actividades históricas.")) return;
            const confirmation = {
                "publish-volunteer": "¿Publicar este voluntariado? Será visible en el catálogo.",
                "reject-volunteer": "¿Rechazar esta propuesta? No aparecerá en el catálogo público.",
                "cancel-volunteer": "¿Cancelar este voluntariado? Las inscripciones activas se cancelarán y el historial se conservará.",
                "finish-volunteer": "¿Marcar este voluntariado como finalizado?",
                "publish-article": "¿Publicar este artículo? Será visible en el catálogo.",
                "reject-article": "¿Rechazar este artículo?",
                "retire-article": "¿Retirar este artículo de la publicación? Se conservará en administración.",
                "review-article": "¿Devolver este artículo a revisión?",
                "delete-volunteer": "¿Retirar este registro? Si tiene historial, se conservará como cancelado.",
                "delete-article": "¿Eliminar este borrador? Los artículos publicados se retiran sin borrar el registro."
            }[action];
            if (confirmation && !window.confirm(confirmation)) return;
            if (action === "save-user" && !window.confirm("¿Guardar los cambios de rol, estado y verificación para esta cuenta?")) return;
            if (action === "toggle-species" && !window.confirm("¿Cambiar el estado de esta ficha? El registro se conservará.")) return;
            runAction(() => {
                if (action === "publish-volunteer") content.moderateContent("voluntariados", id, "publicado");
                if (action === "reject-volunteer") content.moderateContent("voluntariados", id, "rechazado");
                if (action === "cancel-volunteer") content.moderateContent("voluntariados", id, "cancelado");
                if (action === "finish-volunteer") content.moderateContent("voluntariados", id, "finalizado");
                if (action === "delete-volunteer") content.removeContent("voluntariados", id);
                if (action === "publish-article") content.moderateContent("articulos", id, "publicado");
                if (action === "reject-article") content.moderateContent("articulos", id, "rechazado");
                if (action === "retire-article") content.moderateContent("articulos", id, "retirado");
                if (action === "review-article") content.moderateContent("articulos", id, "pendiente");
                if (action === "delete-article") content.removeContent("articulos", id);
                if (action === "toggle-place") {
                    const place = content.getById("lugares", id);
                    if (place?.estado === "inactivo") content.updatePlace(id, { estado: "activo" });
                    else content.removePlace(id);
                }
                if (action === "toggle-species") {
                    const item = content.getById("floraFauna", id);
                    if (item) content.updateFlora(id, { estado: item.estado === "inactivo" ? "activo" : "inactivo" });
                }
                if (action === "save-user") {
                    const row = button.closest("[data-user-row]");
                    content.updateUser(id, {
                        rol: row.querySelector("[data-user-role]").value,
                        estado: row.querySelector("[data-user-state]").value,
                        solicitudOrganizadorEstado: row.querySelector("[data-user-request]").value,
                        organizadorVerificado: row.querySelector("[data-user-verified]").checked || row.querySelector("[data-user-request]").value === "aprobada"
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
        const values = {
            nombre: String(data.get("nombre")).trim(),
            tipo: String(data.get("tipo") || "otro"),
            descripcion: String(data.get("descripcion") || "").trim(),
            direccion: String(data.get("direccion")).trim(),
            latitud: data.get("latitud"),
            longitud: data.get("longitud"),
            informacionConservacion: String(data.get("informacionConservacion") || "").trim(),
            fuenteInformacion: String(data.get("fuenteInformacion") || "").trim()
        };
        runAction(() => {
            if (id) content.updatePlace(id, { nombre: values.nombre, tipo: values.tipo, descripcion: values.descripcion, informacionConservacion: values.informacionConservacion, fuenteInformacion: values.fuenteInformacion, ubicacion: { ...content.getById("lugares", id).ubicacion, nombre: values.nombre, direccion: values.direccion, latitud: values.latitud === "" ? null : Number(values.latitud), longitud: values.longitud === "" ? null : Number(values.longitud) } });
            else content.createPlace(values);
            form.reset();
        }, "Lugar guardado.");
    });

    document.getElementById("speciesForm").addEventListener("submit", event => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const id = String(data.get("id"));
        const values = Object.fromEntries(["nombre", "nombreCientifico", "tipo", "habitat", "estadoConservacion", "ubicacion", "funcionEcologica", "datoCurioso", "amenazas", "recomendaciones", "descripcion", "imagen"].map(key => [key, String(data.get(key) || "").trim()]));
        values.fuentes = String(data.get("fuentes") || "").split(/\r?\n/).map(value => value.trim()).filter(Boolean);
        runAction(() => {
            if (id) content.updateFlora(id, values);
            else content.createFlora(values);
            form.reset();
        }, "Registro de flora/fauna guardado.");
    });

    document.getElementById("placeForm").addEventListener("reset", () => window.setTimeout(() => document.querySelector('#placeForm [name="id"]').value = "", 0));
    document.getElementById("speciesForm").addEventListener("reset", () => window.setTimeout(() => document.querySelector('#speciesForm [name="id"]').value = "", 0));

    const requestedParams = new URLSearchParams(window.location.search);
    const requestedTab = requestedParams.get("tab");
    const requestedSpecies = requestedParams.get("editSpecies");
    showTab(tabNames[requestedTab] ? requestedTab : "dashboard");
    renderAll();
    if (requestedSpecies) {
        showTab("flora");
        const editButton = [...document.querySelectorAll('#speciesTable [data-action="edit-species"]')]
            .find(button => button.dataset.id === requestedSpecies);
        editButton?.click();
    }
}
