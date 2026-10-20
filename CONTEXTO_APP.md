# Contexto de la aplicación Regenera BCS

## Propósito

Regenera BCS es una demo frontend en español para promover el turismo responsable y la participación ambiental en Baja California Sur. Permite descubrir flora y fauna, consultar voluntariados y artículos, crear contenido comunitario y simular inscripción, asistencia, moderación, notificaciones y reconocimientos.

El frontend de este workspace es un sitio estático hecho con HTML, CSS y JavaScript sin framework. Sus pantallas todavía no consumen el backend: los datos, cuentas y sesión de la demo se guardan en `localStorage` del navegador. Hay un backend Laravel separado en `C:\xampp\htdocs\regenera-api`; actualmente ofrece una API parcial para conexión MongoDB y autenticación, pero no está integrado con las páginas estáticas. El conjunto aún no es una plataforma lista para producción.

## Identidad y presentación

- Audiencia: personas interesadas en naturaleza, turismo responsable, conservación y actividades ambientales de BCS; organizadores comunitarios y administradores.
- Marca: Regenera BCS. El contenido y la interfaz están en español mexicano y aluden a Baja California Sur.
- Dirección visual actual: editorial y natural, con imágenes grandes de paisajes y especies, fondos claros crema, verdes, texto oscuro y acentos verdes. La tipografía base es DM Sans y los encabezados usan Playfair Display, cargadas desde Google Fonts.
- La barra de navegación y el pie de página se reutilizan en la mayoría de páginas públicas. El panel administrativo tiene una navegación lateral propia.
- Las fotografías de contenido son principalmente URLs externas de Unsplash. La marca visible en las páginas usa `path1521.png`; `logo.svg` existe en el proyecto, pero no se encontró referencia a él en los HTML.
- Hay reglas adaptables a distintos anchos en los CSS. La portada incluye un menú móvil y un carrusel de especies.

## Páginas y experiencia

| Archivo / ruta | Qué presenta y qué permite hacer |
| --- | --- |
| `index.html` | Portada: hero de naturaleza con carrusel de especies; introducción a la plataforma; selección de voluntariados y artículos publicados; bloque visual para reportes. Los listados se generan desde los datos locales. El botón «Crear reporte» todavía no conduce a un flujo funcional. |
| `flora.html` | Página editorial de flora y fauna con filtro por todos, flora o fauna. El catálogo se renderiza desde `localStorage` y cada especie enlaza a su detalle. |
| `voluntariados.html` | Listado de actividades ambientales publicadas con filtro por categoría. Muestra fecha, lugar, horario y ocupación, y permite abrir el detalle. Incluye enlace para proponer un voluntariado. |
| `articulos.html` | Listado de artículos publicados y enlace para crear uno. El JavaScript reemplaza las tarjetas iniciales con los artículos públicos guardados localmente. |
| `actividades.html` | Página informativa estática con ejemplos de senderismo, kayak, observación de fauna y ciclismo responsable. No participa en el flujo de datos y no aparece en la navegación principal de las demás páginas. |
| `detalle.html` | Vista dinámica para artículo, especie o voluntariado, seleccionados mediante `?tipo=...&id=...`. En voluntariados ofrece inscripción, registro de asistencia y herramientas de control para la persona organizadora o administración. |
| `login.html` | Alterna entre iniciar sesión y crear cuenta. Incluye credenciales de demo visibles y redirección posterior a páginas protegidas. |
| `crear-contenido.html` | Formulario compartido para proponer artículo o voluntariado. El tipo viene en la URL. Las propuestas quedan pendientes de revisión; los voluntariados incluyen fecha, lugar, horario, cupo, requisitos y materiales. |
| `perfil.html` | Perfil de la sesión actual: datos de usuario, métricas de impacto, próximo logro, medallas, voluntariados, asistencia y artículos aprobados. Organizador y administrador también ven sus voluntariados y herramientas asociadas. |
| `medallas.html` | Resumen de puntos y logros, con progreso de todas las medallas disponibles. Requiere sesión. |
| `admin.html` | Dashboard restringido al rol administrador. Secciones para métricas, moderación de voluntariados y artículos, usuarios y permisos, lugares, catálogo de flora/fauna, notificaciones y auditoría. |

## Roles y flujos principales

