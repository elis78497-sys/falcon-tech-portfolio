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
}))

};

const sectionMap = {
"Mascot":"mascot",
"Text Base":"textbase",
"Vector Art":"vector",
"Emotes":"emotes",
"V-Tuber":"vtuber"
};

function createGallery(){

Object.keys(portfolio).forEach(category=>{

const section=document.querySelector("#"+sectionMap[category]+" .gallery");

if(!section) return;

section.innerHTML="";

portfolio[category].forEach(project=>{

const card=document.createElement("div");
card.className="project-card";

const img=document.createElement("img");

img.src=project.images[0];

img.alt=project.title;

const title=document.createElement("h3");
title.textContent=project.title;

card.appendChild(img);
card.appendChild(title);

card.onclick=()=>openGallery(project.images);

section.appendChild(card);

});

});

}
function openGallery(images){

if(!images || images.length===0){
alert("No images found.");
return;
}

let current=0;

const overlay=document.createElement("div");
overlay.className="preview";

const media=document.createElement("div");
media.className="preview-media";

const prev=document.createElement("button");
prev.className="nav prev";
prev.innerHTML="❮";

const next=document.createElement("button");
next.className="nav next";
next.innerHTML="❯";

function show(){

media.innerHTML="";

const file=images[current];
const ext=file.split(".").pop().toLowerCase();

if(["mp4","webm"].includes(ext)){

const video=document.createElement("video");
video.src=file;
video.controls=true;
video.autoplay=true;

media.appendChild(video);

}else{

const img=document.createElement("img");
img.src=file;

media.appendChild(img);

}

}

prev.onclick=(e)=>{

e.stopPropagation();

current--;

if(current<0)
current=images.length-1;

show();

};

next.onclick=(e)=>{

e.stopPropagation();

current++;

if(current>=images.length)
current=0;

show();

};

overlay.onclick=()=>overlay.remove();

media.onclick=(e)=>e.stopPropagation();

overlay.appendChild(prev);
overlay.appendChild(media);
overlay.appendChild(next);

document.body.appendChild(overlay);

show();

document.addEventListener("keydown",function galleryControls(e){

if(!document.body.contains(overlay)){
document.removeEventListener("keydown",galleryControls);
return;
}

if(e.key==="ArrowRight"){

current++;

if(current>=images.length)
current=0;

show();

}

if(e.key==="ArrowLeft"){

current--;

if(current<0)
current=images.length-1;

show();

}

if(e.key==="Escape"){

overlay.remove();
document.removeEventListener("keydown",galleryControls);

}

});

}
createGallery();

// Disable Right Click
document.addEventListener("contextmenu", function(e){
    e.preventDefault();
});

// Disable Drag Images
document.addEventListener("dragstart", function(e){
    if(e.target.tagName==="IMG"){
        e.preventDefault();
    }
});

// Disable Ctrl + U
document.addEventListener("keydown", function(e){

    if(e.ctrlKey && (e.key==="u" || e.key==="U")){
        e.preventDefault();
    }

});

// Optional: ESC closes gallery even if focus changes
document.addEventListener("keydown", function(e){

    if(e.key==="Escape"){

        const preview=document.querySelector(".preview");

        if(preview){
            preview.remove();
        }

    }

});