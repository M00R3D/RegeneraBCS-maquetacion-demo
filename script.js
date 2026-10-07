const content = window.RegeneraContent;
const floraData = content.getPublicFlora().map(item => ({
    id: item.floraFauna_id,
    title: item.nombre,
    description: item.descripcion,
    image: item.imagenes[0] || ""
}));

const floraPanel = document.querySelector("#floraPanel");
const floraBackground = floraPanel.querySelector(".panel-background");
const floraTitle = document.querySelector("#floraTitle");
const floraDescription = document.querySelector("#floraDescription");
const floraCurrent = document.querySelector("#floraCurrent");
const floraTotal = document.querySelector("#floraTotal");
const floraDetailLink = document.querySelector("#floraDetailLink");

let floraIndex = 0;
let floraTimer;

function changeFlora(index) {
    const species = floraData[index];
    floraBackground.style.opacity = "0";
    window.setTimeout(() => {
        floraBackground.style.backgroundImage = `url("${species.image}")`;
        floraTitle.textContent = species.title;
        floraDescription.textContent = species.description;
        floraDetailLink.href = content.detailUrl("flora", species.id);
        floraCurrent.textContent = String(index + 1).padStart(2, "0");
        floraBackground.style.opacity = "1";
    }, 350);
}

function nextFlora() {
    floraIndex = (floraIndex + 1) % floraData.length;
    changeFlora(floraIndex);
}

function previousFlora() {
    floraIndex = (floraIndex - 1 + floraData.length) % floraData.length;
    changeFlora(floraIndex);
}

function startFloraTimer() {
    window.clearInterval(floraTimer);
    floraTimer = window.setInterval(nextFlora, 6000);
}

if (floraData.length) {
    floraTotal.textContent = String(floraData.length).padStart(2, "0");
    changeFlora(floraIndex);
    document.querySelector("#floraNext").addEventListener("click", event => {
        event.stopPropagation();
        nextFlora();
    });
    document.querySelector("#floraPrev").addEventListener("click", event => {
        event.stopPropagation();
        previousFlora();
    });
    floraPanel.addEventListener("mouseenter", () => window.clearInterval(floraTimer));
    floraPanel.addEventListener("mouseleave", startFloraTimer);
    startFloraTimer();
} else {
    floraPanel.hidden = true;
}

const menuButton = document.querySelector("#menuButton");
const mobileMenu = document.querySelector("#mobileMenu");

menuButton?.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
});

mobileMenu?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => mobileMenu.classList.remove("active"));
});
