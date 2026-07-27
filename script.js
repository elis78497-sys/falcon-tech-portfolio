const portfolio = {

  "Mascot": Array.from({ length: 8 }, (_, i) => ({
  title: `Project ${i + 1}`,
  images: [
    `projects/Mascot/project ${i + 1}/logo 1.jpeg`,
    i < 4
      ? `projects/Mascot/project ${i + 1}/banner 1.jpeg`
      : `projects/Mascot/project ${i + 1}/banner 1.png`,
    i === 0
      ? `projects/Mascot/project ${i + 1}/overlay 1.jpeg`
      : `projects/Mascot/project ${i + 1}/overlay 1.png`
  ]
})),

 "Text Base": [
    {
      title: "Project 1",
      images: [
        "projects/Text Base/project 1/logo.jpeg",
        "projects/Text Base/project 1/banner.png",
        "projects/Text Base/project 1/overlay.png"
      ]
    }
  ],

  "Vector Art": Array.from({ length: 6 }, (_, i) => ({
  title: `Project ${i + 1}`,
  images: [
    i === 0
      ? `projects/vector-art/project ${i + 1}/logo.webp`
      : `projects/vector-art/project ${i + 1}/logo.jpeg`,

    i === 0
      ? `projects/vector-art/project ${i + 1}/banner.webp`
      : i === 1
        ? `projects/vector-art/project ${i + 1}/banner.jpeg`
        : `projects/vector-art/project ${i + 1}/banner.png`
  ]
})),

  "Emotes": [
    {
      title: "Project 1",
      images: [
        "projects/Emotes/project 1/1.jpeg",
        "projects/Emotes/project 1/2.jpeg",
        "projects/Emotes/project 1/3.jpeg",
        "projects/Emotes/project 1/4.jpeg"
      ]
    }
  ],

  "V-Tuber": Array.from({ length: 11 }, (_, i) => ({
  title: `V-Tuber ${i + 1}`,
  images: [
    `projects/V-tuber/v-tuber ${i + 1}/v-tuber.jpeg`
  ]
})),


};

const sectionMap = {
  "Mascot": "mascot",
  "Text Base": "textbase",
  "Vector Art": "vector",
  "Emotes": "emotes",
  "V-Tuber": "vtuber"
};
function createGallery() {

  Object.keys(portfolio).forEach(category => {

    const section = document.querySelector(
      "#" + sectionMap[category] + " .gallery"
    );

    if (!section) return;

    // Duplicate cards rokne ke liye
    section.innerHTML = "";

    portfolio[category].forEach(project => {

      const card = document.createElement("div");
      card.className = "card";

      const img = document.createElement("img");

      if (project.images && project.images.length > 0) {
        img.src = project.images[0];
      } else {
        img.src = "https://via.placeholder.com/600x400?text=Coming+Soon";
      }

      img.alt = project.title;

      const title = document.createElement("h3");
      title.textContent = project.title;

      card.appendChild(img);
      card.appendChild(title);

      card.addEventListener("click", () => {
        openGallery(project.images);
      });

      section.appendChild(card);

    });

  });

}
function openGallery(images) {

  if (!images || images.length === 0) {
    alert("No images found.");
    return;
  }

  let current = 0;

  const overlay = document.createElement("div");
  overlay.className = "preview";

  const media = document.createElement("div");
  media.className = "preview-media";

  const prev = document.createElement("button");
  prev.innerHTML = "❮";

  const next = document.createElement("button");
  next.innerHTML = "❯";

  prev.className = "nav prev";
  next.className = "nav next";

  function show() {

    media.innerHTML = "";

    const file = images[current];
    const ext = file.split(".").pop().toLowerCase();

    if (["mp4", "webm"].includes(ext)) {

      const video = document.createElement("video");
      video.src = file;
      video.controls = true;
      video.autoplay = true;

      media.appendChild(video);

    } else {

      const img = document.createElement("img");
      img.src = file;

      media.appendChild(img);

    }

  }

  prev.onclick = (e) => {
    e.stopPropagation();

    current--;

    if (current < 0)
      current = images.length - 1;

    show();
  };

  next.onclick = (e) => {
    e.stopPropagation();

    current++;

    if (current >= images.length)
      current = 0;

    show();
  };

  overlay.onclick = () => overlay.remove();

  media.onclick = (e) => e.stopPropagation();

  overlay.appendChild(prev);
  overlay.appendChild(media);
  overlay.appendChild(next);

  document.body.appendChild(overlay);

  show();
  document.addEventListener("keydown", function galleryControls(e) {

    if (!document.body.contains(overlay)) {
        document.removeEventListener("keydown", galleryControls);
        return;
    }

    if (e.key === "ArrowRight") {
    e.preventDefault();
    nextImage();
}

if (e.key === "ArrowLeft") {
    e.preventDefault();
    prevImage();
}

    if (e.key === "Escape") {
        overlay.remove();
        document.removeEventListener("keydown", galleryControls);
    }

});
}

createGallery();
document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
});
document.addEventListener("dragstart", function(e) {
    if (e.target.tagName === "IMG") {
        e.preventDefault();
    }
});
document.addEventListener("keydown", function(e) { 

    if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
    }

});