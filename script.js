// =====================================================
// DATOS DE FLORA Y FAUNA
// =====================================================

const floraData = [

    {
        title: "Ballena gris",
        description:
            "Conoce una de las especies marinas más representativas de Baja California Sur.",
        image:
            "https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=1800&q=85"
    },

    {
        title: "Vida marina",
        description:
            "Descubre la diversidad de especies que habitan nuestros mares.",
        image:
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1800&q=85"
    },

    {
        title: "Ecosistemas costeros",
        description:
            "Explora los ecosistemas que conectan el desierto con el océano.",
        image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85"
    },

    {
        title: "Desierto sudcaliforniano",
        description:
            "Conoce la flora y fauna que se ha adaptado a uno de los ambientes más particulares de México.",
        image:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1800&q=85"
    }

];


// =====================================================
// ELEMENTOS DEL CARRUSEL
// =====================================================

const floraPanel =
    document.querySelector("#floraPanel");

const floraBackground =
    floraPanel.querySelector(".panel-background");

const floraTitle =
    document.querySelector("#floraTitle");

const floraDescription =
    document.querySelector("#floraDescription");

const floraCurrent =
    document.querySelector("#floraCurrent");

const floraTotal =
    document.querySelector("#floraTotal");


// =====================================================
// CONTADOR
// =====================================================

floraTotal.textContent =
    String(floraData.length).padStart(2, "0");


// =====================================================
// ESTADO
// =====================================================

let floraIndex = 0;


// =====================================================
// CAMBIO DEL PANEL
// =====================================================

function changeFlora(index) {

    floraBackground.style.opacity = "0";

    setTimeout(() => {

        floraBackground.style.backgroundImage =
            `url("${floraData[index].image}")`;

        floraTitle.textContent =
            floraData[index].title;

        floraDescription.textContent =
            floraData[index].description;

        floraCurrent.textContent =
            String(index + 1).padStart(2, "0");

        floraBackground.style.opacity = "1";

    }, 350);

}


// =====================================================
// SIGUIENTE
// =====================================================

function nextFlora() {

    floraIndex++;

    if (floraIndex >= floraData.length) {
        floraIndex = 0;
    }

    changeFlora(floraIndex);
}


// =====================================================
// ANTERIOR
// =====================================================

function previousFlora() {

    floraIndex--;

    if (floraIndex < 0) {
        floraIndex = floraData.length - 1;
    }

    changeFlora(floraIndex);
}


// =====================================================
// BOTÓN SIGUIENTE
// =====================================================

document
    .querySelector("#floraNext")
    .addEventListener("click", (event) => {

        event.stopPropagation();

        nextFlora();

    });


// =====================================================
// BOTÓN ANTERIOR
// =====================================================

document
    .querySelector("#floraPrev")
    .addEventListener("click", (event) => {

        event.stopPropagation();

        previousFlora();

    });


// =====================================================
// INICIALIZAR
// =====================================================

floraBackground.style.backgroundImage =
    `url("${floraData[0].image}")`;


// =====================================================
// CAMBIO AUTOMÁTICO
// =====================================================

let floraTimer =
    setInterval(nextFlora, 6000);


// =====================================================
// PAUSAR AL PASAR EL MOUSE
// =====================================================

floraPanel.addEventListener("mouseenter", () => {

    clearInterval(floraTimer);

});


floraPanel.addEventListener("mouseleave", () => {

    floraTimer =
        setInterval(nextFlora, 6000);

});


// =====================================================
// MENÚ MOBILE
// =====================================================

const menuButton =
    document.querySelector("#menuButton");

const mobileMenu =
    document.querySelector("#mobileMenu");


menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

});


mobileMenu
    .querySelectorAll("a")
    .forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

        });

    });
