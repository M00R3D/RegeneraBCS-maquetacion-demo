/* =====================================================
   DATOS DEL HERO
===================================================== */

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


const activityData = [

    {
        title: "Senderismo",
        description: "Recorre paisajes naturales procurando reducir tu impacto en el entorno.",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1800&q=85"
    },

    {
        title: "Kayak",
        description: "Explora las costas de Baja California Sur desde el agua.",
        image: "https://images.unsplash.com/photo-1600519009961-b4d3f3a4c1a9?auto=format&fit=crop&w=1800&q=85"
    },

    {
        title: "Observación de fauna",
        description: "Disfruta de la vida silvestre respetando las distancias y los espacios naturales.",
        image: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1800&q=85"
    },

    {
        title: "Ciclismo",
        description: "Conoce nuevos lugares utilizando formas de movilidad de bajo impacto.",
        image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1800&q=85"
    }

];


/* =====================================================
   ELEMENTOS
===================================================== */

const floraPanel = document.querySelector("#floraPanel");
const activityPanel = document.querySelector("#activityPanel");


const floraBackground =
    floraPanel.querySelector(".panel-background");

const activityBackground =
    activityPanel.querySelector(".panel-background");


const floraTitle =
    document.querySelector("#floraTitle");

const floraDescription =
    document.querySelector("#floraDescription");


const activityTitle =
    document.querySelector("#activityTitle");

const activityDescription =
    document.querySelector("#activityDescription");


const floraCurrent =
    document.querySelector("#floraCurrent");

const activityCurrent =
    document.querySelector("#activityCurrent");


document.querySelector("#floraTotal").textContent =
    String(floraData.length).padStart(2, "0");


document.querySelector("#activityTotal").textContent =
    String(activityData.length).padStart(2, "0");


/* =====================================================
   ESTADO
===================================================== */

let floraIndex = 0;
let activityIndex = 0;


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
   ACTIVIDADES
===================================================== */

function nextActivity() {

    activityIndex++;

    if (activityIndex >= activityData.length) {
        activityIndex = 0;
    }

    changePanel(
        activityPanel,
        activityBackground,
        activityTitle,
        activityDescription,
        activityCurrent,
        activityData,
        activityIndex
    );
}


function previousActivity() {

    activityIndex--;

    if (activityIndex < 0) {
        activityIndex = activityData.length - 1;
    }

    changePanel(
        activityPanel,
        activityBackground,
        activityTitle,
        activityDescription,
        activityCurrent,
        activityData,
        activityIndex
    );
}


/* =====================================================
   BOTONES
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


document
    .querySelector("#activityNext")
    .addEventListener("click", (event) => {

        event.stopPropagation();

        nextActivity();

    });


document
    .querySelector("#activityPrev")
    .addEventListener("click", (event) => {

        event.stopPropagation();

        previousActivity();

    });


/* =====================================================
   INICIALIZAR
===================================================== */

function initializePanels() {

    floraBackground.style.backgroundImage =
        `url("${floraData[0].image}")`;

    activityBackground.style.backgroundImage =
        `url("${activityData[0].image}")`;

}


initializePanels();


/* =====================================================
   CAMBIO AUTOMÁTICO
===================================================== */

let floraTimer = setInterval(nextFlora, 6000);

let activityTimer = setInterval(nextActivity, 7000);


/* =====================================================
   PAUSAR AL PASAR EL MOUSE
===================================================== */

floraPanel.addEventListener("mouseenter", () => {

    clearInterval(floraTimer);

});


floraPanel.addEventListener("mouseleave", () => {

    floraTimer = setInterval(nextFlora, 6000);

});


activityPanel.addEventListener("mouseenter", () => {

    clearInterval(activityTimer);

});


