// mobile drawer

const menuToggle = document.getElementById("menu-toggle");
const drawer = document.getElementById("mobile-drawer");
const overlay = document.getElementById("drawer-overlay");
const closeBtn = document.getElementById("close-drawer");

menuToggle.addEventListener("click", () => {
    drawer.classList.add("active");
    overlay.classList.add("active");
});

function closeDrawer() {
    drawer.classList.remove("active");
    overlay.classList.remove("active");
}

closeBtn.addEventListener("click", closeDrawer);
overlay.addEventListener("click", closeDrawer);
