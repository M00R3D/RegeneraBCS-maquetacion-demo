const form = document.getElementById("loginForm");


form.addEventListener("submit", function(event) {

    event.preventDefault();


    const nombre =
        document.getElementById("nombre").value;

    const correo =
        document.getElementById("correo").value;


    const usuario = {

        nombre: nombre,

        correo: correo

    };


    localStorage.setItem(
        "usuarioRegenera",
        JSON.stringify(usuario)
    );

    const returnTo = new URLSearchParams(window.location.search).get("returnTo");
    const allowedPages = new Set(["crear-contenido.html", "detalle.html", "perfil.html"]);
    let destination = "perfil.html";

    if (returnTo) {
        try {
            const url = new URL(returnTo, window.location.href);
            const page = url.pathname.split("/").pop();
            if (
                url.origin === window.location.origin &&
                ["http:", "https:", "file:"].includes(url.protocol) &&
                allowedPages.has(page)
            ) {
                destination = `${page}${url.search}${url.hash}`;
            }
        } catch (error) {
            console.error("No se pudo validar la página de retorno del inicio de sesión.", error);
        }
    }

    window.location.href = destination;

});