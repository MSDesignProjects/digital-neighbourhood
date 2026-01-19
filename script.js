// =====================
// GLOBAL STATE
// =====================
const LOCATIONS = ["trellick", "meanwhile", "wech", "walterton"];
const scans = JSON.parse(localStorage.getItem("scans")) || {};
let activePrompt = null;

// =====================
// LABEL OPEN / CLOSE
// =====================
function openLabel(location) {
  LOCATIONS.forEach(loc => {
    const label = document.getElementById(loc + "label");
    label.classList.toggle("open-label", loc === location && !label.classList.contains("open-label"));
    if (loc !== location) label.classList.remove("open-label");
  });
}

function closeAllLabels() {
  LOCATIONS.forEach(loc => {
    document.getElementById(loc + "label").classList.remove("open-label");
  });
}

// =====================
// QR CODE HANDLING
// =====================
const params = new URLSearchParams(window.location.search);
const scannedLoc = params.get("loc");

if (scannedLoc && LOCATIONS.includes(scannedLoc)) {
  scans[scannedLoc] = true;
  localStorage.setItem("scans", JSON.stringify(scans));
}

// Unlock scanned markers + buttons
LOCATIONS.forEach(loc => {
  if (!scans[loc]) return;

  const marker = document.querySelector("." + loc);
  if (marker) marker.classList.add("location-scanned");

  addViewInfoButton(loc);
});

// =====================
// PROMPT SYSTEM
// =====================
function showPrompt(location) {
  closePrompt(); // ensure only one prompt exists

  const prompt = document.getElementById("prompt" + location);
  if (!prompt) return;

  const pages = prompt.querySelectorAll(".prompt-page");
  pages.forEach((p, i) => p.classList.toggle("active", i === 0));

  prompt.style.display = "flex";
  prompt.classList.remove("hidden");
  activePrompt = prompt;

  prompt.onclick = e => {
    if (e.target === prompt) advancePrompt();
  };
}

function advancePrompt() {
  if (!activePrompt) return;

  const pages = activePrompt.querySelectorAll(".prompt-page");
  const current = activePrompt.querySelector(".prompt-page.active");
  const next = current?.nextElementSibling;

  if (next && next.classList.contains("prompt-page")) {
    current.classList.remove("active");
    next.classList.add("active");
  } else {
    closePrompt();
  }
}

function closePrompt() {
  if (!activePrompt) return;

  activePrompt.classList.add("hidden");

  setTimeout(() => {
    activePrompt.style.display = "none";
    activePrompt = null;
    showOverlayLogo();
    centerMap();
  }, 600);
}

// Auto-open prompt if QR used
if (scannedLoc) {
  showPrompt(scannedLoc);
}

// =====================
// VIEW INFO AGAIN BUTTON
// =====================
function addViewInfoButton(location) {
  const label = document.getElementById(location + "label");
  const container = label.querySelector(".view-info-container");
  if (!container || container.querySelector(".view-info-btn")) return;

  const btn = document.createElement("button");
  btn.textContent = "View Info Again";
  btn.className = "view-info-btn";

  btn.onclick = e => {
    e.stopPropagation();
    showPrompt(location);
  };

  container.appendChild(btn);
}

// =====================
// MAP IMAGE PROGRESSION
// =====================
function updateMapImage() {
  const map = document.getElementById("map-image");
  if (!map) return;

  const count = LOCATIONS.filter(l => scans[l]).length;
  const version = Math.max(1, count);

  map.style.opacity = 0;
  setTimeout(() => {
    map.src = `map${version}.JPG`;
    map.style.opacity = 1;
  }, 250);
}

updateMapImage();

// =====================
// MAP CENTERING (SAFE)
// =====================
function centerMap() {
  const mapContainer = document.getElementById("map-container");
  if (!mapContainer) return;

  mapContainer.scrollTo({
    left: (mapContainer.scrollWidth - mapContainer.clientWidth) / 2,
    top: (mapContainer.scrollHeight - mapContainer.clientHeight) / 2,
    behavior: "smooth"
  });
}

// =====================
// OVERLAY LOGO
// =====================
function showOverlayLogo() {
  const logo = document.getElementById("overlay-logo");
  if (!logo) return;

  logo.classList.add("show");
  setTimeout(() => logo.classList.remove("show"), 1000);
}

// =====================
// COMMUNITY UNLOCK
// =====================
if (LOCATIONS.every(l => scans[l])) {
  document.getElementById("community-btn")?.classList.add("show");
}

document.getElementById("community-btn")?.addEventListener("click", () => {
  window.location.href = "forum.html";
});
