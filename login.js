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


    window.location.href =
        "perfil.html";

});