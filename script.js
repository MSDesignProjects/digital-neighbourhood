// =====================
// LABEL CLICK FUNCTIONS
// =====================
let trellick = document.getElementById("trellicklabel");
let meanwhile = document.getElementById("meanwhilelabel");
let wech = document.getElementById("wechlabel");
let walterton = document.getElementById("waltertonlabel");

function openTrellick() {
    trellick.classList.toggle("open-label");
    meanwhile.classList.remove("open-label");
    wech.classList.remove("open-label");
    walterton.classList.remove("open-label");
}

function openMeanwhile() {
    meanwhile.classList.toggle("open-label");
    trellick.classList.remove("open-label");
    wech.classList.remove("open-label");
    walterton.classList.remove("open-label");
}

function openWech() {
    wech.classList.toggle("open-label");
    trellick.classList.remove("open-label");
    meanwhile.classList.remove("open-label");
    walterton.classList.remove("open-label");
}

function openWalterton() {
    walterton.classList.toggle("open-label");
    trellick.classList.remove("open-label");
    meanwhile.classList.remove("open-label");
    wech.classList.remove("open-label");
}

function closeTrellick() { trellick.classList.remove("open-label"); }
function closeMeanwhile() { meanwhile.classList.remove("open-label"); }
function closeWech() { wech.classList.remove("open-label"); }
function closeWalterton() { walterton.classList.remove("open-label"); }


// =====================
// QR CODE INTERACTION
// =====================
const urlParams = new URLSearchParams(window.location.search);
const scanned = urlParams.get("loc");

let scans = JSON.parse(localStorage.getItem("scans")) || {};

if (scanned) {
    scans[scanned] = true;
    localStorage.setItem("scans", JSON.stringify(scans));
}

// unlock scanned markers
Object.keys(scans).forEach(loc => {
    const marker = document.querySelector(`.${loc}`);
    if (marker) marker.classList.add("location-scanned");
});

// hide all prompts initially
document.querySelectorAll(".prompt-screen").forEach(el => {
    el.style.display = "none";
});

if (scanned) {
    showPrompt(`prompt${scanned}`);
}


// =====================
// PROMPT PAGE LOGIC
// =====================
function showPrompt(id) {
    const prompt = document.getElementById(id);
    if (!prompt) return;

    // reset pages
    const pages = prompt.querySelectorAll(".prompt-page");
    pages.forEach((p, i) => {
        p.classList.toggle("active", i === 0);
    });

    prompt.classList.remove("hidden");
    prompt.style.display = "flex";

    prompt.onclick = () => advancePrompt(prompt);
}

function advancePrompt(prompt) {
    const pages = prompt.querySelectorAll(".prompt-page");
    const current = prompt.querySelector(".prompt-page.active");

    if (!current) return;

    const next = current.nextElementSibling;

    if (next && next.classList.contains("prompt-page")) {
        current.classList.remove("active");
        next.classList.add("active");
    } else {
        closePrompt(prompt);
    }
}

function closePrompt(prompt) {
    prompt.classList.add("hidden");

    setTimeout(() => {
        prompt.style.display = "none";
        centerMap();
    }, 800);
}


// Function to add "View Info" button to a label
function addViewInfoButton(location) {
    const label = document.getElementById(location + "label");
    const container = label.querySelector(".view-info-container");

    // Avoid duplicate buttons
    if (container.querySelector(".view-info-btn")) return;

    const btn = document.createElement("button");
    btn.textContent = "View Info Again";
    btn.classList.add("view-info-btn");

    // Clicking the button opens the prompt
    btn.addEventListener("click", () => {
        showPrompt("prompt" + location);
    });

    container.appendChild(btn);
}

// Add buttons to all scanned locations
Object.keys(scans).forEach(loc => {
    if (scans[loc]) {
        addViewInfoButton(loc);
    }
});



// =====================
// COMMUNITY SPACE
// =====================
if (scans["trellick"] && scans["meanwhile"] && scans["wech"] && scans["walterton"]) {
    document.getElementById("community-btn").classList.add("show");
}

document.getElementById("community-btn").addEventListener("click", () => {
    window.location.href = "forum.html";
});
