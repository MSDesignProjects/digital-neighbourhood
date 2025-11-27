// CLICK BUTTON FUNCTION
let trellick = document.getElementById("trellicklabel");
let meanwhile = document.getElementById("meanwhilelabel");
let wech = document.getElementById("wechlabel");

function openTrellick() { trellick.classList.add("open-label"); }
function closeTrellick() { trellick.classList.remove("open-label"); }
function openMeanwhile() { meanwhile.classList.add("open-label"); }
function closeMeanwhile() { meanwhile.classList.remove("open-label"); }
function openWech() { wech.classList.add("open-label"); }
function closeWech() { wech.classList.remove("open-label"); }

// QR CODE INTERACTION

// 1. Read URL parameter
const urlParams = new URLSearchParams(window.location.search);
const scanned = urlParams.get("loc");

// 2. Load stored scans (or empty object)
let scans = JSON.parse(localStorage.getItem("scans")) || {};

// 3. Update scans if new QR scanned
if (scanned) {
    scans[scanned] = true;
    localStorage.setItem("scans", JSON.stringify(scans));
}

// 4. Activate all scanned markers
Object.keys(scans).forEach(loc => {
    const marker = document.querySelector(`.${loc}`);
    if (marker) marker.classList.add("location-scanned");
});

// 5. Hide all prompts first
document.querySelectorAll(".prompt-screen").forEach(el => el.style.display = "none");

// 6. Show prompt only for current scanned QR
if (scanned) {
    showPrompt(`prompt${scanned}`);
}

// 7. Prompt screen function
function showPrompt(id) {
    const prompt = document.getElementById(id);
    if (!prompt) return;

    prompt.style.display = "flex"; // show

    // Fade out on tap anywhere
    prompt.addEventListener("click", () => {
        prompt.classList.add("hidden");
        setTimeout(() => prompt.style.display = "none", 800);
    });
}


//COMMUNITY SPACE

//show button when 3 scanned
if (scans["trellick"] && scans["meanwhile"] && scans["wech"]) {
    document.getElementById("community-btn").classList.add("show");
}

document.getElementById("community-btn").addEventListener("click", () => {
    window.location.href = "forum.html";
});
