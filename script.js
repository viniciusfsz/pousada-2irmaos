// ===============================
// ELEMENTOS PRINCIPAIS
// ===============================

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const navLinks = document.querySelectorAll(".nav a");
const year = document.querySelector("#current-year");


// ===============================
// MENU MOBILE
// ===============================

if (menuButton && nav) {

    menuButton.addEventListener("click", () => {

        nav.classList.toggle("active");
        menuButton.classList.toggle("active");

        const isOpen = nav.classList.contains("active");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });

}


// ===============================
// FECHAR MENU AO CLICAR EM LINK
// ===============================

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

        if (menuButton) {

            menuButton.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

});


// ===============================
// FECHAR MENU AO CLICAR FORA
// ===============================

document.addEventListener("click", (event) => {

    if (!nav || !menuButton) return;

    const clickedInsideNav = nav.contains(event.target);
    const clickedMenuButton = menuButton.contains(event.target);

    if (
        nav.classList.contains("active") &&
        !clickedInsideNav &&
        !clickedMenuButton
    ) {

        nav.classList.remove("active");
        menuButton.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});


// ===============================
// FECHAR MENU COM ESC
// ===============================

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        if (nav) {
            nav.classList.remove("active");
        }

        if (menuButton) {

            menuButton.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }

});


// ===============================
// HEADER AO ROLAR
// ===============================

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", updateHeader);

updateHeader();


// ===============================
// ANIMAÇÃO AO APARECER NA TELA
// ===============================

const elementsToAnimate = document.querySelectorAll(
    ".section, .room-card, .benefits article, .cta-content"
);

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


    elementsToAnimate.forEach((element) => {

        element.classList.add("reveal");

        observer.observe(element);

    });

} else {

    // Caso o navegador seja muito antigo
    elementsToAnimate.forEach((element) => {

        element.classList.add("show");

    });

}


// ===============================
// ANO AUTOMÁTICO NO FOOTER
// ===============================

if (year) {

    year.textContent = new Date().getFullYear();

}


// ===============================
// SCROLL SUAVE DOS LINKS INTERNOS
// ===============================

const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }


        const targetElement = document.querySelector(targetId);

        if (!targetElement) {
            return;
        }


        event.preventDefault();

        targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


// ===============================
// BOTÕES COM href="#"
// ===============================
// Evita que links ainda sem endereço
// joguem a página para o topo.

const emptyLinks = document.querySelectorAll('a[href="#"]');

emptyLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

    });

});


// ===============================
// FECHAR MENU AO AUMENTAR A TELA
// ===============================

window.addEventListener("resize", () => {

    if (window.innerWidth > 1000) {

        if (nav) {
            nav.classList.remove("active");
        }

        if (menuButton) {

            menuButton.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }

});