const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});

/* ==================== SCROLL REVEAL ANIMATION ==================== */

const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale"
);

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach((element) => {
    revealObserver.observe(element);
});

/* ==================== NAVBAR POLISH ==================== */

const mainHeader = document.querySelector("header");
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {

        if (mainHeader) {
            mainHeader.classList.add("navbar-scrolled");
        }

        if (navbar) {
            navbar.classList.add("navbar-scrolled");
        }

    } else {

        if (mainHeader) {
            mainHeader.classList.remove("navbar-scrolled");
        }

        if (navbar) {
            navbar.classList.remove("navbar-scrolled");
        }

    }

});

/* ==================== ACTIVE NAVIGATION ==================== */

const navigationLinks = document.querySelectorAll(
    '.nav-menu a[href^="#"]'
);

const pageSections = document.querySelectorAll(
    "section[id]"
);

window.addEventListener("scroll", () => {

    let currentSection = "";

    pageSections.forEach((section) => {

        const sectionTop = section.offsetTop - 140;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    navigationLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === `#${currentSection}`
        ) {
            link.classList.add("active");
        }

    });

});

// =========================
// CONTACT FORM
// =========================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const submitButton = contactForm.querySelector(".contact-submit");
        const originalText = submitButton.innerHTML;

        submitButton.innerHTML = "Sending...";
        submitButton.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                contactForm.reset();

                showSuccessMessage(
                    "Inquiry Sent!",
                    "Thanks for reaching out. We'll get back to you soon."
                );
            } else {
                showSuccessMessage(
                    "Something went wrong",
                    "Please try again in a moment."
                );
            }

        } catch (error) {
            showSuccessMessage(
                "Something went wrong",
                "Please check your connection and try again."
            );
        }

        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    });
}


// =========================
// SUCCESS POPUP
// =========================

function showSuccessMessage(title, message) {

    const popup = document.createElement("div");

    popup.className = "success-popup";

    popup.innerHTML = `
        <div class="success-popup-box">

            <div class="success-icon">✓</div>

            <div>
                <h3>${title}</h3>
                <p>${message}</p>
            </div>

            <button class="success-close">&times;</button>

        </div>
    `;

    document.body.appendChild(popup);

    requestAnimationFrame(() => {
        popup.classList.add("show");
    });

    const closeButton = popup.querySelector(".success-close");

    closeButton.addEventListener("click", () => {

        popup.classList.remove("show");

        setTimeout(() => {
            popup.remove();
        }, 300);

    });

    setTimeout(() => {

        if (popup.parentElement) {

            popup.classList.remove("show");

            setTimeout(() => {
                popup.remove();
            }, 300);

        }

    }, 5000);
}