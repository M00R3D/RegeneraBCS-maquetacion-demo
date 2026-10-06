/* =====================================================
   DATOS DEL HERO
===================================================== */
const heroData = [
    
]
const floraData = [

    {
        title: "Ballena gris",
        description: "Conoce una de las especies marinas más representativas de Baja California Sur.",
        image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=1800&q=85"
    },

    {
        title: "Vida marina",
        description: "Descubre la diversidad de especies que habitan nuestros mares.",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1800&q=85"
    },

    {
        title: "Ecosistemas costeros",
        description: "Explora los ecosistemas que conectan el desierto con el océano.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85"
    },

    {
        title: "Desierto sudcaliforniano",
        description: "Conoce la flora y fauna que se ha adaptado a uno de los ambientes más particulares de México.",
        image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1800&q=85"
    }

];


const voluntariadoData = [

    {
        title: "Limpieza de playa",
        description: "Participa en jornadas para retirar residuos y proteger nuestros ecosistemas costeros.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85"
    },

    {
        title: "Restauración costera",
        description: "Colabora en actividades enfocadas en recuperar espacios naturales de Baja California Sur.",
        image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1800&q=85"
    },

    {
        title: "Conservación de especies",
        description: "Forma parte de iniciativas que contribuyen al cuidado de la flora y fauna local.",
        image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=1800&q=85"
    },

    {
        title: "Educación ambiental",
        description: "Ayuda a compartir conocimientos y buenas prácticas para el cuidado del entorno.",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1800&q=85"
    }

];


/* =====================================================
   ELEMENTOS
===================================================== */

const floraPanel = document.querySelector("#floraPanel");
const voluntariadoPanel = document.querySelector("#voluntariadoPanel");


const floraBackground =
    floraPanel.querySelector(".panel-background");

const voluntariadoBackground =
    voluntariadoPanel.querySelector(".panel-background");


const floraTitle =
    document.querySelector("#floraTitle");

const floraDescription =
    document.querySelector("#floraDescription");

const floraCurrent =
    document.querySelector("#floraCurrent");


const voluntariadoTitle =
    document.querySelector("#voluntariadoTitle");

const voluntariadoDescription =
    document.querySelector("#voluntariadoDescription");

const voluntariadoCurrent =
    document.querySelector("#voluntariadoCurrent");


/* =====================================================
   CONTADORES
===================================================== */

document.querySelector("#floraTotal").textContent =
    String(floraData.length).padStart(2, "0");

document.querySelector("#voluntariadoTotal").textContent =
    String(voluntariadoData.length).padStart(2, "0");


/* =====================================================
   ESTADO
===================================================== */

let floraIndex = 0;
let voluntariadoIndex = 0;


/* =====================================================
   ANIMACIÓN DEL CAMBIO
===================================================== */

function changePanel(
    panel,
    background,
    titleElement,
    descriptionElement,
    counterElement,
    data,
    index
) {

    panel.classList.add("changing");

    setTimeout(() => {

        background.style.opacity = "0";

        setTimeout(() => {

            background.style.backgroundImage =
                `url("${data[index].image}")`;

            titleElement.textContent =
                data[index].title;

            descriptionElement.textContent =
                data[index].description;

            counterElement.textContent =
                String(index + 1).padStart(2, "0");

            background.style.opacity = "1";

            panel.classList.remove("changing");

        }, 350);

    }, 50);
}


/* =====================================================
   FLORA
===================================================== */

function nextFlora() {

    floraIndex++;

    if (floraIndex >= floraData.length) {
        floraIndex = 0;
    }

    changePanel(
        floraPanel,
        floraBackground,
        floraTitle,
        floraDescription,
        floraCurrent,
        floraData,
        floraIndex
    );
}


function previousFlora() {

    floraIndex--;

    if (floraIndex < 0) {
        floraIndex = floraData.length - 1;
    }

    changePanel(
        floraPanel,
        floraBackground,
        floraTitle,
        floraDescription,
        floraCurrent,
        floraData,
        floraIndex
    );
}


/* =====================================================
   VOLUNTARIADOS
===================================================== */

function nextVoluntariado() {

    voluntariadoIndex++;

    if (voluntariadoIndex >= voluntariadoData.length) {
        voluntariadoIndex = 0;
    }

    changePanel(
        voluntariadoPanel,
        voluntariadoBackground,
        voluntariadoTitle,
        voluntariadoDescription,
        voluntariadoCurrent,
        voluntariadoData,
        voluntariadoIndex
    );
}


function previousVoluntariado() {

    voluntariadoIndex--;

    if (voluntariadoIndex < 0) {
        voluntariadoIndex = voluntariadoData.length - 1;
    }

    changePanel(
        voluntariadoPanel,
        voluntariadoBackground,
        voluntariadoTitle,
        voluntariadoDescription,
        voluntariadoCurrent,
        voluntariadoData,
        voluntariadoIndex
    );
}


/* =====================================================
   BOTONES FLORA
===================================================== */

document
    .querySelector("#floraNext")
    .addEventListener("click", (event) => {

        event.stopPropagation();

        nextFlora();

    });


document
    .querySelector("#floraPrev")
    .addEventListener("click", (event) => {

        event.stopPropagation();

        previousFlora();

    });


/* =====================================================
   BOTONES VOLUNTARIADOS
===================================================== */

document
    .querySelector("#voluntariadoNext")
    .addEventListener("click", (event) => {

        event.stopPropagation();

        nextVoluntariado();

    });


document
    .querySelector("#voluntariadoPrev")
    .addEventListener("click", (event) => {

        event.stopPropagation();

        previousVoluntariado();

    });


/* =====================================================
   INICIALIZAR PANELES
===================================================== */

function initializePanels() {

    floraBackground.style.backgroundImage =
        `url("${floraData[0].image}")`;

    voluntariadoBackground.style.backgroundImage =
        `url("${voluntariadoData[0].image}")`;

}


initializePanels();


/* =====================================================
   CAMBIO AUTOMÁTICO
===================================================== */

let floraTimer =
    setInterval(nextFlora, 6000);

let voluntariadoTimer =
    setInterval(nextVoluntariado, 7000);


/* =====================================================
   PAUSAR AL PASAR EL MOUSE
===================================================== */

floraPanel.addEventListener("mouseenter", () => {

    clearInterval(floraTimer);

});


floraPanel.addEventListener("mouseleave", () => {

    floraTimer =
        setInterval(nextFlora, 6000);

});


voluntariadoPanel.addEventListener("mouseenter", () => {

    clearInterval(voluntariadoTimer);

});


voluntariadoPanel.addEventListener("mouseleave", () => {

    voluntariadoTimer =
        setInterval(nextVoluntariado, 7000);

});


/* =====================================================
   MENÚ MOBILE
===================================================== */

const menuButton =
    document.querySelector("#menuButton");

const mobileMenu =
    document.querySelector("#mobileMenu");


menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

});


mobileMenu.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

    });

});