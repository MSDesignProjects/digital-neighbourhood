// =====================
// GLOBAL STATE
// =====================
const locations = ["trellick", "meanwhile", "wech", "walterton"];

const urlParams = new URLSearchParams(window.location.search);
const scanned = urlParams.get("loc");

let scans = JSON.parse(localStorage.getItem("scans")) || {};

// save scan if coming from QR
if (scanned) {
  scans[scanned] = true;
  localStorage.setItem("scans", JSON.stringify(scans));
}


// =====================
// LABEL FUNCTIONS
// =====================
let help = document.getElementById("helplabel");
let trellick = document.getElementById("trellicklabel");
let meanwhile = document.getElementById("meanwhilelabel");
let wech = document.getElementById("wechlabel");
let walterton = document.getElementById("waltertonlabel");

function openHelp() {
    help.classList.toggle("open-label");
    meanwhile.classList.remove("open-label");
    wech.classList.remove("open-label");
    walterton.classList.remove("open-label");
    trellick.classList.remove("open-label");
}

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

function closeHelp() { help.classList.remove("open-label"); }
function closeTrellick() { trellick.classList.remove("open-label"); }
function closeMeanwhile() { meanwhile.classList.remove("open-label"); }
function closeWech() { wech.classList.remove("open-label"); }
function closeWalterton() { walterton.classList.remove("open-label"); }


// =====================
// PROMPT PAGE 
// =====================
function showPrompt(id) {
  const prompt = document.getElementById(id);
  if (!prompt) return;

  const pages = prompt.querySelectorAll(".prompt-page");
  pages.forEach((p, i) => p.classList.toggle("active", i === 0));

  prompt.classList.remove("hidden");
  prompt.style.display = "flex";

  prompt.onclick = e => {
  if (!e.target.closest("a")) {
    advancePrompt(prompt);
    }
  };

}

function advancePrompt(prompt) {
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
    updateMapImage(); 

    showOverlayLogo(); 
  }, 800);
}


// =====================
// STAMPS
// =====================
function showStamp(location) {
  const stamp = document.getElementById(location + "-stamp");
  if (!stamp) return;

  stamp.style.display = "block";
  stamp.onclick = () =>  window["open" + location.charAt(0).toUpperCase() + location.slice(1)]();

}


// =====================
// VIEW INFO AGAIN BUTTON
// =====================
function addViewInfoButton(location) {
  const label = document.getElementById(location + "label");
  if (!label) return;

  const container = label.querySelector(".view-info-container");
  if (!container || container.querySelector(".view-info-btn")) return;

  const btn = document.createElement("button");
  btn.className = "view-info-btn";
  btn.textContent = "View Info Again";

  btn.onclick = e => {
    e.stopPropagation();
    showPrompt("prompt" + location);
  };

  container.appendChild(btn);
}


// =====================
// MAP IMAGE PROGRESSION
// =====================
function updateMapImage() {
  const map = document.getElementById("map-image");
  if (!map) return;

  const count = Object.values(scans).filter(Boolean).length;

  let version = 0;
  if (count >= 4) version = 3;
  else if (count === 3) version = 2;
  else if (count === 2) version = 1;
  else if (count === 1) version = 0;

  map.src = `map${version}.JPG`;
}


// =====================
// MAP CENTERING 
// =====================
window.addEventListener("load", () => {
  const container = document.querySelector(".container");
  container.scrollTo({
    left: (container.scrollWidth - container.clientWidth) / 2,
    top: (container.scrollHeight - container.clientHeight) / 2
  });
});



// =====================
// OVERLAY LOGO 
// =====================
function showOverlayLogo() {
  const logo = document.getElementById("overlay-logo");
  if (!logo) return;

  logo.classList.add("show");
  setTimeout(() => logo.classList.remove("show"), 600);
}


// =====================
// !!!! STARTUP LOGIC !!!!!
// =====================
document.addEventListener("DOMContentLoaded", () => {

  // hide all prompts on load
  document.querySelectorAll(".prompt-screen").forEach(p => {
    p.style.display = "none";
  });

  // unlock scanned locations
  locations.forEach(loc => {
    if (!scans[loc]) return;

    const marker = document.querySelector(`.${loc}`);
    marker?.classList.add("location-scanned");

    showStamp(loc);
    addViewInfoButton(loc);
  });

  // open prompt if arriving from QR
  if (scanned) {
    showPrompt("prompt" + scanned);
  }

  // update map
  updateMapImage();

  // show logo once
  showOverlayLogo();


});