activityPanel.addEventListener("mouseleave", () => {

    activityTimer = setInterval(nextActivity, 7000);

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
/* =====================================================
   SPLASH SCREEN
===================================================== */

const splashScreen =
    document.querySelector("#splashScreen");

const splashCanvas =
    document.querySelector("#splashCanvas");

const splashLogo =
    document.querySelector(".splash-logo img");

const splashContext =
    splashCanvas.getContext("2d");

let splashParticles = [];

let splashAnimationFrame;

let splashStartTime;

const splashDuration = 4200;


/* =====================================================
   CONFIGURACIÓN
===================================================== */

function resizeSplashCanvas() {

    const ratio = window.devicePixelRatio || 1;

    splashCanvas.width =
        window.innerWidth * ratio;

    splashCanvas.height =
        window.innerHeight * ratio;

    splashCanvas.style.width =
        window.innerWidth + "px";

    splashCanvas.style.height =
        window.innerHeight + "px";

    splashContext.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );
}

resizeSplashCanvas();

window.addEventListener(
    "resize",
    resizeSplashCanvas
);


/* =====================================================
   CREAR PARTÍCULAS DESDE EL PNG
===================================================== */

function createSplashParticles() {

    const image = new Image();

    image.src = "path1521.png";

    image.onload = () => {

        const maxWidth =
            Math.min(280, window.innerWidth * .55);

        const scale =
            maxWidth / image.width;

        const width =
            image.width * scale;

        const height =
            image.height * scale;

        const offscreen =
            document.createElement("canvas");

        offscreen.width = width;
        offscreen.height = height;

        const context =
            offscreen.getContext("2d");

        context.drawImage(
            image,
            0,
            0,
            width,
            height
        );

        const pixels =
            context.getImageData(
                0,
                0,
                width,
                height
            ).data;

        const startX =
            (window.innerWidth - width) / 2;

        const startY =
            (window.innerHeight - height) / 2;

        splashParticles = [];

        /*
         * Cada 3 píxeles crea una partícula.
         * Si quieres MUCHÍSIMAS más partículas,
         * cambia 3 por 2 o incluso 1.
         */

        const particleSize = 3;

        for (
            let y = 0;
            y < height;
            y += particleSize
        ) {

            for (
                let x = 0;
                x < width;
                x += particleSize
            ) {

                const pixelIndex =
                    (Math.floor(y) * width +
                     Math.floor(x)) * 4;

                const alpha =
                    pixels[pixelIndex + 3];

                if (alpha > 80) {

                    const red =
                        pixels[pixelIndex];

                    const green =
                        pixels[pixelIndex + 1];

                    const blue =
                        pixels[pixelIndex + 2];

                    const targetX =
                        startX + x;

                    const targetY =
                        startY + y;

                    const angle =
                        Math.random() *
                        Math.PI * 2;

                    const distance =
                        80 +
                        Math.random() * 180;

                    splashParticles.push({

                        x: targetX,

                        y: targetY,

                        targetX,

                        targetY,

                        explosionX:
                            targetX +
                            Math.cos(angle) *
                            distance,

                        explosionY:
                            targetY +
                            Math.sin(angle) *
                            distance,

                        size:
                            1 +
                            Math.random() * 2.5,

                        red,

                        green,

                        blue,

                        alpha:
                            alpha / 255,

                        rotation:
                            Math.random() *
                            Math.PI * 2,

                        speed:
                            .7 +
                            Math.random() * 1.3

                    });

                }

            }

        }

        /*
         * Ocultamos el PNG original.
         * El canvas se encargará de reconstruirlo.
         */

        splashLogo.style.opacity = "0";

        splashStartTime =
            performance.now();

        animateSplash();

    };

}


/* =====================================================
   ANIMACIÓN
===================================================== */

function animateSplash(time) {

    if (!time) {
        time = performance.now();
    }

    const elapsed =
        time - splashStartTime;

    const progress =
        Math.min(
            elapsed / splashDuration,
            1
        );

    splashContext.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );


    /*
     * FASE 1
     *
     * El logo permanece construido.
     */

    let explosionProgress = 0;

    if (progress < .25) {

        explosionProgress = 0;

    }

    /*
     * FASE 2
     *
     * Se desintegra.
     */

    else if (progress < .52) {

        const value =
            (progress - .25) / .27;

        explosionProgress =
            easeInOutCubic(value);

    }

    /*
     * FASE 3
     *
     * Permanece disperso.
     */

    else if (progress < .62) {

        explosionProgress = 1;

    }

    /*
     * FASE 4
     *
     * Las partículas regresan.
     */

    else {

        const value =
            (progress - .62) / .38;

        explosionProgress =
            1 - easeInOutCubic(value);

    }


    splashParticles.forEach(
        particle => {

            const x =
                particle.targetX +
                (
                    particle.explosionX -
                    particle.targetX
                ) *
                explosionProgress;

            const y =
                particle.targetY +
                (
                    particle.explosionY -
                    particle.targetY
                ) *
                explosionProgress;


            /*
             * Pequeño movimiento orgánico
             * mientras están dispersas.
             */

            const floating =
                Math.sin(
                    time * .002 +
                    particle.targetX
                ) *
                2 *
                explosionProgress;


            const size =
                particle.size *
                (
                    1 +
                    explosionProgress * .35
                );


            splashContext.save();

            splashContext.translate(
                x,
                y + floating
            );

            splashContext.rotate(
                particle.rotation +
                explosionProgress * 2
            );


            splashContext.fillStyle =
                `rgba(
                    ${particle.red},
                    ${particle.green},
                    ${particle.blue},
                    ${particle.alpha}
                )`;


            splashContext.fillRect(
                -size / 2,
                -size / 2,
                size,
                size
            );


            splashContext.restore();

        }
    );


    if (progress < 1) {

        splashAnimationFrame =
            requestAnimationFrame(
                animateSplash
            );

    } else {

        finishSplash();

    }

}


/* =====================================================
   EASING
===================================================== */

function easeInOutCubic(value) {

    return value < .5

        ? 4 * value * value * value

        : 1 -
          Math.pow(
              -2 * value + 2,
              3
          ) / 2;

}


/* =====================================================
   TERMINAR SPLASH
===================================================== */

function finishSplash() {

    splashScreen.classList.add(
        "finished"
    );

    setTimeout(() => {

        splashScreen.remove();

    }, 1000);

}


/* =====================================================
   INICIAR
===================================================== */

createSplashParticles();