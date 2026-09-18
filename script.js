/* =========================
   DATOS TEMPORALES
========================= */

const natureData = [

    {
        title: "Tiburón ballena",
        category: "FAUNA MARINA",
        description: "Conoce esta especie y las recomendaciones para observarla responsablemente.",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80"
    },

    {
        title: "Tortugas marinas",
        category: "FAUNA MARINA",
        description: "Conoce su importancia para los ecosistemas y cómo protegerlas.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80"
    },

    {
        title: "Lobos marinos",
        category: "FAUNA MARINA",
        description: "Descubre dónde pueden observarse y cómo mantener una distancia responsable.",
        image: "https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&w=900&q=80"
    },

    {
        title: "Arrecifes rocosos",
        category: "ECOSISTEMA",
        description: "Un ecosistema fundamental para numerosas especies marinas.",
        image: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=900&q=80"
    }

];


const activityData = [

    {
        title: "Kayak",
        category: "ACTIVIDAD",
        description: "Explora zonas costeras procurando reducir tu impacto.",
        image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=900&q=80"
    },

    {
        title: "Senderismo",
        category: "ACTIVIDAD",
        description: "Conoce los paisajes naturales siguiendo caminos y reglas establecidas.",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=80"
    },

    {
        title: "Snorkel",
        category: "ACTIVIDAD",
        description: "Observa la vida marina sin tocar ni alterar el ecosistema.",
        image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=900&q=80"
    },

    {
        title: "Ciclismo",
        category: "MOVILIDAD",
        description: "Una alternativa para recorrer determinados espacios sin utilizar automóvil.",
        image: "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&w=900&q=80"
    }

];


const articlesData = [

    {
        category: "INICIATIVAS LOCALES",
        title: "Una comunidad que busca proteger su costa",
        description: "Conoce proyectos locales relacionados con la conservación y el turismo responsable.",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80"
    },

    {
        category: "TURISMO RESPONSABLE",
        title: "Cómo visitar una playa sin dejar huella",
        description: "Pequeñas decisiones pueden reducir considerablemente nuestro impacto.",
        image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80"
    },

    {
        category: "COMUNIDAD",
        title: "Nuevas formas de conocer Baja California Sur",
        description: "Personas y proyectos que están buscando transformar la manera de hacer turismo.",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
    }

];


/* =========================
   CREAR TARJETAS
========================= */

function createCards(data, container) {

    data.forEach(item => {

        const card = document.createElement("article");

        card.className = "card reveal";

        card.innerHTML = `

            <img
                class="card-image"
                src="${item.image}"
                alt="${item.title}"
            >

            <div class="card-overlay">

                <span class="card-category">
                    ${item.category}
                </span>

                <h3 class="card-title">
                    ${item.title}
                </h3>

                <p class="card-description">
                    ${item.description}
                </p>

            </div>

        `;

        container.appendChild(card);

    });

}


/* =========================
   CREAR ARTICULOS
========================= */

function createArticles() {

    const container =
        document.getElementById("articlesGrid");

    articlesData.forEach(item => {

        const article =
            document.createElement("article");

        article.className = "article reveal";

        article.innerHTML = `

            <img
                class="article-image"
                src="${item.image}"
                alt="${item.title}"
            >

            <span class="article-category">
                ${item.category}
            </span>

            <h3>
                ${item.title}
            </h3>

            <p>
                ${item.description}
            </p>

        `;

        container.appendChild(article);

    });

}


/* =========================
   CAROUSEL
========================= */

function setupCarousel(trackId, prevId, nextId) {

    const track =
        document.getElementById(trackId);

    const prev =
        document.getElementById(prevId);

    const next =
        document.getElementById(nextId);

    let position = 0;

    const getStep = () => {

        const card =
            track.querySelector(".card");

        if (!card) return 340;

        return card.offsetWidth + 22;

    };


    next.addEventListener("click", () => {

        const max =
            track.scrollWidth -
            track.parentElement.offsetWidth;

        position += getStep();

        if (position > max) {
            position = 0;
        }

        track.style.transform =
            `translateX(-${position}px)`;

    });


    prev.addEventListener("click", () => {

        position -= getStep();

        if (position < 0) {

            const max =
                track.scrollWidth -
                track.parentElement.offsetWidth;

            position = Math.max(0, max);

        }

        track.style.transform =
            `translateX(-${position}px)`;

    });

}


/* =========================
   MENU MOVIL
========================= */

const menuBtn =
    document.getElementById("menuBtn");

const mobileMenu =
    document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

});


document.querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

        });

    });


/* =========================
   SCROLL REVEAL
========================= */

function setupReveal() {

    const elements =
        document.querySelectorAll(".reveal");

    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: .15
            }

        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================
   INICIALIZAR
========================= */

const natureTrack =
    document.getElementById("natureTrack");

const activityTrack =
    document.getElementById("activityTrack");


createCards(
    natureData,
    natureTrack
);

createCards(
    activityData,
    activityTrack
);

createArticles();


setupCarousel(
    "natureTrack",
    "naturePrev",
    "natureNext"
);

setupCarousel(
    "activityTrack",
    "activityPrev",
    "activityNext"
);

setupReveal();