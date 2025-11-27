
// 1. Detect QR code parameter
const urlParams = new URLSearchParams(window.location.search);
const scanned = urlParams.get("loc");

// 2. Load scan history from localStorage
let scans = JSON.parse(localStorage.getItem("scans")) || {};

// 3. If a QR code was scanned, mark it in localStorage and show prompt
if (scanned) {
  scans[scanned] = true;
  localStorage.setItem("scans", JSON.stringify(scans));
  showPrompt(`prompt-${scanned}`);
}

// 4. Activate all markers that have been scanned
Object.keys(scans).forEach(loc => activateMarker(loc));

// 5. Function to turn a marker green
function activateMarker(loc) {
  const marker = document.querySelector(`.marker-${loc}`);
  if (marker) marker.classList.add("scanned");
}

// 6. Function to show the prompt screen with fade-out on tap
function showPrompt(id) {
  const prompt = document.getElementById(id);
  if (!prompt) return;

  // Show the prompt
  prompt.style.display = "flex";

  // Close when clicking/tapping anywhere
  prompt.addEventListener("click", () => {
    prompt.classList.add("hidden"); // fade out
    setTimeout(() => prompt.style.display = "none", 800); // remove after fade
  });
}

