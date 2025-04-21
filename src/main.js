// import "./header";
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

const colorOptions = document.querySelectorAll(".color-option");

colorOptions.forEach((option) => {
    option.addEventListener("click", () => {
        // Remove selected class from all options
        colorOptions.forEach((opt) => opt.classList.remove("selected"));

        // Add selected class to the clicked option
        option.classList.add("selected");
    });
});

//add to cart

// const images = ["/src/images/p3.png", "/src/images/p2.png", "/src/images/p4.png", "/src/images/p3.png"];

// const tabContainer = document.getElementById("tabContainer");
// const tabImage = document.getElementById("tabImage");

// function createTabs() {
//     images.forEach((img, index) => {
//         const tab = document.createElement("img");
//         tab.src = img;
//         tab.alt = "tab";

//         tab.className = "tab-button";
//         tab.dataset.index = index;

//         tab.addEventListener("click", () => {
//             updateActiveTab(index);
//         });

//         tabContainer.appendChild(tab);
//     });
// }

// function updateActiveTab(index) {
//     tabImage.style.opacity = 0;

//     setTimeout(() => {
//         tabImage.src = images[index];
//         tabImage.style.opacity = 1;
//     }, 150);

//     const buttons = document.querySelectorAll(".tab-button");
//     buttons.forEach((btn, i) => {
//         btn.classList.toggle("active", i === index);
//     });
// }

// // Initialize
// createTabs();

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

    updateActiveTab(0); // default selected
}

const images1 = ["/src/images/p3.png", "/src/images/p2.png", "/src/images/p4.png", "/src/images/p3.png"];
const images2 = ["/src/images/Item → Img.png", "/src/images/p2.png", "/src/images/p4.png", "/src/images/p3.png", "/src/images/Item → Img.png"];

// Custom active class names for each section
const activeClass1 = "active-tab1";
const activeClass2 = "active-tab2";

// const tab1 = "tab1";
const tab2 = "tab2";

// Initialize the image tabs directly for each section
createImageTabs("tabSection1", images1, activeClass1); // For first section
createImageTabs("tabSection2", images2, activeClass2, tab2); // For second section

// colaps

// Select all FAQ items
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    item.addEventListener("click", () => {
        // Toggle the active class on the clicked item
        item.classList.toggle("active");

        // Toggle the display of the content
        const content = item.querySelector(".faq-content");
        if (item.classList.contains("active")) {
            content.style.display = "block";
        } else {
            content.style.display = "none";
        }
    });
});

// swiper

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

        // Set dynamic slide width
        slides.forEach((slide) => {
            slide.style.flex = `0 0 ${100 / cardsPerView}%`;
        });

        // Generate dots
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

        // Dot click
        dotsContainer.addEventListener("click", (e) => {
            if (e.target.classList.contains("dot")) {
                currentIndex = parseInt(e.target.getAttribute("data-index"));
                updateSlider();
            }
        });

        // Button click
        nextBtn.addEventListener("click", nextSlide);
        prevBtn.addEventListener("click", prevSlide);

        // Auto play (optional)
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

// Initialize with cards per view
document.addEventListener("DOMContentLoaded", () => {
    // Example: Show 3 cards at once
    initCustomSlider(".custom-slider", 1);
});
