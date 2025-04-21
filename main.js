// Toggle mobile menu and drawer visibility
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

// Handle color option selection
const colorOptions = document.querySelectorAll(".color-option");

colorOptions.forEach((option) => {
    option.addEventListener("click", () => {
        colorOptions.forEach((opt) => opt.classList.remove("selected"));
        option.classList.add("selected");
    });
});

// Create image tabs with active state
export function createImageTabs(wrapperClass, images, activeClass = "active", tabClass = "tab-button") {
    const wrapper = document.querySelector(`.${wrapperClass}`);
    if (!wrapper || !images?.length) return;

    const tabContainer = wrapper.querySelector(".tabContainer");
    const tabImage = wrapper.querySelector(".tabImage");

    if (!tabContainer) return;

    tabContainer.innerHTML = "";

    images.forEach((img, index) => {
        const tab = document.createElement("img");
        tab.src = img;
        tab.alt = "tab";
        tab.className = tabClass;
        tab.dataset.index = index;

        tab.addEventListener("click", () => {
            updateActiveTab(index);
        });

        tabContainer.appendChild(tab);
    });

    function updateActiveTab(index) {
        if (tabImage) {
            tabImage.style.opacity = 0;
            setTimeout(() => {
                tabImage.src = images[index];
                tabImage.style.opacity = 1;
            }, 150);
        }

        const buttons = tabContainer.querySelectorAll(`.${tabClass}`);
        buttons.forEach((btn, i) => {
            btn.classList.toggle(activeClass, i === index);
        });
    }

    updateActiveTab(0);
}

// Initialize image tabs for different sections
const images1 = ["/images/p3.png", "/images/p2.png", "/images/p4.png", "/images/p3.png"];
const images2 = ["/images/Item → Img.png", "/images/p2.png", "/images/p4.png", "/images/p3.png", "/images/Item → Img.png"];

const activeClass1 = "active-tab1";
const activeClass2 = "active-tab2";
const tab2 = "tab2";

createImageTabs("tabSection1", images1, activeClass1);
createImageTabs("tabSection2", images2, activeClass2, tab2);

// Handle FAQ item toggle for displaying content
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    item.addEventListener("click", () => {
        item.classList.toggle("active");
        const content = item.querySelector(".faq-content");
        if (item.classList.contains("active")) {
            content.style.display = "block";
        } else {
            content.style.display = "none";
        }
    });
});

// Initialize custom slider functionality with navigation buttons and autoplay
function initCustomSlider(selector, cardsPerView = 1) {
    const sliders = document.querySelectorAll(selector);

    sliders.forEach((slider) => {
        const wrapper = slider.querySelector(".slider-wrapper");
        const slides = slider.querySelectorAll(".slide");
        const prevBtn = slider.querySelector(".slider-prev");
        const nextBtn = slider.querySelector(".slider-next");
        const dotsContainer = slider.querySelector(".slider-dots");

        let currentIndex = 0;
        const totalSlides = slides.length;
        const maxIndex = Math.ceil(totalSlides / cardsPerView) - 1;
        let interval;

        slides.forEach((slide) => {
            slide.style.flex = `0 0 ${100 / cardsPerView}%`;
        });

        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement("button");
            dot.classList.add("dot");
            dot.setAttribute("data-index", i);
            dotsContainer.appendChild(dot);
        }

        const updateSlider = () => {
            const offset = currentIndex * (100 / cardsPerView);
            wrapper.style.transform = `translateX(-${offset}%)`;

            dotsContainer.querySelectorAll(".dot").forEach((dot) => {
                dot.classList.remove("active");
            });
            const activeDot = dotsContainer.querySelector(`.dot[data-index="${currentIndex}"]`);
            if (activeDot) activeDot.classList.add("active");
        };

        const nextSlide = () => {
            currentIndex = currentIndex + 1 > maxIndex ? 0 : currentIndex + 1;
            updateSlider();
        };

        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + maxIndex + 1) % (maxIndex + 1);
            updateSlider();
        };

        dotsContainer.addEventListener("click", (e) => {
            if (e.target.classList.contains("dot")) {
                currentIndex = parseInt(e.target.getAttribute("data-index"));
                updateSlider();
            }
        });

        nextBtn.addEventListener("click", nextSlide);
        prevBtn.addEventListener("click", prevSlide);

        const startAutoPlay = () => {
            interval = setInterval(nextSlide, 4000);
        };

        const stopAutoPlay = () => {
            clearInterval(interval);
        };

        slider.addEventListener("mouseenter", stopAutoPlay);
        slider.addEventListener("mouseleave", startAutoPlay);

        updateSlider();
        startAutoPlay();
    });
}

// Initialize slider after DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    initCustomSlider(".custom-slider", 1);
});