- **Usuario:** consulta contenido, crea artículos, se inscribe en voluntariados publicados, registra asistencia con código vigente y revisa su impacto.
- **Organizador verificado:** además puede proponer voluntariados, administrar los suyos, generar códigos de asistencia/QR y registrar manualmente la asistencia de personas inscritas.
- **Administrador:** modera contenido, administra cuentas, lugares y especies, y consulta estadísticas, notificaciones y trazabilidad. También puede administrar voluntariados.
- **Registro y sesión:** `login.html` usa las cuentas de demostración o crea una cuenta local. La sesión se conserva en el navegador y las páginas protegidas redirigen a iniciar sesión.
- **Moderación:** los artículos y voluntariados nuevos nacen pendientes. La administración puede publicar/rechazar artículos y publicar/cancelar/finalizar voluntariados. La publicación de un artículo otorga puntos.
- **Inscripción y asistencia:** la inscripción se limita a voluntariados publicados, evita duplicados y respeta el cupo. El código activo se genera desde el detalle de una actividad; asistencia confirmada completa la inscripción y actualiza historial, notificaciones, auditoría y recompensas.
- **Recompensas:** el sistema lleva puntos en un ledger con claves únicas, calcula medallas por asistencia, categorías, lugares y artículos aprobados, y muestra el progreso en perfil y medallas. La lógica central describe recompensas de inscripción (+10), asistencia (+50), primera actividad por categoría (+10), conservación (+30), artículo aprobado (+25) y medallas según su definición.

## Datos y límites técnicos

En el frontend, `contenido.js` inicializa datos de ejemplo solo para colecciones que todavía no existen, migra algunas claves antiguas y concentra las operaciones y reglas del dominio. Entre las colecciones guardadas están usuarios, voluntariados, inscripciones, asistencias, artículos, notificaciones, auditoría, lugares, flora/fauna, medallas, medallas desbloqueadas, puntos y códigos de asistencia; la sesión se guarda por separado.

Cada navegador y origen mantiene su propia copia. Para usar la demo, ejecutar un servidor estático y abrir `index.html`; el README propone `python -m http.server 5500`. Abrir como `file://` no es el modo previsto. Borrar los datos del sitio elimina los cambios locales y permite volver a inicializar la demo.

En el frontend, autenticación, permisos y contraseñas son simulaciones del lado del cliente; las contraseñas demo se guardan en texto plano en `localStorage`. El QR contiene el ID del voluntariado y su código activo. No debe tratarse como seguridad real ni como persistencia multiusuario.

### Backend inspeccionado

- Ubicación: `C:\xampp\htdocs\regenera-api` (fuera del workspace abierto).
- Stack declarado: Laravel 12, PHP `^8.2` y `mongodb/laravel-mongodb` `^5.11`; la extensión `mongodb` está cargada en el PHP de consola inspeccionado.
- `app/Models/User.php` usa el modelo autenticable MongoDB, colección `usuarios`, oculta la contraseña y aplica el cast `hashed`; el controlador también llama a `Hash::make` al registrar.
- `database/migrations/2026_10_07_134245_create_usuarios.php` crea un índice único para `correo`.
- `routes/api.php` registra `/api/ping` y endpoints `/api/auth/register`, `/api/auth/login`, `/api/auth/me` y `/api/auth/logout`.
- El registro valida datos, normaliza el correo y fija el rol a `usuario`. El login solo comprueba credenciales y responde datos básicos; no crea una sesión ni un token persistente. Se añadió rechazo de login para cuentas cuyo `estado` no sea `activo`.
- La lista efectiva de rutas muestra únicamente el middleware `api`; `me` y `logout` no tienen middleware de autenticación registrado. El modelo tiene una guarda de sesión configurada en Laravel, pero el flujo API actual no la establece.
- No se encontró Sanctum, Passport ni otro paquete de tokens declarado en `composer.json`. No elegir un mecanismo nuevo sin definir la comunicación entre el frontend y el backend.
- `routes/web.php` solo sirve la vista Laravel de bienvenida. No hay controladores ni endpoints para voluntariados, inscripciones, asistencia, artículos, notificaciones, flora/fauna o administración.
- `resources/views/welcome.blade.php` es la única vista encontrada. El frontend estático no tiene cliente HTTP configurado para consumir esta API.
- `config/database.php` contiene dos entradas con la misma clave `mongodb`; en PHP prevalece la última. Requiere una limpieza cuidadosa conservando el formato de conexión real antes de ampliar el uso de MongoDB.
- La suite actual no pudo ejecutarse: `php artisan test` falla porque falta `vendor/phpunit/phpunit/phpunit`, aunque PHPUnit está declarado en `composer.json`. `php -l` sí validó el controlador de autenticación.

