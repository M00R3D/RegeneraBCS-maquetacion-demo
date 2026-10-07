(() => {
    const keys = {
        usuarios: "regenera_usuarios",
        voluntariados: "regenera_voluntariados",
        inscripciones: "regenera_inscripciones",
        asistencias: "regenera_asistencias",
        articulos: "regenera_articulos",
        notificaciones: "regenera_notificaciones",
        auditoria: "regenera_auditoria",
        lugares: "regenera_lugares",
        floraFauna: "regenera_flora_fauna",
        sesion: "regenera_sesion"
    };
    const categories = [
        "limpieza",
        "restauración",
        "reforestación",
        "monitoreo",
        "conservación",
        "educación ambiental"
    ];
    let generatedId = 0;

    const demoUsers = [
        { usuario_id: "usr-admin", nombre: "Administración Regenera", correo: "admin@regenera.test", password: "demo123", foto: "", rol: "administrador", organizadorVerificado: false, fechaRegistro: "2026-01-01T09:00:00.000Z", estado: "activo" },
        { usuario_id: "usr-user", nombre: "María Demo", correo: "usuario@regenera.test", password: "demo123", foto: "", rol: "usuario", organizadorVerificado: false, fechaRegistro: "2026-01-02T09:00:00.000Z", estado: "activo" },
        { usuario_id: "usr-organizer", nombre: "Carlos Organizador", correo: "organizador@regenera.test", password: "demo123", foto: "", rol: "organizador", organizadorVerificado: true, fechaRegistro: "2026-01-03T09:00:00.000Z", estado: "activo" }
    ];
    const demoPlaces = [
        { lugares_id: "lugar-balandra", nombre: "Balandra", descripcion: "Área costera y natural al norte de La Paz.", tipo: "playa", ubicacion: { nombre: "Balandra", direccion: "Carretera a Pichilingue, La Paz, BCS", latitud: 24.321, longitud: -110.327 }, informacionConservacion: "Respetar los accesos, no dejar residuos y seguir las indicaciones del área.", imagenes: [], fuenteInformacion: "Regenera BCS", fechaActualizacion: "2026-01-01T09:00:00.000Z", estado: "activo" },
        { lugares_id: "lugar-manglito", nombre: "El Manglito", descripcion: "Zona costera y comunidad pesquera de La Paz.", tipo: "comunidad", ubicacion: { nombre: "El Manglito", direccion: "La Paz, Baja California Sur", latitud: 24.134, longitud: -110.318 }, informacionConservacion: "Cuidar los espacios comunitarios y el entorno marino.", imagenes: [], fuenteInformacion: "Regenera BCS", fechaActualizacion: "2026-01-01T09:00:00.000Z", estado: "activo" },
        { lugares_id: "lugar-mogote", nombre: "El Mogote", descripcion: "Península y zona de humedales frente a La Paz.", tipo: "humedal", ubicacion: { nombre: "El Mogote", direccion: "Bahía de La Paz, Baja California Sur", latitud: 24.155, longitud: -110.383 }, informacionConservacion: "Evitar perturbar humedales y fauna silvestre.", imagenes: [], fuenteInformacion: "Regenera BCS", fechaActualizacion: "2026-01-01T09:00:00.000Z", estado: "activo" },
        { lugares_id: "lugar-todos-santos", nombre: "Todos Santos", descripcion: "Localidad y entorno natural del municipio de La Paz.", tipo: "localidad", ubicacion: { nombre: "Todos Santos", direccion: "Todos Santos, Baja California Sur", latitud: 23.446, longitud: -110.224 }, informacionConservacion: "Respetar las áreas naturales y las comunidades locales.", imagenes: [], fuenteInformacion: "Regenera BCS", fechaActualizacion: "2026-01-01T09:00:00.000Z", estado: "activo" }
    ];
    const demoVolunteers = [
        { voluntariados_id: "vol-01", organizador_id: "usr-organizer", lugar_id: "lugar-balandra", titulo: "Limpieza de playa", descripcion: "Jornada comunitaria para retirar residuos y proteger los ecosistemas costeros.", categoria: "limpieza", imagen: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85", fecha: "2026-10-10", horarioInicio: "08:00", horarioFin: "11:00", ubicacion: "Acceso principal de Balandra", capacidad: 30, requisitos: "Llevar agua reutilizable y protección solar.", materiales: "Guantes y bolsas para residuos.", estado: "publicado", fechaCreacion: "2026-08-01T09:00:00.000Z", fechaActualizacion: "2026-08-01T09:00:00.000Z" },
        { voluntariados_id: "vol-02", organizador_id: "usr-organizer", lugar_id: "lugar-mogote", titulo: "Restauración costera", descripcion: "Participa en actividades para recuperar espacios naturales y fortalecer su conservación.", categoria: "restauración", imagen: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=85", fecha: "2026-10-14", horarioInicio: "07:30", horarioFin: "10:30", ubicacion: "Zona de trabajo El Mogote", capacidad: 20, requisitos: "Calzado cerrado y disposición para trabajo en exterior.", materiales: "Herramientas proporcionadas por la organización.", estado: "publicado", fechaCreacion: "2026-08-02T09:00:00.000Z", fechaActualizacion: "2026-08-02T09:00:00.000Z" },
        { voluntariados_id: "vol-03", organizador_id: "usr-organizer", lugar_id: "lugar-todos-santos", titulo: "Conservación de especies", descripcion: "Colabora en una iniciativa enfocada en proteger la biodiversidad local.", categoria: "conservación", imagen: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=1000&q=85", fecha: "2026-10-18", horarioInicio: "07:00", horarioFin: "10:00", ubicacion: "Punto de encuentro Todos Santos", capacidad: 25, requisitos: "Seguir las indicaciones del equipo de conservación.", materiales: "Libreta de campo opcional.", estado: "publicado", fechaCreacion: "2026-08-03T09:00:00.000Z", fechaActualizacion: "2026-08-03T09:00:00.000Z" },
        { voluntariados_id: "vol-04", organizador_id: "usr-organizer", lugar_id: "lugar-manglito", titulo: "Monitoreo de fauna marina", descripcion: "Jornada de observación y registro responsable de fauna marina.", categoria: "monitoreo", imagen: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=85", fecha: "2026-10-25", horarioInicio: "07:00", horarioFin: "09:30", ubicacion: "Malecón de El Manglito", capacidad: 15, requisitos: "No se requiere experiencia previa.", materiales: "Formato de observación y lápiz.", estado: "publicado", fechaCreacion: "2026-08-04T09:00:00.000Z", fechaActualizacion: "2026-08-04T09:00:00.000Z" },
        { voluntariados_id: "vol-05", organizador_id: "usr-organizer", lugar_id: "lugar-manglito", titulo: "Recuperación de manglar", descripcion: "Actividad propuesta para recuperar un espacio natural costero.", categoria: "reforestación", imagen: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1000&q=85", fecha: "2026-11-02", horarioInicio: "08:00", horarioFin: "12:00", ubicacion: "El Manglito", capacidad: 18, requisitos: "Asistir a la charla de seguridad.", materiales: "Plantas nativas y herramientas.", estado: "pendiente", fechaCreacion: "2026-08-05T09:00:00.000Z", fechaActualizacion: "2026-08-05T09:00:00.000Z" },
        { voluntariados_id: "vol-06", organizador_id: "usr-organizer", lugar_id: "lugar-todos-santos", titulo: "Educación ambiental comunitaria", descripcion: "Taller comunitario para compartir prácticas de cuidado del entorno.", categoria: "educación ambiental", imagen: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=85", fecha: "2026-09-10", horarioInicio: "09:00", horarioFin: "11:00", ubicacion: "Centro comunitario", capacidad: 20, requisitos: "Ninguno.", materiales: "Material educativo.", estado: "finalizado", fechaCreacion: "2026-07-20T09:00:00.000Z", fechaActualizacion: "2026-09-10T15:00:00.000Z" }
    ];
    const demoArticles = [
        { articulos_id: "art-01", autor_id: "usr-organizer", titulo: "Nuevas iniciativas para cuidar nuestras costas", contenido: "Las comunidades de Baja California Sur impulsan iniciativas para mantener limpias las playas, reducir los residuos y cuidar los ecosistemas costeros.\n\nLa participación local ayuda a identificar las necesidades de cada lugar y a sostener acciones de conservación a largo plazo.", imagen: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1200&q=85", categoria: "comunidad", estado: "publicado", fechaPublicacion: "2026-08-12T10:00:00.000Z", fechaActualizacion: "2026-08-12T10:00:00.000Z" },
        { articulos_id: "art-02", autor_id: "usr-admin", titulo: "Protegiendo los ecosistemas de BCS", contenido: "Los ecosistemas sudcalifornianos conectan ambientes desérticos, costeros y marinos. Cada uno alberga especies y procesos naturales que pueden verse afectados por actividades humanas.\n\nAl visitar áreas naturales, permanece en los senderos establecidos, evita dejar residuos y respeta la fauna.", imagen: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=85", categoria: "naturaleza", estado: "publicado", fechaPublicacion: "2026-08-16T10:00:00.000Z", fechaActualizacion: "2026-08-16T10:00:00.000Z" },
        { articulos_id: "art-03", autor_id: "usr-organizer", titulo: "¿Qué significa viajar responsablemente?", contenido: "Viajar responsablemente implica considerar el efecto de nuestras decisiones en el entorno y en las personas que habitan cada destino.\n\nPlanear las visitas, consumir en negocios locales y reducir el uso de desechables ayuda a que el turismo contribuya positivamente.", imagen: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85", categoria: "turismo", estado: "publicado", fechaPublicacion: "2026-08-20T10:00:00.000Z", fechaActualizacion: "2026-08-20T10:00:00.000Z" },
        { articulos_id: "art-04", autor_id: "usr-user", titulo: "Jóvenes por el cuidado del agua", contenido: "Una propuesta comunitaria para conversar sobre el cuidado del agua y los ecosistemas que dependen de ella.", imagen: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85", categoria: "comunidad", estado: "pendiente", fechaPublicacion: null, fechaActualizacion: "2026-08-22T10:00:00.000Z" },
        { articulos_id: "art-05", autor_id: "usr-organizer", titulo: "Buenas prácticas en áreas naturales", contenido: "Recomendaciones para visitar áreas naturales de Baja California Sur y reducir el impacto de nuestras actividades.", imagen: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=85", categoria: "conservación", estado: "pendiente", fechaPublicacion: null, fechaActualizacion: "2026-08-23T10:00:00.000Z" }
    ];
    const demoFlora = [
        { floraFauna_id: "ff-01", nombre: "Ballena gris", nombreCientifico: "Eschrichtius robustus", tipo: "fauna", descripcion: "Mamífero marino migratorio que visita las lagunas y costas de la península.", habitat: "Aguas costeras y lagunas de reproducción.", estadoConservacion: "Preocupación menor", imagenes: ["https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=1200&q=85"], ubicacion: "Costas de Baja California Sur" },
        { floraFauna_id: "ff-02", nombre: "Tortuga marina", nombreCientifico: "Cheloniidae", tipo: "fauna", descripcion: "Grupo de reptiles marinos que utiliza las costas para alimentarse y anidar.", habitat: "Océano y playas de anidación.", estadoConservacion: "Amenazada", imagenes: ["https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=1200&q=85"], ubicacion: "Litoral sudcaliforniano" },
        { floraFauna_id: "ff-03", nombre: "Cardón", nombreCientifico: "Pachycereus pringlei", tipo: "flora", descripcion: "Cactus columnar emblemático del desierto peninsular.", habitat: "Matorral xerófilo y desierto.", estadoConservacion: "Preocupación menor", imagenes: ["https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1200&q=85"], ubicacion: "Península de Baja California" },
        { floraFauna_id: "ff-04", nombre: "Lobo marino de California", nombreCientifico: "Zalophus californianus", tipo: "fauna", descripcion: "Mamífero marino que descansa y se reproduce en islas y zonas rocosas.", habitat: "Islas y costas rocosas.", estadoConservacion: "Preocupación menor", imagenes: ["https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85"], ubicacion: "Mar de Cortés" },
        { floraFauna_id: "ff-05", nombre: "Manglar rojo", nombreCientifico: "Rhizophora mangle", tipo: "flora", descripcion: "Árbol costero que forma refugios y ayuda a proteger las orillas.", habitat: "Lagunas costeras y estuarios.", estadoConservacion: "Protección especial", imagenes: ["https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=85"], ubicacion: "Humedales costeros de BCS" },
        { floraFauna_id: "ff-06", nombre: "Ballena azul", nombreCientifico: "Balaenoptera musculus", tipo: "fauna", descripcion: "El animal más grande del planeta y visitante de las aguas del Pacífico.", habitat: "Aguas abiertas y zonas de alimentación.", estadoConservacion: "En peligro", imagenes: ["https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=1200&q=85"], ubicacion: "Pacífico sudcaliforniano" }
    ];

    function createId(prefix) {
        generatedId += 1;
        return `${prefix}-${Date.now().toString(36)}-${generatedId.toString(36)}`;
    }

    function readKey(key, fallback = []) {
        const raw = localStorage.getItem(key);
        if (raw === null) return fallback;
        try {
            const value = JSON.parse(raw);
            if (!Array.isArray(value) && typeof value !== "object") throw new Error("Formato JSON inesperado.");
            return value;
        } catch (error) {
            console.error(`No se pudo leer ${key} desde localStorage.`, error);
            throw error;
        }
    }

    function writeKey(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`No se pudo guardar ${key} en localStorage.`, error);
            throw error;
        }
    }

    function getCollection(name) {
        if (!keys[name] || name === "sesion") throw new Error(`Colección no válida: ${name}`);
        const rows = readKey(keys[name]);
        if (!Array.isArray(rows)) throw new Error(`La colección ${name} debe ser una lista.`);
        return rows;
    }

    function saveCollection(name, rows) {
        if (!keys[name] || name === "sesion" || !Array.isArray(rows)) throw new Error(`No se puede guardar la colección ${name}.`);
        writeKey(keys[name], rows);
        return rows;
    }

    function getById(name, id) {
        const primaryKeys = {
            usuarios: "usuario_id",
            voluntariados: "voluntariados_id",
            inscripciones: "inscripciones_id",
            asistencias: "asistencia_id",
            articulos: "articulos_id",
            notificaciones: "notificaciones_id",
            auditoria: "auditoria_id",
            lugares: "lugares_id",
            floraFauna: "floraFauna_id"
        };
        const primaryKey = primaryKeys[name];
        return primaryKey ? getCollection(name).find(row => String(row[primaryKey]) === String(id)) : undefined;
    }

    function initializeDemoData() {
        const seeds = {
            usuarios: demoUsers,
            lugares: demoPlaces,
            voluntariados: demoVolunteers,
            articulos: demoArticles,
            floraFauna: demoFlora,
            inscripciones: [
                { inscripciones_id: "ins-01", usuario_id: "usr-user", voluntariado_id: "vol-01", fechaInscripciones: "2026-08-10T09:00:00.000Z", estado: "activa" },
                { inscripciones_id: "ins-02", usuario_id: "usr-user", voluntariado_id: "vol-02", fechaInscripciones: "2026-08-11T09:00:00.000Z", estado: "completada" },
                { inscripciones_id: "ins-03", usuario_id: "usr-organizer", voluntariado_id: "vol-01", fechaInscripciones: "2026-08-12T09:00:00.000Z", estado: "activa" },
                { inscripciones_id: "ins-04", usuario_id: "usr-organizer", voluntariado_id: "vol-02", fechaInscripciones: "2026-08-12T09:00:00.000Z", estado: "completada" },
                { inscripciones_id: "ins-05", usuario_id: "usr-admin", voluntariado_id: "vol-01", fechaInscripciones: "2026-08-13T09:00:00.000Z", estado: "activa" },
                { inscripciones_id: "ins-06", usuario_id: "usr-user", voluntariado_id: "vol-04", fechaInscripciones: "2026-08-14T09:00:00.000Z", estado: "activa" }
            ],
            asistencias: [
                { asistencia_id: "asis-01", usuario_id: "usr-user", voluntariado_id: "vol-02", fecha: "2026-08-11", hora: "10:30", metodo: "QR", confirmada: true },
                { asistencia_id: "asis-02", usuario_id: "usr-organizer", voluntariado_id: "vol-02", fecha: "2026-08-11", hora: "10:35", metodo: "QR", confirmada: true }
            ],
            notificaciones: [
                { notificaciones_id: "not-01", usuario_id: "usr-user", tipo: "inscripcion", titulo: "Inscripción confirmada", mensaje: "Tu lugar en Restauración costera está registrado.", entidad: { tipo: "voluntariado", id: "vol-02" }, prioridad: "normal", leido: false, fechaCreacion: "2026-08-11T09:00:00.000Z", fechaLectura: null, fechaExpiracion: null, datos: {} },
                { notificaciones_id: "not-02", usuario_id: "usr-organizer", tipo: "contenido", titulo: "Artículo aprobado", mensaje: "Tu artículo sobre iniciativas costeras fue publicado.", entidad: { tipo: "articulo", id: "art-01" }, prioridad: "normal", leido: true, fechaCreacion: "2026-08-12T10:00:00.000Z", fechaLectura: "2026-08-12T10:05:00.000Z", fechaExpiracion: null, datos: {} }
            ],
            auditoria: [
                { auditoria_id: "audit-01", usuario_id: "usr-admin", accion: "ADMIN_PUBLICO_ARTICULO", entidad: "articulos", entidad_id: "art-01", fecha: "2026-08-12T10:00:00.000Z", ip: "demo", detalles: "Publicación inicial de demostración." }
            ]
        };

        Object.entries(seeds).forEach(([name, rows]) => {
            if (localStorage.getItem(keys[name]) === null) writeKey(keys[name], rows);
        });

        if (localStorage.getItem(keys.sesion) === null) {
            const legacy = localStorage.getItem("usuarioRegenera");
            if (legacy) {
                try {
                    const oldUser = JSON.parse(legacy);
                    const users = getCollection("usuarios");
                    let user = users.find(row => row.correo.toLowerCase() === String(oldUser.correo || "").toLowerCase());
                    if (!user && oldUser.correo) {
                        user = {
                            usuario_id: createId("usr"),
                            nombre: String(oldUser.nombre || "Usuario"),
                            correo: String(oldUser.correo).toLowerCase(),
                            password: "",
                            foto: "",
                            rol: "usuario",
                            organizadorVerificado: false,
                            fechaRegistro: new Date().toISOString(),
                            estado: "activo"
                        };
                        users.push(user);
                        saveCollection("usuarios", users);
                    }
                    if (user) writeKey(keys.sesion, { usuario_id: user.usuario_id, fechaInicio: new Date().toISOString() });
                } catch (error) {
                    console.error("No se pudo migrar la sesión anterior.", error);
                    writeKey(keys.sesion, null);
                }
            } else {
                writeKey(keys.sesion, null);
            }
        }

        migrateLegacyContent();
    }

    function migrateLegacyContent() {
        const legacyMappings = [
            ["articulosRegenera", "articulos"],
            ["voluntariadosRegenera", "voluntariados"]
        ];
        legacyMappings.forEach(([oldKey, name]) => {
            const raw = localStorage.getItem(oldKey);
            if (!raw) return;
            try {
                const legacyRows = JSON.parse(raw);
                if (!Array.isArray(legacyRows)) throw new Error(`${oldKey} no contiene una lista.`);
                const rows = getCollection(name);
                const users = getCollection("usuarios");
                const author = users.find(user => user.usuario_id === (getSession()?.usuario_id || "usr-admin")) || users[0];
                legacyRows.forEach((item, index) => {
                    const id = `migrado-${name}-${item.id ?? index}`;
                    if (rows.some(row => row.articulos_id === id || row.voluntariados_id === id)) return;
                    if (name === "articulos") {
                        rows.push({
                            articulos_id: id,
                            autor_id: author.usuario_id,
                            titulo: String(item.title || item.titulo || "Artículo"),
                            contenido: String(item.content || item.descripcion || item.summary || ""),
                            imagen: item.image || "",
                            categoria: String(item.category || item.categoria || "comunidad").toLowerCase(),
                            estado: "pendiente",
                            fechaPublicacion: null,
                            fechaActualizacion: new Date().toISOString()
                        });
                    } else {
                        const place = getCollection("lugares").find(row => row.nombre === (item.place || item.lugar)) || getCollection("lugares")[0];
                        rows.push({
                            voluntariados_id: id,
                            organizador_id: author.usuario_id,
                            lugar_id: place.lugares_id,
                            titulo: String(item.title || item.titulo || "Voluntariado"),
                            descripcion: String(item.content || item.descripcion || item.summary || ""),
                            categoria: normalizeCategory(item.category || item.categoria),
                            imagen: item.image || "",
                            fecha: String(item.date || item.fecha || ""),
                            horarioInicio: String(item.hour || item.hora || ""),
                            horarioFin: "",
                            ubicacion: item.place || item.lugar || place.nombre,
                            capacidad: Number(item.capacity || item.cupo || 20),
                            requisitos: "",
                            materiales: "",
                            estado: "pendiente",
                            fechaCreacion: new Date().toISOString(),
                            fechaActualizacion: new Date().toISOString()
                        });
                    }
                });
                saveCollection(name, rows);
            } catch (error) {
                console.error(`No se pudo migrar ${oldKey}.`, error);
            }
        });

        const oldParticipations = localStorage.getItem("participacionesRegenera");
        const session = getSession();
        if (!oldParticipations || !session) return;
        try {
            const ids = JSON.parse(oldParticipations);
            if (!Array.isArray(ids)) throw new Error("Las inscripciones anteriores no son una lista.");
            const inscriptions = getCollection("inscripciones");
            ids.forEach(id => {
                const volunteer = getCollection("voluntariados").find(row => row.voluntariados_id === `vol-${String(id).padStart(2, "0")}`);
                if (!volunteer || inscriptions.some(row => row.usuario_id === session.usuario_id && row.voluntariado_id === volunteer.voluntariados_id)) return;
                inscriptions.push({ inscripciones_id: createId("ins"), usuario_id: session.usuario_id, voluntariado_id: volunteer.voluntariados_id, fechaInscripciones: new Date().toISOString(), estado: "activa" });
            });
            saveCollection("inscripciones", inscriptions);
        } catch (error) {
            console.error("No se pudieron migrar las inscripciones anteriores.", error);
        }
    }

    function getSession() {
        const session = readKey(keys.sesion, null);
        return session && typeof session === "object" && !Array.isArray(session) ? session : null;
    }

    function getCurrentUser() {
        const session = getSession();
        if (!session) return null;
        const user = getById("usuarios", session.usuario_id);
        return user && user.estado === "activo" ? user : null;
    }

    function setSession(user) {
        writeKey(keys.sesion, { usuario_id: user.usuario_id, fechaInicio: new Date().toISOString() });
        renderNavigation();
        return user;
    }

    function logout() {
        writeKey(keys.sesion, null);
        renderNavigation();
        window.location.href = "index.html";
    }

    function login(email, password) {
        const user = getCollection("usuarios").find(row => row.correo.toLowerCase() === email.trim().toLowerCase());
        if (!user) return { ok: false, message: "No encontramos una cuenta con ese correo." };
        if (user.estado !== "activo") return { ok: false, message: "Esta cuenta está inactiva. Contacta al administrador." };
        if (user.password !== password) return { ok: false, message: "La contraseña no coincide." };
        setSession(user);
        audit(user.usuario_id, "INICIO_SESION", "usuarios", user.usuario_id, "Inicio de sesión de demostración.");
        return { ok: true, user };
    }

    function register(name, email, password) {
        const users = getCollection("usuarios");
        if (users.some(user => user.correo.toLowerCase() === email.trim().toLowerCase())) {
            return { ok: false, message: "Ya existe una cuenta con ese correo." };
        }
        const user = {
            usuario_id: createId("usr"),
            nombre: name.trim(),
            correo: email.trim().toLowerCase(),
            password,
            foto: "",
            rol: "usuario",
            organizadorVerificado: false,
            fechaRegistro: new Date().toISOString(),
            estado: "activo"
        };
        users.push(user);
        saveCollection("usuarios", users);
        setSession(user);
        audit(user.usuario_id, "REGISTRO_USUARIO", "usuarios", user.usuario_id, "Alta desde el formulario de registro.");
        return { ok: true, user };
    }

    function requireUser() {
        const user = getCurrentUser();
        if (!user) throw new Error("Inicia sesión para realizar esta acción.");
        return user;
    }

    function createArticle(input) {
        const user = requireUser();
        const articles = getCollection("articulos");
        const now = new Date().toISOString();
        const article = {
            articulos_id: createId("art"),
            autor_id: user.usuario_id,
            titulo: String(input.titulo || "").trim(),
            contenido: String(input.contenido || "").trim(),
            imagen: String(input.imagen || ""),
            categoria: String(input.categoria || "").trim().toLowerCase(),
            estado: "pendiente",
            fechaPublicacion: null,
            fechaActualizacion: now
        };
        if (!article.titulo || !article.contenido || !article.categoria) throw new Error("Completa el título, la categoría y el contenido.");
        articles.unshift(article);
        saveCollection("articulos", articles);
        addNotification(user.usuario_id, "moderacion", "Artículo enviado a revisión", `“${article.titulo}” está pendiente de aprobación.`, { tipo: "articulos", id: article.articulos_id });
        audit(user.usuario_id, "CREA_ARTICULO", "articulos", article.articulos_id, "Artículo enviado a moderación.");
        return article;
    }

    function createVolunteer(input) {
        const user = requireUser();
        if (user.rol === "organizador" && !user.organizadorVerificado) throw new Error("Tu cuenta de organizador está pendiente de verificación.");
        const place = getById("lugares", input.lugar_id);
        if (!place || place.estado !== "activo") throw new Error("Selecciona un lugar activo.");
        const volunteers = getCollection("voluntariados");
        const now = new Date().toISOString();
        const volunteer = {
            voluntariados_id: createId("vol"),
            organizador_id: user.usuario_id,
            lugar_id: place.lugares_id,
            titulo: String(input.titulo || "").trim(),
            descripcion: String(input.descripcion || "").trim(),
            categoria: normalizeCategory(input.categoria),
            imagen: String(input.imagen || ""),
            fecha: String(input.fecha || ""),
            horarioInicio: String(input.horarioInicio || ""),
            horarioFin: String(input.horarioFin || ""),
            ubicacion: String(input.ubicacion || "").trim(),
            capacidad: Number(input.capacidad),
            requisitos: String(input.requisitos || "").trim(),
            materiales: String(input.materiales || "").trim(),
            estado: "pendiente",
            fechaCreacion: now,
            fechaActualizacion: now
        };
        if (!volunteer.titulo || !volunteer.descripcion || !volunteer.fecha || !volunteer.horarioInicio || !volunteer.horarioFin || !volunteer.ubicacion || !Number.isInteger(volunteer.capacidad) || volunteer.capacidad < 1) {
            throw new Error("Completa todos los datos obligatorios del voluntariado.");
        }
        volunteers.unshift(volunteer);
        saveCollection("voluntariados", volunteers);
        addNotification(user.usuario_id, "moderacion", "Voluntariado enviado a revisión", `“${volunteer.titulo}” está pendiente de aprobación.`, { tipo: "voluntariado", id: volunteer.voluntariados_id });
        audit(user.usuario_id, "CREA_VOLUNTARIADO", "voluntariados", volunteer.voluntariados_id, "Voluntariado enviado a moderación.");
        return volunteer;
    }

    function moderateContent(type, id, state) {
        const admin = getCurrentUser();
        if (!admin || admin.rol !== "administrador") throw new Error("Solo administración puede moderar contenido.");
        const config = {
            voluntariados: { pk: "voluntariados_id", states: ["publicado", "cancelado", "finalizado"], owner: "organizador_id", name: "voluntariado" },
            articulos: { pk: "articulos_id", states: ["publicado", "rechazado"], owner: "autor_id", name: "artículo" }
        }[type];
        if (!config || !config.states.includes(state)) throw new Error("El estado solicitado no es válido.");
        const rows = getCollection(type);
        const item = rows.find(row => row[config.pk] === id);
        if (!item) throw new Error("No se encontró el contenido solicitado.");
        item.estado = state;
        item.fechaActualizacion = new Date().toISOString();
        if (type === "articulos" && state === "publicado" && !item.fechaPublicacion) item.fechaPublicacion = item.fechaActualizacion;
        saveCollection(type, rows);
        const messages = {
            publicado: `Tu ${config.name} “${item.titulo}” fue publicado.`,
            rechazado: `Tu ${config.name} “${item.titulo}” fue rechazado.`,
            cancelado: `Tu voluntariado “${item.titulo}” fue cancelado.`,
            finalizado: `Tu voluntariado “${item.titulo}” fue marcado como finalizado.`
        };
        addNotification(item[config.owner], "moderacion", "Actualización de contenido", messages[state], { tipo: type === "articulos" ? "articulo" : "voluntariado", id });
        const action = {
            articulos: { publicado: "ADMIN_PUBLICO_ARTICULO", rechazado: "ADMIN_RECHAZO_ARTICULO" },
            voluntariados: { publicado: "ADMIN_PUBLICO_VOLUNTARIADO", cancelado: "ADMIN_CANCELA_VOLUNTARIADO", finalizado: "ADMIN_FINALIZA_VOLUNTARIADO" }
        }[type][state];
        audit(admin.usuario_id, action, type, id, `Estado actualizado a ${state}.`);
        return item;
    }

    function createFlora(input) {
        const admin = getCurrentUser();
        if (!admin || admin.rol !== "administrador") throw new Error("Solo administración puede crear registros de flora/fauna.");
        const rows = getCollection("floraFauna");
        const item = {
            floraFauna_id: createId("ff"),
            nombre: String(input.nombre || "").trim(),
            nombreCientifico: String(input.nombreCientifico || "").trim(),
            tipo: input.tipo === "fauna" ? "fauna" : "flora",
            descripcion: String(input.descripcion || "").trim(),
            habitat: String(input.habitat || "").trim(),
            estadoConservacion: String(input.estadoConservacion || "Sin evaluar").trim(),
            imagenes: input.imagen ? [String(input.imagen)] : [],
            ubicacion: String(input.ubicacion || "").trim()
        };
        if (!item.nombre || !item.descripcion) throw new Error("Completa el nombre y la descripción.");
        rows.push(item);
        saveCollection("floraFauna", rows);
        audit(admin.usuario_id, "ADMIN_CREA_FLORA_FAUNA", "floraFauna", item.floraFauna_id, `Creó ${item.nombre}.`);
        return item;
    }

    function removeFlora(id) {
        const admin = getCurrentUser();
        if (!admin || admin.rol !== "administrador") throw new Error("Solo administración puede gestionar flora/fauna.");
        const item = getById("floraFauna", id);
        if (!item) throw new Error("No se encontró el registro de flora/fauna.");
        saveCollection("floraFauna", getCollection("floraFauna").filter(row => row.floraFauna_id !== id));
        audit(admin.usuario_id, "ADMIN_ELIMINA_FLORA_FAUNA", "floraFauna", id, `Eliminó ${item.nombre}.`);
    }

    function updateUser(id, changes) {
        const admin = getCurrentUser();
        if (!admin || admin.rol !== "administrador") throw new Error("Solo administración puede gestionar usuarios.");
        const users = getCollection("usuarios");
        const user = users.find(row => row.usuario_id === id);
        if (!user) throw new Error("No se encontró el usuario.");
        if (id === admin.usuario_id && (changes.rol && changes.rol !== "administrador" || changes.estado && changes.estado !== "activo")) {
            throw new Error("No puedes quitarte el rol ni desactivar tu propia cuenta.");
        }
        if (changes.rol && ["usuario", "organizador", "administrador"].includes(changes.rol)) {
            const oldRole = user.rol;
            if (oldRole !== changes.rol) {
                user.rol = changes.rol;
                audit(admin.usuario_id, "ADMIN_CAMBIO_ROL", "usuarios", id, `Rol cambiado de ${oldRole} a ${user.rol}.`);
            }
        }
        if (typeof changes.organizadorVerificado === "boolean" && user.organizadorVerificado !== changes.organizadorVerificado) {
            user.organizadorVerificado = changes.organizadorVerificado;
            audit(admin.usuario_id, user.organizadorVerificado ? "ADMIN_VERIFICA_ORGANIZADOR" : "ADMIN_RETIRA_VERIFICACION_ORGANIZADOR", "usuarios", id, `Verificación de organizador: ${user.organizadorVerificado}.`);
        }
        if (["activo", "inactivo"].includes(changes.estado) && user.estado !== changes.estado) {
            user.estado = changes.estado;
            audit(admin.usuario_id, "ADMIN_CAMBIO_ESTADO_USUARIO", "usuarios", id, `Estado de cuenta: ${user.estado}.`);
        }
        saveCollection("usuarios", users);
        renderNavigation();
        return user;
    }

    function removeContent(type, id) {
        const admin = getCurrentUser();
        if (!admin || admin.rol !== "administrador") throw new Error("Solo administración puede eliminar contenido.");
        const fields = { articulos: ["articulos_id", "ADMIN_ELIMINA_ARTICULO"], voluntariados: ["voluntariados_id", "ADMIN_ELIMINA_VOLUNTARIADO"] }[type];
        if (!fields) throw new Error("No se permite eliminar esta entidad desde esta vista.");
        const [pk, action] = fields;
        const rows = getCollection(type);
        const item = rows.find(row => row[pk] === id);
        if (!item) throw new Error("No se encontró el contenido.");
        saveCollection(type, rows.filter(row => row[pk] !== id));
        if (type === "voluntariados") {
            saveCollection("inscripciones", getCollection("inscripciones").filter(row => row.voluntariado_id !== id));
            saveCollection("asistencias", getCollection("asistencias").filter(row => row.voluntariado_id !== id));
        }
        audit(admin.usuario_id, action, type, id, `Eliminó “${item.titulo}”.`);
    }

    function updatePlace(id, changes) {
        const admin = getCurrentUser();
        if (!admin || admin.rol !== "administrador") throw new Error("Solo administración puede gestionar lugares.");
        const rows = getCollection("lugares");
        const place = rows.find(row => row.lugares_id === id);
        if (!place) throw new Error("No se encontró el lugar.");
        Object.assign(place, changes, { fechaActualizacion: new Date().toISOString() });
        saveCollection("lugares", rows);
        audit(admin.usuario_id, "ADMIN_ACTUALIZA_LUGAR", "lugares", id, `Actualizó el lugar ${place.nombre}.`);
        return place;
    }

    function createPlace(input) {
        const admin = getCurrentUser();
        if (!admin || admin.rol !== "administrador") throw new Error("Solo administración puede crear lugares.");
        const rows = getCollection("lugares");
        const now = new Date().toISOString();
        const place = {
            lugares_id: createId("lugar"),
            nombre: String(input.nombre || "").trim(),
            descripcion: String(input.descripcion || "").trim(),
            tipo: String(input.tipo || "sitio"),
            ubicacion: {
                nombre: String(input.nombre || "").trim(),
                direccion: String(input.direccion || "").trim(),
                latitud: Number(input.latitud) || null,
                longitud: Number(input.longitud) || null
            },
            informacionConservacion: "",
            imagenes: [],
            fuenteInformacion: "Regenera BCS",
            fechaActualizacion: now,
            estado: "activo"
        };
        if (!place.nombre || !place.ubicacion.direccion) throw new Error("Completa el nombre y la dirección.");
        rows.push(place);
        saveCollection("lugares", rows);
        audit(admin.usuario_id, "ADMIN_CREA_LUGAR", "lugares", place.lugares_id, `Creó el lugar ${place.nombre}.`);
        return place;
    }

    function removePlace(id) {
        const admin = getCurrentUser();
        if (!admin || admin.rol !== "administrador") throw new Error("Solo administración puede gestionar lugares.");
        const place = getById("lugares", id);
        if (!place) throw new Error("No se encontró el lugar.");
        if (getCollection("voluntariados").some(volunteer => volunteer.lugar_id === id)) {
            updatePlace(id, { estado: "inactivo" });
            return "inactivo";
        }
        saveCollection("lugares", getCollection("lugares").filter(row => row.lugares_id !== id));
        audit(admin.usuario_id, "ADMIN_ELIMINA_LUGAR", "lugares", id, `Eliminó el lugar ${place.nombre}.`);
        return "eliminado";
    }

    function updateFlora(id, changes) {
        const admin = getCurrentUser();
        if (!admin || admin.rol !== "administrador") throw new Error("Solo administración puede gestionar flora y fauna.");
        const rows = getCollection("floraFauna");
        const item = rows.find(row => row.floraFauna_id === id);
        if (!item) throw new Error("No se encontró el registro de flora/fauna.");
        Object.assign(item, changes);
        saveCollection("floraFauna", rows);
        audit(admin.usuario_id, "ADMIN_ACTUALIZA_FLORA_FAUNA", "floraFauna", id, `Actualizó ${item.nombre}.`);
        return item;
    }

    function canManageVolunteer(user) {
        return Boolean(user && (user.rol === "administrador" || user.rol === "organizador" && user.organizadorVerificado));
    }

    function addNotification(userId, type, title, message, entity, priority = "normal", data = {}) {
        const notifications = getCollection("notificaciones");
        const now = new Date().toISOString();
        const notification = {
            notificaciones_id: createId("not"),
            usuario_id: userId,
            tipo: type,
            titulo: title,
            mensaje: message,
            entidad: entity || null,
            prioridad: priority,
            leido: false,
            fechaCreacion: now,
            fechaLectura: null,
            fechaExpiracion: null,
            datos: data
        };
        notifications.unshift(notification);
        saveCollection("notificaciones", notifications);
        renderNotificationBadge();
        return notification;
    }

    function audit(userId, action, entity, entityId, details) {
        const records = getCollection("auditoria");
        records.unshift({
            auditoria_id: createId("audit"),
            usuario_id: userId || null,
            accion: action,
            entidad: entity,
            entidad_id: entityId || null,
            fecha: new Date().toISOString(),
            ip: "demo",
            detalles: details
        });
        saveCollection("auditoria", records);
    }

    function normalizeCategory(value) {
        const normalized = String(value || "").trim().toLowerCase();
        return categories.find(category => category.toLowerCase() === normalized) || "conservación";
    }

    function getPlace(volunteer) {
        return volunteer ? getById("lugares", volunteer.lugar_id) : null;
    }

    function getPublicVolunteers() {
        return getCollection("voluntariados").filter(item => item.estado === "publicado").map(item => {
            const place = getPlace(item);
            const organizer = getById("usuarios", item.organizador_id);
            const participants = getCollection("inscripciones").filter(row => row.voluntariado_id === item.voluntariados_id && ["activa", "completada"].includes(row.estado)).length;
            return { ...item, lugar: place, organizador: organizer, participantes: participants };
        });
    }

    function getPublicArticles() {
        return getCollection("articulos").filter(item => item.estado === "publicado").map(item => ({ ...item, autor: getById("usuarios", item.autor_id) }));
    }

    function getPublicFlora() {
        return getCollection("floraFauna");
    }

    function getVolunteerParticipants(volunteerId) {
        return getCollection("inscripciones")
            .filter(row => row.voluntariado_id === volunteerId && ["activa", "completada"].includes(row.estado))
            .map(row => ({ inscription: row, user: getById("usuarios", row.usuario_id) }))
            .filter(row => row.user);
    }

    function joinVolunteer(volunteerId) {
        const user = getCurrentUser();
        if (!user) return { ok: false, reason: "login", message: "Inicia sesión para inscribirte." };
        const volunteer = getById("voluntariados", volunteerId);
        if (!volunteer || volunteer.estado !== "publicado") return { ok: false, message: "Este voluntariado no está disponible." };
        const inscriptions = getCollection("inscripciones");
        const existing = inscriptions.find(row => row.usuario_id === user.usuario_id && row.voluntariado_id === volunteerId && ["activa", "completada"].includes(row.estado));
        if (existing) return { ok: false, reason: "duplicate", message: "Ya estás inscrito." };
        const participants = inscriptions.filter(row => row.voluntariado_id === volunteerId && ["activa", "completada"].includes(row.estado)).length;
        if (participants >= Number(volunteer.capacidad)) return { ok: false, reason: "full", message: "Cupo lleno." };
        const inscription = { inscripciones_id: createId("ins"), usuario_id: user.usuario_id, voluntariado_id: volunteerId, fechaInscripciones: new Date().toISOString(), estado: "activa" };
        inscriptions.push(inscription);
        saveCollection("inscripciones", inscriptions);
        addNotification(user.usuario_id, "inscripcion", "Inscripción confirmada", `Te inscribiste en "${volunteer.titulo}".`, { tipo: "voluntariado", id: volunteerId });
        audit(user.usuario_id, "USUARIO_INSCRIPCION_VOLUNTARIADO", "voluntariados", volunteerId, `Inscripción ${inscription.inscripciones_id}.`);
        return { ok: true, inscription };
    }

    function markAttendance(volunteerId, userId) {
        const current = getCurrentUser();
        if (!current || !canManageVolunteer(current)) return { ok: false, message: "Solo administración o un organizador verificado puede confirmar asistencia." };
        const volunteer = getById("voluntariados", volunteerId);
        if (!volunteer || current.rol !== "administrador" && volunteer.organizador_id !== current.usuario_id) return { ok: false, message: "No tienes permiso para gestionar este voluntariado." };
        const inscriptions = getCollection("inscripciones");
        const inscription = inscriptions.find(row => row.usuario_id === userId && row.voluntariado_id === volunteerId && row.estado === "activa");
        if (!inscription) return { ok: false, message: "No hay una inscripción activa para esta persona." };
        const assistances = getCollection("asistencias");
        if (assistances.some(row => row.usuario_id === userId && row.voluntariado_id === volunteerId && row.confirmada)) return { ok: false, message: "La asistencia ya está confirmada." };
        const now = new Date();
        assistances.push({ asistencia_id: createId("asis"), usuario_id: userId, voluntariado_id: volunteerId, fecha: now.toISOString().slice(0, 10), hora: now.toTimeString().slice(0, 5), metodo: "QR", confirmada: true });
        saveCollection("asistencias", assistances);
        inscription.estado = "completada";
        saveCollection("inscripciones", inscriptions);
        addNotification(userId, "asistencia", "Asistencia confirmada", `Tu participación en "${volunteer.titulo}" fue registrada.`, { tipo: "voluntariado", id: volunteerId });
        audit(current.usuario_id, "CONFIRMA_ASISTENCIA", "voluntariados", volunteerId, `Asistencia confirmada para usuario ${userId}.`);
        return { ok: true };
    }

    function visibleDetail(type, id) {
        const user = getCurrentUser();
        const item = type === "articulo"
            ? getById("articulos", id)
            : type === "voluntariado"
                ? getById("voluntariados", id)
                : type === "flora"
                    ? getById("floraFauna", id)
                    : null;
        if (!item) return null;
        if (type === "articulo" && item.estado !== "publicado" && user?.rol !== "administrador" && user?.usuario_id !== item.autor_id) return null;
        if (type === "voluntariado" && item.estado !== "publicado" && user?.rol !== "administrador" && user?.usuario_id !== item.organizador_id) return null;
        return item;
    }

    function detailUrl(type, id) {
        return `detalle.html?tipo=${encodeURIComponent(type)}&id=${encodeURIComponent(id)}`;
    }

    function escapeHtml(value) {
        return String(value ?? "").replace(/[&<>"']/g, character => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
        })[character]);
    }

    function formatDate(value, options = {}) {
        if (!value) return "Fecha por confirmar";
        const date = new Date(value.length === 10 ? `${value}T12:00:00` : value);
        if (Number.isNaN(date.getTime())) return String(value);
        return new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "long", year: options.year === false ? undefined : "numeric" }).format(date);
    }

    function formatTime(value) {
        const match = /^(\d{2}):(\d{2})$/.exec(String(value || ""));
        if (!match) return value || "Horario por confirmar";
        const date = new Date(2000, 0, 1, Number(match[1]), Number(match[2]));
        return new Intl.DateTimeFormat("es-MX", { hour: "numeric", minute: "2-digit" }).format(date);
    }

    function statusBadge(status) {
        const safe = escapeHtml(status);
        return `<span class="status-badge status-${safe}">${safe}</span>`;
    }

    function renderNavigation() {
        const user = getCurrentUser();
        document.querySelectorAll(".user-nav").forEach(link => {
            link.href = user ? "perfil.html" : "login.html";
            link.textContent = user ? "Mi perfil" : "Iniciar sesión";
        });
        document.querySelectorAll(".nav, .mobile-menu").forEach(nav => {
            if (!user) return;
            const addLink = (key, text, href, condition = true) => {
                let link = nav.querySelector(`[data-session-link="${key}"]`);
                if (!condition) {
                    link?.remove();
                    return;
                }
                if (!link) {
                    link = document.createElement("a");
                    link.dataset.sessionLink = key;
                    nav.appendChild(link);
                }
                link.href = href;
                link.textContent = text;
            };
            addLink("admin", "Dashboard", "admin.html", user.rol === "administrador");
            addLink("create", "Crear contenido", "crear-contenido.html?tipo=articulo", true);

            if (!nav.querySelector(`[data-session-action="logout"]`)) {
                const button = document.createElement("button");
                button.type = "button";
                button.className = "session-logout";
                button.dataset.sessionAction = "logout";
                button.textContent = "Cerrar sesión";
                button.addEventListener("click", logout);
                nav.appendChild(button);
            }
            nav.querySelectorAll(".user-nav").forEach(link => link.remove());
        });
        renderNotificationBadge();
    }

    function getUnreadNotifications(userId) {
        return getCollection("notificaciones").filter(item => item.usuario_id === userId && !item.leido);
    }

    function renderNotificationBadge() {
        const user = getCurrentUser();
        document.querySelectorAll(".notification-trigger").forEach(trigger => {
            trigger.textContent = `♧${user && getUnreadNotifications(user.usuario_id).length ? ` ${getUnreadNotifications(user.usuario_id).length}` : ""}`;
            trigger.setAttribute("aria-label", "Mostrar notificaciones");
        });
    }

    function initializeNotificationUi() {
        const user = getCurrentUser();
        document.querySelectorAll(".nav, .mobile-menu").forEach(nav => {
            if (!user || nav.querySelector(".notification-trigger")) return;
            const button = document.createElement("button");
            button.className = "notification-trigger";
            button.type = "button";
            button.setAttribute("aria-expanded", "false");
            const panel = document.createElement("div");
            panel.className = "notification-panel";
            panel.hidden = true;
            button.addEventListener("click", () => {
                const opening = panel.hidden;
                panel.hidden = !opening;
                button.setAttribute("aria-expanded", String(opening));
                if (opening) renderNotifications(panel, user.usuario_id);
            });
            nav.append(button, panel);
        });
        renderNotificationBadge();
    }

    function renderNotifications(panel, userId) {
        const notifications = getCollection("notificaciones").filter(row => row.usuario_id === userId);
        if (!notifications.length) {
            panel.innerHTML = '<p class="notification-empty">No tienes notificaciones.</p>';
            return;
        }
        panel.innerHTML = `<h3>Notificaciones</h3>${notifications.slice(0, 12).map(row => `
            <button class="notification-item ${row.leido ? "is-read" : "is-unread"}" type="button" data-notification-id="${escapeHtml(row.notificaciones_id)}">
                <span>${statusBadge(row.prioridad)}</span>
                <strong>${escapeHtml(row.titulo)}</strong>
                <span>${escapeHtml(row.mensaje)}</span>
                <time>${escapeHtml(formatDate(row.fechaCreacion))}</time>
            </button>`).join("")}`;
        panel.querySelectorAll("[data-notification-id]").forEach(button => {
            button.addEventListener("click", () => {
                const rows = getCollection("notificaciones");
                const notification = rows.find(row => row.notificaciones_id === button.dataset.notificationId);
                if (notification && !notification.leido) {
                    notification.leido = true;
                    notification.fechaLectura = new Date().toISOString();
                    saveCollection("notificaciones", rows);
                }
                const entity = notification?.entidad;
                if (entity?.tipo && entity.id) {
                    window.location.href = detailUrl(entity.tipo === "voluntariado" ? "voluntariado" : entity.tipo === "articulos" ? "articulo" : entity.tipo, entity.id);
                } else {
                    renderNotifications(panel, userId);
                    renderNotificationBadge();
                }
            });
        });
        renderNotificationBadge();
    }

    function renderHomeListings() {
        const volunteerContainer = document.querySelector('[data-home-listing="voluntariado"]');
        if (volunteerContainer) {
            const featured = getPublicVolunteers().slice(0, 3);
            volunteerContainer.innerHTML = featured.length ? featured.map(volunteer => {
                const place = volunteer.lugar;
                const detail = detailUrl("voluntariado", volunteer.voluntariados_id);
                const current = volunteer.participantes;
                return `<article class="volunteer-card">
                    <div class="volunteer-image" style="background-image:url('${escapeHtml(volunteer.imagen)}')">
                        <span class="volunteer-date">${escapeHtml(formatDate(volunteer.fecha, { year: false }))}</span>
                    </div>
                    <div class="volunteer-card-content">
                        <span class="volunteer-category">${escapeHtml(volunteer.categoria)}</span>
                        <h3>${escapeHtml(volunteer.titulo)}</h3>
                        <div class="volunteer-meta">
                            <span>📅 ${escapeHtml(formatDate(volunteer.fecha))}</span>
                            <span>🕐 ${escapeHtml(formatTime(volunteer.horarioInicio))}–${escapeHtml(formatTime(volunteer.horarioFin))}</span>
                            <span>📍 ${escapeHtml(place?.nombre || "Lugar por confirmar")}</span>
                            <span>👥 ${current}/${volunteer.capacidad} participantes</span>
                        </div>
                        <p>${escapeHtml(volunteer.descripcion)}</p>
                        ${statusBadge(volunteer.estado)}
                        <a class="volunteer-link" href="${detail}">Ver voluntariado <span>→</span></a>
                    </div>
                </article>`;
            }).join("") : '<p class="empty-state">Aún no hay voluntariados publicados.</p>';
            volunteerContainer.querySelectorAll(".volunteer-card").forEach(card => {
                const anchor = card.querySelector(".volunteer-link");
                card.addEventListener("click", event => {
                    if (!event.target.closest("a, button")) window.location.href = anchor.href;
                });
            });
        }

        const articleContainer = document.querySelector('[data-home-listing="articulo"]');
        if (articleContainer) {
            const articles = getPublicArticles().slice(0, 3);
            articleContainer.innerHTML = articles.length ? articles.map(article => `
                <article class="article-card">
                    <div class="article-image" style="background-image:url('${escapeHtml(article.imagen)}')"></div>
                    <div class="article-content">
                        <span>${escapeHtml(article.categoria)}</span>
                        <h3>${escapeHtml(article.titulo)}</h3>
                        <p>${escapeHtml(article.contenido.slice(0, 170))}${article.contenido.length > 170 ? "…" : ""}</p>
                        <p class="article-meta">${escapeHtml(article.autor?.nombre || "Autor por confirmar")} · ${escapeHtml(formatDate(article.fechaPublicacion))}</p>
                        <a href="${detailUrl("articulo", article.articulos_id)}">Leer artículo →</a>
                    </div>
                </article>`).join("") : '<p class="empty-state">Aún no hay artículos publicados.</p>';
        }
    }

    function renderArticleListing() {
        const container = document.querySelector('[data-content-listing="articulo"]');
        if (!container) return;
        const articles = getPublicArticles();
        container.innerHTML = articles.map(article => `
            <article class="article-page-card">
                <div class="article-page-image" style="background-image:url('${escapeHtml(article.imagen)}')"></div>
                <div class="article-page-content">
                    <span>${escapeHtml(article.categoria)}</span>
                    <h2>${escapeHtml(article.titulo)}</h2>
                    <p>${escapeHtml(article.contenido.slice(0, 220))}${article.contenido.length > 220 ? "…" : ""}</p>
                    <p class="article-meta">${escapeHtml(article.autor?.nombre || "Autor por confirmar")} · ${escapeHtml(formatDate(article.fechaPublicacion))}</p>
                    <a class="article-link" href="${detailUrl("articulo", article.articulos_id)}">Leer artículo →</a>
                </div>
            </article>`).join("") || '<p class="empty-state">Aún no hay artículos publicados.</p>';
    }

    function renderFloraListing() {
        const container = document.querySelector('[data-content-listing="flora"]');
        if (!container) return;
        const filter = document.getElementById("floraFilter")?.value || "todos";
        const entries = getPublicFlora().filter(item => filter === "todos" || item.tipo === filter);
        container.innerHTML = entries.map(item => `
            <article class="info-card">
                <div class="info-card-image" style="background-image:url('${escapeHtml(item.imagenes?.[0] || "")}')"></div>
                <div class="info-card-content">
                    <span class="info-card-category">${escapeHtml(item.tipo)} · ${escapeHtml(item.estadoConservacion)}</span>
                    <h3>${escapeHtml(item.nombre)}</h3>
                    <p>${escapeHtml(item.descripcion)}</p>
                    <a class="info-card-link" href="${detailUrl("flora", item.floraFauna_id)}">Ver detalles →</a>
                </div>
            </article>`).join("") || '<p class="empty-state">No hay especies en este filtro.</p>';
    }

    function renderDetailPage() {
        const target = document.getElementById("detailContent");
        if (!target) return;
        const params = new URLSearchParams(window.location.search);
        const type = params.get("tipo");
        const id = params.get("id");
        const item = visibleDetail(type, id);
        if (!item) {
            target.innerHTML = '<section class="detail-not-found"><h1>Contenido no disponible</h1><p>El elemento no existe, no está publicado o no tienes permiso para verlo.</p><a href="index.html">Volver al inicio</a></section>';
            return;
        }

        const isVolunteer = type === "voluntariado";
        const isFlora = type === "flora";
        const title = item.titulo || item.nombre;
        const image = isFlora ? item.imagenes?.[0] : item.imagen;
        const user = getCurrentUser();
        const author = isVolunteer ? getById("usuarios", item.organizador_id) : !isFlora ? getById("usuarios", item.autor_id) : null;
        const place = isVolunteer ? getPlace(item) : null;
        const inscriptions = isVolunteer ? getCollection("inscripciones").filter(row => row.voluntariado_id === id && ["activa", "completada"].includes(row.estado)) : [];
        const mine = isVolunteer && user ? inscriptions.some(row => row.usuario_id === user.usuario_id && ["activa", "completada"].includes(row.estado)) : false;
        const count = inscriptions.length;
        const full = Number(item.capacidad) > 0 && count >= Number(item.capacidad);
        const isOwner = Boolean(user && isVolunteer && item.organizador_id === user.usuario_id);
        const admin = user?.rol === "administrador";
        const manages = canManageVolunteer(user) && (admin || isOwner);
        const returnPage = { articulo: "articulos.html", flora: "flora.html", voluntariado: "voluntariados.html" }[type] || "index.html";
        const details = isVolunteer ? `
            <div class="detail-meta">
                <span>📅 ${escapeHtml(formatDate(item.fecha))}</span>
                <span>🕐 ${escapeHtml(formatTime(item.horarioInicio))}–${escapeHtml(formatTime(item.horarioFin))}</span>
                <span>📍 ${escapeHtml(place?.nombre || "Lugar no disponible")}</span>
                <span>👥 ${count}/${escapeHtml(item.capacidad)} participantes</span>
            </div>
            <dl class="detail-facts">
                <div><dt>Dirección</dt><dd>${escapeHtml(place?.ubicacion?.direccion || item.ubicacion)}</dd></div>
                <div><dt>Punto de encuentro</dt><dd>${escapeHtml(item.ubicacion)}</dd></div>
                <div><dt>Organiza</dt><dd>${escapeHtml(author?.nombre || "Organizador")}</dd></div>
                <div><dt>Requisitos</dt><dd>${escapeHtml(item.requisitos || "No especificados")}</dd></div>
                <div><dt>Materiales</dt><dd>${escapeHtml(item.materiales || "No especificados")}</dd></div>
                ${place?.ubicacion?.latitud != null ? `<div><dt>Coordenadas</dt><dd>${escapeHtml(place.ubicacion.latitud)}, ${escapeHtml(place.ubicacion.longitud)}</dd></div>` : ""}
            </dl>` : isFlora ? `
            <div class="detail-meta"><span>${escapeHtml(item.tipo)}</span><span>${escapeHtml(item.estadoConservacion)}</span><span>${escapeHtml(item.ubicacion)}</span></div>
            <dl class="detail-facts"><div><dt>Nombre científico</dt><dd>${escapeHtml(item.nombreCientifico)}</dd></div><div><dt>Hábitat</dt><dd>${escapeHtml(item.habitat)}</dd></div></dl>` : "";
        const canJoin = isVolunteer && item.estado === "publicado";
        const participates = canJoin ? `<div class="participation-actions">
            <button class="detail-action" id="participateButton" type="button" ${mine || full ? "disabled" : ""}>${mine ? "Ya estás inscrito" : full ? "Cupo lleno" : "Inscribirme"}</button>
            <p class="form-message ${mine ? "is-success" : full ? "is-error" : ""}" id="participationMessage" role="status" aria-live="polite">${mine ? "Ya tienes una inscripción para este voluntariado." : full ? "Cupo lleno." : ""}</p>
        </div>` : "";
        const management = manages ? `<section class="participant-panel"><h2>Personas inscritas (${inscriptions.length})</h2>
            ${inscriptions.map(enrollment => {
                const participant = getById("usuarios", enrollment.usuario_id);
                const confirmed = getCollection("asistencias").some(row => row.usuario_id === enrollment.usuario_id && row.voluntariado_id === id && row.confirmada);
                return `<div class="participant-row"><span>${escapeHtml(participant?.nombre || "Usuario")} · ${escapeHtml(participant?.correo || "")}</span><span>${statusBadge(enrollment.estado)}</span>${enrollment.estado === "activa" ? `<button type="button" class="attendance-button" data-attendance-user="${escapeHtml(enrollment.usuario_id)}" ${confirmed ? "disabled" : ""}>${confirmed ? "Asistencia confirmada" : "Confirmar asistencia (QR)"}</button>` : ""}</div>`;
            }).join("") || "<p>Aún no hay inscripciones.</p>"}</section>` : "";

        document.title = `${title} · Regenera BCS`;
        target.innerHTML = `<article class="detail-article">
            <img class="detail-image" src="${escapeHtml(image || "")}" alt="${escapeHtml(title)}">
            <div class="detail-body">
                <span class="detail-label">${escapeHtml(isVolunteer ? "Voluntariado" : isFlora ? item.tipo : "Artículo")} · ${escapeHtml(item.categoria || item.tipo || "")}</span>
                <div class="detail-title-line"><h1>${escapeHtml(title)}</h1>${statusBadge(item.estado || item.estadoConservacion)}</div>
                ${details}
                ${isFlora && item.nombreCientifico ? `<p class="detail-scientific">${escapeHtml(item.nombreCientifico)}</p>` : ""}
                <div class="detail-copy">${(isVolunteer ? item.descripcion : item.contenido || item.descripcion).split(/\n+/).filter(Boolean).map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join("")}</div>
                ${author ? `<p class="detail-author">${isVolunteer ? "Organiza" : "Autor"}: ${escapeHtml(author.nombre)}</p>` : ""}
                ${participates}${management}
                <a class="section-link" href="${returnPage}">← Volver</a>
            </div>
        </article>`;

        document.getElementById("participateButton")?.addEventListener("click", () => {
            const result = joinVolunteer(id);
            const message = document.getElementById("participationMessage");
            if (result.reason === "login") {
                window.location.href = `login.html?returnTo=${encodeURIComponent(`detalle.html?tipo=voluntariado&id=${id}`)}`;
                return;
            }
            message.textContent = result.message || (result.ok ? "Tu inscripción quedó registrada." : "No se pudo completar la inscripción.");
            message.className = `form-message ${result.ok ? "is-success" : "is-error"}`;
            document.getElementById("participateButton").textContent = result.ok || result.reason === "duplicate" ? "Ya estás inscrito" : "Inscribirme";
            document.getElementById("participateButton").disabled = result.ok || result.reason === "duplicate" || result.reason === "full";
            if (result.ok) renderDetailPage();
        });
        target.querySelectorAll("[data-attendance-user]").forEach(button => {
            button.addEventListener("click", () => {
                const result = markAttendance(id, button.dataset.attendanceUser);
                const message = document.getElementById("participationMessage");
                if (!result.ok && message) {
                    message.textContent = result.message;
                    message.className = "form-message is-error";
                } else {
                    renderDetailPage();
                }
            });
        });
    }

    function initializeCreateForm() {
        const form = document.getElementById("createContentForm");
        if (!form) return;
        const params = new URLSearchParams(window.location.search);
        const type = params.get("tipo");
        const user = getCurrentUser();
        const message = document.getElementById("createMessage");
        const showError = text => {
            message.textContent = text;
            message.className = "form-message is-error";
        };
        if (!user) {
            window.location.replace(`login.html?returnTo=${encodeURIComponent(`crear-contenido.html?tipo=${type || ""}`)}`);
            return;
        }
        if (!["articulo", "voluntariado"].includes(type)) {
            showError("Elige si quieres crear un artículo o un voluntariado.");
            form.hidden = true;
            return;
        }
        if (type === "voluntariado" && user.rol === "organizador" && !user.organizadorVerificado) {
            showError("Tu cuenta de organizador está pendiente de verificación. Puedes crear artículos mientras tanto.");
            form.hidden = true;
            return;
        }
        const article = type === "articulo";
        document.getElementById("createTitle").textContent = article ? "Crear artículo" : "Crear voluntariado";
        document.getElementById("createSubtitle").textContent = article ? "Tu artículo quedará pendiente hasta que el equipo lo revise." : "Tu voluntariado quedará pendiente de aprobación antes de aparecer públicamente.";
        document.querySelectorAll("[data-field-group]").forEach(group => {
            group.hidden = group.dataset.fieldGroup !== type;
            group.querySelectorAll("input, textarea, select").forEach(input => input.required = !group.hidden && input.name !== "requirements" && input.name !== "materials");
        });
        const category = document.getElementById("category");
        category.innerHTML = article
            ? '<option value="">Selecciona una categoría</option><option>comunidad</option><option>naturaleza</option><option>conservación</option><option>turismo</option><option>educación ambiental</option>'
            : `<option value="">Selecciona una categoría</option>${categories.map(value => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("")}`;
        if (!article) {
            const placeSelect = document.getElementById("placeId");
            placeSelect.innerHTML = '<option value="">Selecciona un lugar</option>' + getCollection("lugares").filter(place => place.estado === "activo").map(place => `<option value="${escapeHtml(place.lugares_id)}">${escapeHtml(place.nombre)} — ${escapeHtml(place.ubicacion.direccion)}</option>`).join("");
        }
        form.addEventListener("submit", event => {
            event.preventDefault();
            if (!form.reportValidity()) return;
            const values = new FormData(form);
            try {
                const image = String(values.get("image") || "");
                if (image && !/^https?:\/\//i.test(image)) throw new Error("La imagen debe ser una URL http o https.");
                if (article) {
                    const record = createArticle({
                        titulo: values.get("title"),
                        categoria: values.get("category"),
                        contenido: values.get("content"),
                        imagen: image
                    });
                    window.location.href = `${detailUrl("articulo", record.articulos_id)}&creado=1`;
                    return;
                }
                const placeId = String(values.get("lugar_id"));
                const place = getById("lugares", placeId);
                const record = createVolunteer({
                    titulo: values.get("title"),
                    categoria: values.get("category"),
                    descripcion: `${String(values.get("summary")).trim()}\n\n${String(values.get("content")).trim()}`,
                    imagen: image,
                    fecha: values.get("date"),
                    horarioInicio: values.get("hourStart"),
                    horarioFin: values.get("hourEnd"),
                    lugar_id: placeId,
                    ubicacion: values.get("location") || place?.ubicacion?.direccion,
                    capacidad: Number(values.get("capacity")),
                    requisitos: values.get("requirements"),
                    materiales: values.get("materials")
                });
                window.location.href = `${detailUrl("voluntariado", record.voluntariados_id)}&creado=1`;
            } catch (error) {
                showError(error.message);
            }
        });
    }

    function initializeDemoDataAndUi() {
        initializeDemoData();
        renderNavigation();
        initializeNotificationUi();
        renderHomeListings();
        renderArticleListing();
        renderFloraListing();
        renderDetailPage();
        initializeCreateForm();
    }

    initializeDemoDataAndUi();

    window.RegeneraContent = {
        keys,
        categories,
        createId,
        getCollection,
        saveCollection,
        getById,
        initializeDemoData,
        getSession,
        getCurrentUser,
        setSession,
        login,
        register,
        logout,
        requireUser,
        createArticle,
        createVolunteer,
        moderateContent,
        updateUser,
        removeContent,
        updatePlace,
        createPlace,
        removePlace,
        updateFlora,
        createFlora,
        removeFlora,
        canManageVolunteer,
        addNotification,
        audit,
        normalizeCategory,
        getPlace,
        getPublicVolunteers,
        getPublicArticles,
        getPublicFlora,
        getVolunteerParticipants,
        joinVolunteer,
        markAttendance,
        visibleDetail,
        renderFloraListing,
        detailUrl,
        escapeHtml,
        formatDate,
        formatTime,
        statusBadge,
        getUnreadNotifications,
        renderNavigation
    };
})();
