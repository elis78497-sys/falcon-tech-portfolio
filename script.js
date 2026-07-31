/* ==========================================
   FALCON VISUALS PORTFOLIO
========================================== */

let portfolio = {};
let currentImages = [];
let currentIndex = 0;

const sectionMap = {
    "Artwork": "artwork",
    "Mascot": "mascot",
    "Text Base": "textbase",
    "Vector Art": "vector",
    "Emotes": "emotes",
    "V-tuber": "vtuber"
};

/* =========================
LOAD JSON
========================= */

async function loadPortfolio() {

    try {

        const response = await fetch("projects.json");

        portfolio = await response.json();

        createGallery();

    } catch (err) {

        console.error("Projects JSON Error:", err);

    }

}

loadPortfolio();

/* =========================
CREATE GALLERY
========================= */

function createGallery() {

    Object.keys(portfolio).forEach(category => {

        const gallery = document.querySelector(
            "#" + sectionMap[category] + " .gallery"
        );

        if (!gallery) return;

        gallery.innerHTML = "";

        portfolio[category].forEach(project => {

            const card = document.createElement("div");

            card.className = "project-card";

            card.innerHTML = `

                <img src="${project.images[0]}" loading="lazy">

                <h4>${project.title}</h4>

            `;

            card.onclick = () => {

                currentImages = project.images.filter(Boolean);

                currentIndex = 0;

                openGallery();

            };

            gallery.appendChild(card);

        });

    });

}
/* ===========================
FULL SCREEN GALLERY
=========================== */

function openGallery() {

    const overlay = document.getElementById("galleryOverlay");

    overlay.innerHTML = "";

    overlay.classList.add("active");

    const content = document.createElement("div");
    content.className = "gallery-content";

    const close = document.createElement("span");
    close.className = "close-gallery";
    close.innerHTML = "&times;";

    close.onclick = () => {

        overlay.classList.remove("active");

    };

    const prev = document.createElement("button");
    prev.className = "gallery-prev";
    prev.innerHTML = "❮";

    const next = document.createElement("button");
    next.className = "gallery-next";
    next.innerHTML = "❯";

    function showImage() {

        content.querySelectorAll("img,video,.image-wrapper").forEach(el => el.remove());

        const file = currentImages[currentIndex];

        if (!file) return;

        const ext = file.split(".").pop().toLowerCase();

        if (["mp4", "webm"].includes(ext)) {

            const video = document.createElement("video");

            video.src = file;

            video.controls = true;

            video.autoplay = true;

            video.playsInline = true;

            content.appendChild(video);

        } else {

            const wrapper = document.createElement("div");

            wrapper.className = "image-wrapper";

            const img = document.createElement("img");

            img.src = file;

            img.draggable = false;

            img.loading = "lazy";

            const watermark = document.createElement("div");

            watermark.className = "watermark";

            watermark.textContent = "FALCON VISUALS";

            wrapper.appendChild(img);

            wrapper.appendChild(watermark);

            content.appendChild(wrapper);

        }

    }

    prev.onclick = () => {

        currentIndex--;

        if (currentIndex < 0)
            currentIndex = currentImages.length - 1;

        showImage();

    };

    next.onclick = () => {

        currentIndex++;

        if (currentIndex >= currentImages.length)
            currentIndex = 0;

        showImage();

    };

    content.appendChild(close);
    content.appendChild(prev);
    content.appendChild(next);

    overlay.appendChild(content);

    showImage();

}
/* ===========================
SEARCH
=========================== */

const search = document.getElementById("search");

if (search) {

    search.addEventListener("input", function () {

        const value = this.value.toLowerCase();

        document.querySelectorAll(".project-card").forEach(card => {

            const title = card.querySelector("h4").textContent.toLowerCase();

            card.style.display = title.includes(value)
                ? ""
                : "none";

        });

    });

}

/* ===========================
FILTERS
=========================== */

document.querySelectorAll(".filter-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        document.querySelectorAll(".filter-btn")
            .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        const filter = btn.textContent;

        document.querySelectorAll("#portfolio section").forEach(section => {

            const title = section.querySelector("h3").textContent;

            if (filter === "All" || filter === title) {

                section.style.display = "block";

            } else {

                section.style.display = "none";

            }

        });

    });

});

/* ===========================
FAQ
=========================== */

document.querySelectorAll(".faq-question").forEach(button => {

    button.addEventListener("click", () => {

        button.parentElement.classList.toggle("active");

    });

});

/* ===========================
COUNTERS
=========================== */

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = Number(counter.dataset.target);

        let value = 0;

        const speed = target / 80;

        function update() {

            value += speed;

            if (value < target) {

                counter.textContent = Math.floor(value);

                requestAnimationFrame(update);

            } else {

                counter.textContent = target + "+";

            }

        }

        update();

        observer.unobserve(counter);

    });

});

counters.forEach(counter => observer.observe(counter));

/* ===========================
MOBILE MENU
=========================== */

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.getElementById("navMenu");

if (menuToggle) {

    menuToggle.onclick = () => {

        navMenu.classList.toggle("active");

    };

}

/* ===========================
LOADER
=========================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        setTimeout(() => {

            loader.classList.add("hide");

        }, 1000);

    }

});

/* ===========================
IMAGE PROTECTION
=========================== */

document.addEventListener("contextmenu", e => e.preventDefault());

document.addEventListener("dragstart", e => {

    if (e.target.tagName === "IMG") {

        e.preventDefault();

    }

});
/* =========================
SCROLL REVEAL
========================= */

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {

    reveals.forEach(section => {

        const top = section.getBoundingClientRect().top;

        const trigger = window.innerHeight - 120;

        if (top < trigger) {

            section.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

window.addEventListener("load", revealOnScroll);
/* ==========================
CURSOR GLOW
========================== */

const cursor = document.querySelector(".cursor-glow");
console.log(cursor);

document.addEventListener("mousemove",(e)=>{

    cursor.style.left = e.clientX + "px";

    cursor.style.top = e.clientY + "px";

});

document.querySelectorAll("a, button, .project-card").forEach(item => {

    item.addEventListener("mouseenter", () => {

        cursor.style.width = "55px";
        cursor.style.height = "55px";

        cursor.style.boxShadow =
            "0 0 35px rgba(181,116,255,.9), 0 0 80px rgba(181,116,255,.6)";

    });

    item.addEventListener("mouseleave", () => {

        cursor.style.width = "20px";
        cursor.style.height = "20px";

        cursor.style.boxShadow =
            "0 0 25px rgba(181,116,255,.65), 0 0 55px rgba(181,116,255,.45), 0 0 90px rgba(181,116,255,.25)";

    });

});