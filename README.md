# Regenera BCS

Demo frontend estática para explorar flora y fauna, artículos y voluntariados de Baja California Sur. No requiere backend: las entidades, la sesión y los flujos de demostración se guardan en `localStorage` en el navegador.

## Ejecutar localmente

Desde la carpeta del proyecto, inicia un servidor estático:

```powershell
python -m http.server 5500
```

Abre `http://127.0.0.1:5500/index.html`. También puedes usar Live Server. No abras las páginas directamente como archivos `file://`, ya que el almacenamiento local depende del origen del sitio.

## Cuentas de demostración

Todas las cuentas utilizan la contraseña `demo123`:

| Rol | Correo |
| --- | --- |
| Administrador | `admin@regenera.test` |
| Usuario | `usuario@regenera.test` |
| Organizador verificado | `organizador@regenera.test` |

La contraseña y la sesión son únicamente para simular los flujos de la maqueta; no representan autenticación segura.

## Flujos para probar

- Usuario: inicia sesión, abre un voluntariado publicado, inscríbete y consulta la inscripción en **Mi perfil**.
- Crear contenido: desde **Crear contenido**, envía un artículo o voluntariado; ambos quedan pendientes hasta su moderación.
- Administración: inicia sesión como administrador, abre **Dashboard**, publica o rechaza contenido y revisa notificaciones y auditoría.
- Organizador: inicia sesión como organizador verificado, abre el detalle de un voluntariado propio, genera un código de asistencia y muestra el QR. También puede registrar asistencia manualmente.
- Asistencia y recompensas: inicia sesión como usuario inscrito, abre **Mi perfil** o el detalle del evento, introduce el código activo y confirma la asistencia. La inscripción se completa y se actualizan puntos, medallas, notificaciones e historial.
- Artículos: envía uno como usuario y publícalo desde el Dashboard como administrador. Los puntos y medallas de publicación se otorgan solo al aprobarlo.
- Reconocimientos: consulta **Mi impacto** en el perfil o abre **Mis medallas** para ver logros desbloqueados y el progreso de los pendientes.

Cada cuenta demo usa la contraseña `demo123`. La cuenta de administrador puede aprobar artículos; el organizador verificado solo puede gestionar sus propios voluntariados.

## Persistencia de demostración

`contenido.js` centraliza el almacenamiento y sus relaciones mediante IDs/FK. Las claves incluyen `regenera_usuarios`, `regenera_voluntariados`, `regenera_inscripciones`, `regenera_asistencias`, `regenera_articulos`, `regenera_notificaciones`, `regenera_auditoria`, `regenera_lugares`, `regenera_flora_fauna`, `regenera_medallas`, `regenera_usuario_medallas`, `regenera_puntos`, `regenera_codigos_asistencia` y `regenera_sesion`.

Los puntos se guardan en un ledger con una clave única por recompensa: inscripción (+10), asistencia confirmada (+50), primera asistencia en una categoría (+10), actividad de conservación (+30), artículo aprobado (+25) y medalla desbloqueada (según su definición). Las diez medallas se calculan a partir de asistencias confirmadas, categorías, lugares y artículos publicados. La asistencia completa la inscripción y genera notificaciones y auditoría; el QR local contiene únicamente el ID del voluntariado y su código activo. La inicialización añade datos de ejemplo solo para colecciones que todavía no existen; los datos quedan aislados en el navegador y origen donde se ejecuta la demo.

Esta versión no incluye API, base de datos ni autenticación real. La sección de reportes tampoco forma parte de este avance.
