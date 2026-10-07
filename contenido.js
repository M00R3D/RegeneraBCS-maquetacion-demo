(() => {
    const collections = {
        articulo: [
            {
                id: "articulo-1",
                category: "COMUNIDAD",
                title: "Nuevas iniciativas para cuidar nuestras costas",
                summary: "Conoce proyectos locales que buscan generar un impacto positivo y fortalecer la relación entre las comunidades y sus espacios naturales.",
                content: "Las comunidades de Baja California Sur impulsan iniciativas para mantener limpias las playas, reducir los residuos y cuidar los ecosistemas costeros.\n\nLa participación local ayuda a identificar las necesidades de cada lugar y a sostener acciones de conservación a largo plazo. Informarse, colaborar y compartir buenas prácticas son formas concretas de contribuir.",
                image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1400&q=85",
                author: "Regenera BCS"
            },
            {
                id: "articulo-2",
                category: "NATURALEZA",
                title: "Protegiendo los ecosistemas de BCS",
                summary: "Información y recomendaciones para visitar nuestros espacios naturales procurando reducir el impacto sobre sus ecosistemas.",
                content: "Los ecosistemas sudcalifornianos conectan ambientes desérticos, costeros y marinos. Cada uno alberga especies y procesos naturales que pueden verse afectados por actividades humanas.\n\nAl visitar áreas naturales, permanece en los senderos establecidos, evita dejar residuos, respeta la fauna y sigue las indicaciones de las comunidades y autoridades locales.",
                image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=85",
                author: "Regenera BCS"
            },
            {
                id: "articulo-3",
                category: "TURISMO",
                title: "¿Qué significa viajar responsablemente?",
                summary: "Algunas prácticas sencillas que pueden ayudar a reducir nuestro impacto cuando visitamos destinos naturales y comunidades locales.",
                content: "Viajar responsablemente implica considerar el efecto de nuestras decisiones en el entorno y en las personas que habitan cada destino.\n\nPlanear las visitas, consumir en negocios locales, respetar las reglas de cada sitio y reducir el uso de desechables ayuda a que el turismo contribuya positivamente a Baja California Sur.",
                image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85",
                author: "Regenera BCS"
            }
        ],
        flora: [
            {
                id: "flora-1",
                category: "VIDA MARINA",
                title: "Ballena gris",
                summary: "Una de las especies marinas más representativas de Baja California Sur y una visitante importante de sus costas durante determinadas épocas del año.",
                content: "La ballena gris realiza una migración anual entre sus zonas de alimentación y las lagunas de reproducción en la península de Baja California. Su presencia forma parte del patrimonio natural de la región y de la vida de las comunidades costeras.\n\nPara observarla responsablemente, elige operadores autorizados, sigue las indicaciones de navegación y evita acercamientos que puedan alterar el comportamiento de los animales.",
                image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=1400&q=85"
            },
            {
                id: "flora-2",
                category: "ECOSISTEMAS MARINOS",
                title: "Vida marina",
                summary: "Los mares sudcalifornianos albergan una amplia variedad de especies y ecosistemas que requieren prácticas responsables para su conservación.",
                content: "Las aguas que rodean Baja California Sur sostienen una gran diversidad de vida marina y son parte esencial de la cultura y economía regionales.\n\nEvitar tocar o alimentar animales, no extraer organismos y reducir los residuos que llegan al mar son medidas sencillas para ayudar a conservar estos ecosistemas.",
                image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=85"
            },
            {
                id: "flora-3",
                category: "ECOSISTEMAS",
                title: "Ecosistemas costeros",
                summary: "Playas, dunas, manglares y otros ambientes costeros forman una conexión fundamental entre el desierto y el océano.",
                content: "Los ecosistemas costeros protegen las orillas, sirven de refugio a diversas especies y conectan los ambientes terrestres con el océano.\n\nAl recorrerlos, procura caminar por accesos establecidos, no retirar elementos naturales y llevar contigo todos los residuos.",
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85"
            },
            {
                id: "flora-4",
                category: "FLORA Y FAUNA",
                title: "Desierto sudcaliforniano",
                summary: "Un ambiente marcado por condiciones extremas donde distintas especies han desarrollado adaptaciones particulares para sobrevivir.",
                content: "El desierto sudcaliforniano se caracteriza por lluvias escasas y temperaturas variables. Su flora y fauna han desarrollado adaptaciones para aprovechar el agua y sobrevivir en condiciones exigentes.\n\nAl visitarlo, mantente en caminos existentes, no recolectes plantas ni animales y respeta los espacios de las comunidades locales.",
                image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85"
            }
        ],
        voluntariado: [
            {
                id: 1,
                category: "LIMPIEZA",
                title: "Limpieza de Playa Balandra",
                date: "12 Octubre 2026",
                hour: "08:00 AM",
                place: "Playa Balandra",
                capacity: 30,
                participants: 18,
                organizer: "Regenera BCS",
                summary: "Actividad comunitaria para retirar residuos y mantener limpia la zona costera.",
                content: "Jornada comunitaria para retirar residuos de Playa Balandra y cuidar el ecosistema costero. Se recomienda llevar agua reutilizable, protección solar y calzado cómodo. El equipo organizador compartirá las indicaciones de seguridad y los materiales antes de iniciar.",
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85"
            },
            {
                id: 2,
                category: "RESTAURACIÓN",
                title: "Restauración de zona costera",
                date: "18 Octubre 2026",
                hour: "07:30 AM",
                place: "El Manglito",
                capacity: 20,
                participants: 12,
                organizer: "Iniciativa local",
                summary: "Actividad enfocada en restauración y cuidado de espacios naturales urbanos.",
                content: "Participa en una jornada de restauración y cuidado de espacios naturales urbanos en El Manglito. La actividad incluye una introducción al área y tareas comunitarias adecuadas para personas voluntarias. Sigue las instrucciones del equipo organizador durante toda la jornada.",
                image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85"
            },
            {
                id: 3,
                category: "CONSERVACIÓN",
                title: "Monitoreo de fauna marina",
                date: "25 Octubre 2026",
                hour: "07:00 AM",
                place: "Zona costera de La Paz",
                capacity: 15,
                participants: 9,
                organizer: "Regenera BCS",
                summary: "Participación en una jornada de observación y registro de fauna marina.",
                content: "Acompaña una jornada de observación y registro de fauna marina en la costa de La Paz. Las personas participantes aprenderán prácticas de observación responsable y apoyarán el registro de información sin acercarse ni interferir con los animales.",
                image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=1400&q=85"
            },
            {
                id: 4,
                category: "LIMPIEZA",
                title: "Limpieza de espacios públicos",
                date: "01 Noviembre 2026",
                hour: "08:00 AM",
                place: "Centro de La Paz",
                capacity: 25,
                participants: 7,
                organizer: "Comunidad Regenera",
                summary: "Jornada comunitaria para recuperar y mantener espacios públicos.",
                content: "Únete a una jornada comunitaria para recuperar y mantener espacios públicos del Centro de La Paz. La organización coordinará las zonas de trabajo y facilitará recomendaciones para separar y disponer los residuos recolectados.",
                image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1400&q=85"
            }
        ]
    };

    const storageKeys = {
        articulo: "articulosRegenera",
        voluntariado: "voluntariadosRegenera"
    };

    const homeVolunteerDetails = [
        {
            id: "home-vol-1",
            category: "CONSERVACIÓN COSTERA",
            title: "Limpieza de playa",
            date: "En 4 días",
            place: "La Paz",
            participants: 18,
            summary: "Jornada comunitaria para retirar residuos y proteger los ecosistemas costeros.",
            content: "Súmate a una jornada comunitaria en La Paz para retirar residuos de la costa y ayudar a proteger los ecosistemas costeros. La actividad está abierta a personas voluntarias; el equipo organizador compartirá el punto exacto de encuentro y las recomendaciones para participar.",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85"
        },
        {
            id: "home-vol-2",
            category: "RESTAURACIÓN",
            title: "Restauración costera",
            date: "En 8 días",
            place: "El Mogote",
            participants: 9,
            summary: "Participa en actividades para recuperar espacios naturales y fortalecer su conservación.",
            content: "Participa en actividades comunitarias para recuperar espacios naturales de El Mogote y fortalecer su conservación. La jornada ayudará a cuidar un entorno costero importante para la biodiversidad local. El equipo organizador facilitará indicaciones sobre las tareas y el punto de encuentro.",
            image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85"
        },
        {
            id: "home-vol-3",
            category: "BIODIVERSIDAD",
            title: "Conservación de especies",
            date: "En 12 días",
            place: "Todos Santos",
            participants: 14,
            summary: "Colabora en una iniciativa enfocada en proteger la biodiversidad local.",
            content: "Colabora en una iniciativa de Todos Santos enfocada en proteger la biodiversidad local. Las personas voluntarias apoyarán acciones de conservación y conocerán maneras de contribuir al cuidado de las especies y sus hábitats.",
            image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=1400&q=85"
        }
    ];

    function escapeHtml(value) {
        return String(value ?? "").replace(/[&<>"']/g, character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[character]);
    }

    function getUser() {
        const raw = localStorage.getItem("usuarioRegenera");
        if (!raw) return null;

        try {
            const user = JSON.parse(raw);
            return user && typeof user.nombre === "string" ? user : null;
        } catch (error) {
            console.error("No se pudo leer la sesión guardada.", error);
            return null;
        }
    }

    function getItems(type) {
        const baseItems = collections[type];
        if (!baseItems) throw new Error(`Tipo de contenido desconocido: ${type}`);
        const key = storageKeys[type];
        if (!key) return [...baseItems];

        const raw = localStorage.getItem(key);
        if (!raw) return [...baseItems];

        try {
            const saved = JSON.parse(raw);
            if (!Array.isArray(saved)) throw new Error("El contenido guardado no es una lista.");
            return [...baseItems, ...saved];
        } catch (error) {
            console.error(`No se pudo leer el contenido guardado de ${type}.`, error);
            throw error;
        }
    }

    function findItem(type, id) {
        const items = type === "voluntariado"
            ? [...getItems(type), ...homeVolunteerDetails]
            : getItems(type);
        return items.find(entry => String(entry.id) === String(id));
    }

    function detailUrl(type, id) {
        return `detalle.html?tipo=${encodeURIComponent(type)}&id=${encodeURIComponent(id)}`;
    }

    function getImageUrl(url, fallback) {
        if (!String(url || "").trim()) return fallback;
        try {
            const parsed = new URL(url, window.location.href);
            return ["http:", "https:"].includes(parsed.protocol) ? parsed.href : fallback;
        } catch {
            return fallback;
        }
    }

    function formatDate(value) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value || ""))) return value;
        const date = new Date(`${value}T12:00:00`);
        return new Intl.DateTimeFormat("es-MX", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(date);
    }

    function formatTime(value) {
        const match = /^(\d{2}):(\d{2})$/.exec(String(value || ""));
        if (!match) return value;
        const date = new Date(2000, 0, 1, Number(match[1]), Number(match[2]));
        return new Intl.DateTimeFormat("es-MX", {
            hour: "numeric",
            minute: "2-digit"
        }).format(date);
    }

    function setUserNavigation() {
        const user = getUser();
        document.querySelectorAll(".user-nav").forEach(link => {
            link.href = user ? "perfil.html" : "login.html";
            link.textContent = user ? "Mi perfil" : "Iniciar sesión";
        });
    }

    function addCardDetailLink(card, type, item) {
        const url = detailUrl(type, item.id);
        const existingLinks = card.querySelectorAll("a");
        if (existingLinks.length) {
            existingLinks.forEach(link => {
                link.href = url;
            });
        } else {
            const content = card.querySelector(".info-card-content");
            if (content) {
                const link = document.createElement("a");
                link.className = "info-card-link";
                link.href = url;
                link.textContent = "Ver detalles →";
                content.appendChild(link);
            }
        }

        card.addEventListener("click", event => {
            if (event.target.closest("a, button")) return;
            window.location.href = url;
        });
    }

    function renderSavedCards(type, container) {
        const baseIds = new Set(collections[type].map(item => String(item.id)));
        getItems(type)
            .filter(item => !baseIds.has(String(item.id)))
            .forEach(item => {
                const card = document.createElement("article");
                card.className = type === "articulo" ? "article-page-card" : "info-card";
                const imageClass = type === "articulo" ? "article-page-image" : "info-card-image";
                const contentClass = type === "articulo" ? "article-page-content" : "info-card-content";
                const categoryClass = type === "flora" ? "info-card-category" : "";
                const titleTag = type === "flora" ? "h3" : "h2";
                const summary = item.summary || item.description || "";
                card.innerHTML = `
                    <div class="${imageClass}" style="background-image:url('${escapeHtml(getImageUrl(item.image, collections[type][0].image))}')"></div>
                    <div class="${contentClass}">
                        <span class="${categoryClass}">${escapeHtml(item.category || "COMUNIDAD")}</span>
                        <${titleTag}>${escapeHtml(item.title)}</${titleTag}>
                        <p>${escapeHtml(summary)}</p>
                        <a class="${type === "articulo" ? "article-link" : "info-card-link"}" href="${detailUrl(type, item.id)}">Ver detalles →</a>
                    </div>`;
                container.appendChild(card);
                addCardDetailLink(card, type, item);
            });
    }

    function initializeDetailLinks() {
        document.querySelectorAll('[data-content-listing="articulo"]').forEach(container => {
            const cards = [...container.querySelectorAll(".article-page-card, .article-card")];
            const items = collections.articulo;
            cards.forEach((card, index) => {
                const item = items[index] || items[0];
                const title = card.querySelector("h2, h3");
                const matchingItem = items.find(entry => entry.title === title?.textContent.trim()) || item;
                addCardDetailLink(card, "articulo", matchingItem);
            });
            if (container.dataset.contentListing === "articulo") renderSavedCards("articulo", container);
        });

        document.querySelectorAll('[data-content-listing="flora"]').forEach(container => {
            container.querySelectorAll(".info-card").forEach((card, index) => {
                const title = card.querySelector("h3");
                const item = collections.flora.find(entry => entry.title === title?.textContent.trim()) || collections.flora[index];
                if (item) addCardDetailLink(card, "flora", item);
            });
            renderSavedCards("flora", container);
        });

        document.querySelectorAll('[data-home-listing="voluntariado"] .volunteer-card').forEach((card, index) => {
            const item = homeVolunteerDetails[index];
            if (item) addCardDetailLink(card, "voluntariado", item);
        });

        document.querySelectorAll(".articles-grid .article-card").forEach(card => {
            const title = card.querySelector("h3")?.textContent.trim();
            const item = collections.articulo.find(entry => entry.title === title) || collections.articulo[0];
            addCardDetailLink(card, "articulo", item);
        });
    }

    function renderDetail() {
        const target = document.getElementById("detailContent");
        if (!target) return;
        const params = new URLSearchParams(window.location.search);
        const type = params.get("tipo");
        const id = params.get("id");
        const item = collections[type] ? findItem(type, id) : null;

        if (!item) {
            document.title = "Contenido no encontrado · Regenera BCS";
            target.innerHTML = '<div class="detail-not-found"><h1>Contenido no encontrado</h1><p>El elemento solicitado no existe o ya no está disponible.</p><a href="index.html">Volver al inicio</a></div>';
            return;
        }

        const labels = { articulo: "Artículo", flora: "Flora y fauna", voluntariado: "Voluntariado" };
        const returnPages = { articulo: "articulos.html", flora: "flora.html", voluntariado: "voluntariados.html" };
        const title = item.title || item.titulo;
        const description = item.content || item.descripcion || item.summary || item.description || "";
        const lines = description.split(/\n+/).filter(Boolean);
        const details = type === "voluntariado"
            ? `<div class="detail-meta"><span>📅 ${escapeHtml(formatDate(item.date || item.fecha || "Fecha por confirmar"))}</span><span>🕐 ${escapeHtml(formatTime(item.hour || item.hora || "Horario por confirmar"))}</span><span>📍 ${escapeHtml(item.place || item.lugar || "Baja California Sur")}</span><span>👥 ${escapeHtml(item.participants ?? item.inscritos ?? 0)} participantes</span>${item.capacity || item.cupo ? `<span>🎟️ Cupo: ${escapeHtml(item.capacity || item.cupo)}</span>` : ""}${item.organizer ? `<span>Organiza: ${escapeHtml(item.organizer)}</span>` : ""}</div>`
            : "";

        document.title = `${title} · Regenera BCS`;
        target.innerHTML = `
            <article class="detail-article">
                <img class="detail-image" src="${escapeHtml(getImageUrl(item.image, collections[type][0].image))}" alt="${escapeHtml(title)}">
                <div class="detail-body">
                    <span class="detail-label">${escapeHtml(labels[type] || "Detalle")} · ${escapeHtml(item.category || item.categoria || "")}</span>
                    <h1>${escapeHtml(title)}</h1>
                    ${details}
                    <p class="detail-summary">${escapeHtml(item.summary || item.descripcion || item.description || "")}</p>
                    <div class="detail-copy">${lines.map(line => `<p>${escapeHtml(line)}</p>`).join("")}</div>
                    ${item.author ? `<p class="detail-author">Publicado por ${escapeHtml(item.author)}</p>` : ""}
                    ${type === "voluntariado" ? `<button class="detail-action" id="participateButton" type="button">Participar</button>` : ""}
                    <a class="section-link" href="${returnPages[type] || "index.html"}">← Volver a ${escapeHtml(labels[type]?.toLowerCase() || "inicio")}</a>
                </div>
            </article>`;

        if (type === "voluntariado") {
            document.getElementById("participateButton").addEventListener("click", () => {
                const user = getUser();
                if (!user) {
                    const returnTo = `detalle.html${window.location.search}`;
                    window.location.href = `login.html?returnTo=${encodeURIComponent(returnTo)}`;
                    return;
                }
                const participations = JSON.parse(localStorage.getItem("participacionesRegenera") || "[]");
                if (!participations.includes(item.id)) participations.push(item.id);
                localStorage.setItem("participacionesRegenera", JSON.stringify(participations));
                window.alert(`Te has inscrito en "${title}".`);
            });
        }
    }

    function initializeCreateForm() {
        const form = document.getElementById("createContentForm");
        if (!form) return;
        const user = getUser();
        const params = new URLSearchParams(window.location.search);
        const type = params.get("tipo");

        if (!user) {
            const returnTo = `crear-contenido.html?tipo=${encodeURIComponent(type || "")}`;
            window.location.replace(`login.html?returnTo=${encodeURIComponent(returnTo)}`);
            return;
        }
        if (!storageKeys[type]) {
            form.innerHTML = '<p class="form-error">El tipo de publicación no es válido.</p>';
            return;
        }

        const isArticle = type === "articulo";
        document.getElementById("createTitle").textContent = isArticle ? "Crear artículo" : "Crear voluntariado";
        document.getElementById("createSubtitle").textContent = isArticle
            ? "Comparte información e iniciativas con la comunidad."
            : "Publica una actividad para invitar a la comunidad a participar.";
        document.querySelectorAll("[data-field-group]").forEach(group => {
            group.hidden = group.dataset.fieldGroup !== type;
            group.querySelectorAll("input, textarea, select").forEach(field => {
                field.required = !group.hidden;
            });
        });
        document.title = `${isArticle ? "Crear artículo" : "Crear voluntariado"} · Regenera BCS`;

        form.addEventListener("submit", event => {
            event.preventDefault();
            if (!form.reportValidity()) return;

            const data = new FormData(form);
            const record = isArticle
                ? {
                    id: `articulo-${Date.now()}`,
                    title: String(data.get("title")).trim(),
                    category: String(data.get("category")).trim().toUpperCase(),
                    summary: String(data.get("summary")).trim(),
                    content: String(data.get("content")).trim(),
                    image: getImageUrl(String(data.get("image") || ""), collections.articulo[0].image),
                    author: user.nombre,
                    createdAt: new Date().toISOString()
                }
                : {
                    id: `voluntariado-${Date.now()}`,
                    title: String(data.get("title")).trim(),
                    category: String(data.get("category")).trim().toUpperCase(),
                    date: String(data.get("date")).trim(),
                    hour: String(data.get("hour")).trim(),
                    place: String(data.get("place")).trim(),
                    participants: 0,
                    capacity: Number(data.get("capacity")),
                    organizer: user.nombre,
                    summary: String(data.get("summary")).trim(),
                    content: String(data.get("content")).trim(),
                    image: getImageUrl(String(data.get("image") || ""), collections.voluntariado[0].image),
                    author: user.nombre,
                    createdAt: new Date().toISOString()
                };

            const saved = JSON.parse(localStorage.getItem(storageKeys[type]) || "[]");
            if (!Array.isArray(saved)) throw new Error("El contenido guardado no es una lista.");
            saved.push(record);
            localStorage.setItem(storageKeys[type], JSON.stringify(saved));
            window.location.href = `${isArticle ? "articulos.html" : "voluntariados.html"}?publicado=${encodeURIComponent(record.id)}`;
        });
    }

    window.RegeneraContent = { collections, getItems, getUser, detailUrl, escapeHtml, formatDate, formatTime };
    setUserNavigation();
    initializeDetailLinks();
    renderDetail();
    initializeCreateForm();
})();
