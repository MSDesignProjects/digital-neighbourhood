// CLICK BUTTON FUNCTION
let trellick = document.getElementById("trellicklabel");
let meanwhile = document.getElementById("meanwhilelabel");
let wech = document.getElementById("wechlabel");

function openTrellick() { 
    trellick.classList.toggle("open-label");
    meanwhile.classList.remove("open-label");
    wech.classList.remove("open-label");
}

function openMeanwhile() { 
    meanwhile.classList.toggle("open-label"); 
    trellick.classList.remove("open-label");
    wech.classList.remove("open-label");

}

function openWech() { 
    wech.classList.toggle("open-label");
    trellick.classList.remove("open-label")
    meanwhile.classList.remove("open-label");s 
}

function closeTrellick() { trellick.classList.remove("open-label"); }
function closeMeanwhile() { meanwhile.classList.remove("open-label"); }
function closeWech() { wech.classList.remove("open-label"); }



// QR CODE INTERACTION vvv
// read URL parameter
const urlParams = new URLSearchParams(window.location.search);
const scanned = urlParams.get("loc");

// load stored scans (or empty object)
let scans = JSON.parse(localStorage.getItem("scans")) || {};

// update scans if new QR scanned
if (scanned) {
    scans[scanned] = true;
    localStorage.setItem("scans", JSON.stringify(scans));
}

// activate all scanned markers
Object.keys(scans).forEach(loc => {
    const marker = document.querySelector(`.${loc}`);
    if (marker) marker.classList.add("location-scanned");
});

// hide all prompts first
document.querySelectorAll(".prompt-screen").forEach(el => el.style.display = "none");

// show prompt only for scanned QR
if (scanned) {
    showPrompt(`prompt${scanned}`);
}

// centering website in middle of map
function centerMap() {
    const container = document.querySelector(".container");
    const centerX = container.scrollWidth / 2 - window.innerWidth / 2;
    const centerY = container.scrollHeight / 2 - window.innerHeight / 2;
    window.scrollTo(centerX, centerY);
}

// prompt screen function
function showPrompt(id) {
    const prompt = document.getElementById(id);
    if (!prompt) return;

    prompt.style.display = "flex"; // show

    prompt.addEventListener("click", () => {
        prompt.classList.add("hidden");
        setTimeout(() => {
            prompt.style.display = "none"
            centerMap();
        }, 800);  
    });
}




//COMMUNITY SPACEvvv

//show button when 3 scanned
if (scans["trellick"] && scans["meanwhile"] && scans["wech"]) {
    document.getElementById("community-btn").classList.add("show");
}

document.getElementById("community-btn").addEventListener("click", () => {
    window.location.href = "forum.html";
});

