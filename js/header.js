/* ================= MOBILE MENU ================= */

const burgerBtn = document.getElementById("burgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");

/* Open menu */
if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener("click", () => {
        mobileMenu.classList.add("active");
        document.body.style.overflow = "hidden";
    });
}

/* Close menu */
function closeMobileMenu() {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "";
}

/* Close by X */
if (closeMenu) {
    closeMenu.addEventListener("click", closeMobileMenu);
}

/* Close by click outside */
if (mobileMenu) {
    mobileMenu.addEventListener("click", (e) => {
        if (e.target === mobileMenu) {
            closeMobileMenu();
        }
    });
}

/* Close by ESC */
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
        closeMobileMenu();
    }
});

/* ================= ACTIVE NAV LINK ================= */

const currentPath = window.location.pathname.split("/").pop() || "index.html";

/* Desktop nav */
document.querySelectorAll(".header__nav a").forEach(link => {
    const linkPath = link.getAttribute("href");

    if (linkPath === currentPath) {
        link.classList.add("active");
    }
});

/* Mobile nav */
document.querySelectorAll(".mobile-menu__nav a").forEach(link => {
    const linkPath = link.getAttribute("href");

    if (linkPath === currentPath) {
        link.classList.add("active");
    }
});
