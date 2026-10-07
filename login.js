const content = window.RegeneraContent;
const form = document.getElementById("loginForm");
const nameField = document.querySelector(".auth-name-field");
const nameInput = document.getElementById("nombre");
const passwordInput = document.getElementById("password");
const submitButton = document.getElementById("authSubmit");
const message = document.getElementById("authMessage");
let mode = "login";

function setMode(nextMode) {
    mode = nextMode;
    const registering = mode === "register";
    nameField.hidden = !registering;
    nameInput.required = registering;
    passwordInput.autocomplete = registering ? "new-password" : "current-password";
    submitButton.textContent = registering ? "Crear cuenta →" : "Iniciar sesión →";
    message.textContent = "";
    message.className = "auth-message";
    document.querySelectorAll("[data-auth-mode]").forEach(button => {
        button.classList.toggle("active", button.dataset.authMode === mode);
        button.setAttribute("aria-selected", String(button.dataset.authMode === mode));
    });
}

document.querySelectorAll("[data-auth-mode]").forEach(button => {
    button.addEventListener("click", () => setMode(button.dataset.authMode));
});

form.addEventListener("submit", event => {
    event.preventDefault();
    message.textContent = "";

    if (!form.reportValidity()) return;

    const result = mode === "register"
        ? content.register(nameInput.value, document.getElementById("correo").value, passwordInput.value)
        : content.login(document.getElementById("correo").value, passwordInput.value);

    if (!result.ok) {
        message.textContent = result.message;
        message.classList.add("is-error");
        return;
    }

    const returnTo = new URLSearchParams(window.location.search).get("returnTo");
    let destination = result.user.rol === "administrador" ? "admin.html" : "perfil.html";
    if (returnTo) {
        try {
            const target = new URL(returnTo, window.location.href);
            const allowedPages = new Set(["crear-contenido.html", "detalle.html", "perfil.html", "admin.html"]);
            const page = target.pathname.split("/").pop();
            if (target.origin === window.location.origin && allowedPages.has(page)) {
                destination = `${page}${target.search}${target.hash}`;
            }
        } catch (error) {
            console.error("No se pudo validar la página de retorno del inicio de sesión.", error);
        }
    }
    window.location.href = destination;
});