Secciones que se ven como parte del producto pero no están conectadas a una función completa: crear reportes; `actividades.html` es informativa; los enlaces «Leer artículo» estáticos iniciales de `articulos.html` son sustituidos por tarjetas dinámicas al cargar. Crear contenido admite artículos y voluntariados, no reportes. El backend todavía no persiste estos dominios ni autentica al frontend.

## Mapa de archivos

### HTML

- `index.html`: portada y estructura de navegación pública.
- `flora.html`: catálogo y filtro de flora/fauna.
- `voluntariados.html`: catálogo y filtros de voluntariados.
- `articulos.html`: listado público de artículos.
- `actividades.html`: contenido editorial estático de actividades responsables.
- `detalle.html`: contenedor de detalle dinámico.
- `login.html`: interfaz de autenticación/registro demo.
- `crear-contenido.html`: formulario compartido de creación.
- `perfil.html`: perfil y actividad del usuario.
- `medallas.html`: página de logros.
- `admin.html`: estructura del dashboard.

### JavaScript

- `contenido.js`: núcleo de la aplicación. Inicializa y migra datos, sesión, reglas de acceso, CRUD, listados, detalles, formularios, notificaciones, inscripciones, asistencia, puntos y medallas. Expone `window.RegeneraContent`.
- `script.js`: carrusel de especies y menú móvil de la portada.
- `voluntariados.js`: renderizado y filtrado por categoría del listado de voluntariados.
- `login.js`: cambio entre login/registro, validación y redirecciones.
- `perfil.js`: carga métricas e historial, crea acciones para registrar asistencia desde el perfil.
- `medallas.js`: carga el resumen y la colección de medallas.
- `admin.js`: control de acceso y lógica de pestañas, tablas, formularios y acciones administrativas.
- `qr.js`: genera localmente un QR SVG para los códigos de asistencia y expone `window.RegeneraQr`.

### CSS

- `style.css`: reset, variables, tipografía, navegación y estilos globales/portada.
- `pages.css`: estructura y componentes compartidos de páginas internas, héroes editoriales y tarjetas informativas.
- `contenido.css`: listados dinámicos, detalles, formularios, estados, notificaciones y control de asistencia.
- `voluntariados.css`: estilos específicos de filtros y tarjetas/listado de voluntariados.
- `login.css`: pantalla de acceso y registro.
- `perfil.css`: perfil, estadísticas, historial y elementos de participación.
- `reconocimientos.css`: medallas, progreso y resumen de impacto.
- `admin.css`: dashboard, navegación lateral, métricas, formularios y tablas administrativas.

### Otros

- `README.md`: instrucciones para ejecutar la demo, cuentas, flujos de prueba y explicación de persistencia/recompensas.
- `path1521.png`: imagen de marca utilizada por las cabeceras.
- `logo.svg`: recurso SVG presente, sin referencia de uso encontrada en las páginas.

### Backend Laravel (`C:\xampp\htdocs\regenera-api`)

- `app/Http/Controllers/AuthController.php`: registro, validación de credenciales, consulta de usuario actual y cierre de sesión; la sesión no se establece actualmente en `login`.
- `app/Http/Requests/RegisterRequest.php`: archivo vacío, sin reglas implementadas.
- `app/Models/User.php`: modelo de usuario MongoDB autenticable.
- `routes/api.php`: endpoints de ping y autenticación.
- `routes/web.php`: ruta raíz a la vista de bienvenida.
- `config/auth.php`: guardia `web` basada en sesión y provider Eloquent configurados para `App\Models\User`.
- `config/database.php`: conexiones SQLite, MariaDB, PostgreSQL, SQL Server y MongoDB; revisar la clave MongoDB duplicada.
- `database/migrations/2026_10_07_134245_create_usuarios.php`: índice único de correo en MongoDB.
- `resources/views/welcome.blade.php`: vista de bienvenida.
- `resources/js/app.js`, `resources/js/bootstrap.js` y `resources/css/app.css`: entrada JS/CSS de Laravel/Vite.
- `tests/Feature/ExampleTest.php`: prueba de ejemplo para la ruta raíz; PHPUnit no está disponible actualmente en `vendor`.
- `composer.json` y `composer.lock`: dependencias y scripts PHP; `package.json` y `vite.config.js`: configuración frontend de Laravel/Vite.

