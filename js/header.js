const burgerBtn = document.getElementById("burgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");

/* OPEN MENU */
burgerBtn.addEventListener("click", () => {
    mobileMenu.classList.add("active");
    document.body.style.overflow = "hidden";
});

/* CLOSE MENU (X) */
closeMenu.addEventListener("click", closeMobileMenu);

/* CLOSE MENU (CLICK OUTSIDE) */
mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) {
        closeMobileMenu();
    }
});

/* CLOSE MENU (ESC KEY) */
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
        closeMobileMenu();
    }
});

/* HELPER */
function closeMobileMenu() {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "";
}
