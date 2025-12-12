// forum.js - Earthy color sticky note forum

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Firebase imports
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKQOL2ek5inD7ZKAbkL5KYX6IxMQDhxpM",
  authDomain: "hiddenneighbourhoodforum.firebaseapp.com",
  projectId: "hiddenneighbourhoodforum",
  storageBucket: "hiddenneighbourhoodforum.firebasestorage.app",
  messagingSenderId: "822389042504",
  appId: "1:822389042504:web:b5f2a900dc588336e2577d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
  
  // Earthy colour palette
  const earthyColors = [
    "#A47551", // warm brown
    "#C2B280", // sand
    "#8B6F47", // olive brown
    "#A7A99E", // sage grey
    "#D4A373", // clay
    "#6B705C", // deep moss
    "#CB997E", // terracotta
    "#B7B7A4"  // soft stone
  ];
  
  function randomEarthyColor() {
    return earthyColors[Math.floor(Math.random() * earthyColors.length)];
  }
  
  // Submit a new note
  const form = document.getElementById('noteForm');
  const noteInput = document.getElementById('noteInput');
  const notesContainer = document.getElementById('notes');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = noteInput.value.trim();
    if (!text) return;
  
    await db.collection('notes').add({
      text,
      color: randomEarthyColor(),
      timestamp: Date.now()
    });
  
    noteInput.value = "";
  });
  
  // Display notes in real time
  db.collection('notes')
    .orderBy('timestamp', 'desc')
    .onSnapshot((snapshot) => {
      notesContainer.innerHTML = "";
  
      snapshot.forEach((doc) => {
        const data = doc.data();
        const note = document.createElement('div');
        note.className = 'note';
        note.style.background = data.color;
        note.textContent = data.text;
        notesContainer.appendChild(note);
      });
    });
  
  // Optional: simple style for floating earthy notes
  document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
      #notes {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
      }
      .note {
        padding: 12px 14px;
        border-radius: 8px;
        width: fit-content;
        max-width: 260px;
        font-family: "Inter", sans-serif;
        color: #2b2b2b;
        box-shadow: 0 3px 6px rgba(0,0,0,0.15);
        animation: fadeIn 0.4s ease;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(4px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  });
  