## Notas de capturas pendientes

Las notas descritas por la persona usuaria no aparecen en los archivos encontrados dentro del proyecto. Este contexto se basa en la implementación y el contenido del repositorio; agregar aquí las observaciones de las capturas permitirá distinguir con precisión el diseño observado, los textos visibles y cualquier diferencia entre la pantalla y el comportamiento implementado.

## Avance Fase 2 del frontend

La demo sigue siendo independiente y no realiza peticiones HTTP. Las mejoras implementadas se guardan únicamente en `localStorage`:

- La portada presenta primero introducción y voluntariado próximo; el carrusel de especies aparece debajo. El bloque de reportes informa que aún no está disponible.
- La navegación compartida agrega menús móviles en páginas públicas, conserva el acceso al perfil con sesión y evita ofrecer “Crear contenido” o medallas como opciones principales.
- El catálogo de voluntariados busca por texto, fecha y lugar, filtra por categoría y cupo, ordena por fecha futura y muestra duración calculada. Las inscripciones se pueden cancelar conservando el registro; las actividades pasadas no aceptan nuevas inscripciones.
- El detalle de especie muestra cuatro etapas y marca explícitamente como demo los estados sin fuente. Las fichas se pueden desactivar sin borrarlas. El administrador puede editar campos educativos y fuentes locales.
- Artículos tiene una tarjeta `+`; sus tarjetas abren el artículo relacionado. Autores pueden editar sus propios artículos y el contenido publicado vuelve a revisión al ser editado.
- Perfil muestra propuestas propias, estados de artículos, historial y todas las medallas. La ruta antigua de medallas redirige al perfil. Existe solicitud local de verificación de organizador, con decisión administrativa auditada y separada del rol.
- Propietarios pueden editar sus actividades y gestionar la asistencia de las que están publicadas o finalizadas. Administración puede crear contenido y elegir si queda pendiente o se publica directamente.
- Usuarios pueden solicitar localmente verificación de organizador; administración puede aprobar/rechazar la solicitud, guardar responsable y fecha, y mantener el rol separado. La edición de artículos/voluntariados está enlazada desde sus detalles y guarda los cambios en la misma colección local.
- El formulario de lugares admite tipo, descripción, conservación, fuente y coordenadas validadas; el formulario de especies admite función ecológica, dato curioso, amenazas, recomendaciones y fuentes manuales.
- Los códigos de asistencia vencen en siete días; la fecha no es editable. La entrada manual está identificada como tal; no hay escáner QR real.
- El dashboard muestra métricas derivadas de registros locales, búsqueda/paginación en tablas, formularios de lugares y especies contraíbles, decisiones distintas de revisión y desactivación lógica de lugares/especies. El perfil del administrador permanece accesible.

Se probaron manualmente en Playwright navegación pública, filtros, inscripción/cancelación, edición, revisión, solicitudes de organizador, creación directa administrativa y vistas móviles. Se restauraron los datos locales originales después de las pruebas. No hay una suite automatizada del frontend configurada.

### Límites pendientes

- La sesión, roles, notificaciones, auditoría, recompensas y permisos son simulaciones manipulables del navegador; el frontend actual conserva contraseñas demo en texto plano en `localStorage` y no es seguridad de producción.
- No se implementaron escaneo QR, correo, mapas, carga de archivos ni almacenamiento remoto de imágenes. Las imágenes se ingresan como URL y el QR local no valida asistencia de forma segura.
- No existe todavía un estado de ausencia distinto de asistencia confirmada, ni campo de comentario para devolver una propuesta. La edición de artículos usa un textarea de texto plano; no es un editor estructurado.
- El panel permite cambiar roles y verificación, pero no crear cuentas administrativas desde una interfaz dedicada, porque no existe un mecanismo de credenciales seguro en el frontend.
- Los reportes siguen sin flujo funcional. `actividades.html` permanece como página informativa.
- La verificación de información de flora/fauna depende de fuentes que el administrador agregue; los datos semilla y sus etiquetas no se deben presentar como validación científica.