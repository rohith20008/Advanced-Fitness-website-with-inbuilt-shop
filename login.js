// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Your Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyAt7WMQpkF_Dpbvt8tkEl1zVXy5jQsM2LQ",
    authDomain: "fitnessauth-cc4c9.firebaseapp.com",
    projectId: "fitnessauth-cc4c9",
    storageBucket: "fitnessauth-cc4c9.firebasestorage.app",
    messagingSenderId: "209013397100",
    appId: "1:209013397100:web:c4818d85005d401965ea49",
    measurementId: "G-N8QS7YQZP4"
};

// Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Sign up with email
window.signUp = async function () {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Signup successful!");
    window.location.href = "index.html";
  } catch (error) {
    alert(error.message);
  }
};

// Login with email
window.login = async function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
    window.location.href = "index.html";
  } catch (error) {
    alert(error.message);
  }
};

// Login with Google
window.signInWithGoogle = async function () {
  try {
    await signInWithPopup(auth, provider);
    alert("Google login successful!");
    window.location.href = "index.html";
  } catch (error) {
    alert(error.message);
  }
};

// Logout
window.logout = async function () {
  try {
    await signOut(auth);
    alert("Logged out!");
    window.location.href = "login.html";
  } catch (error) {
    alert(error.message);
  }
};

// Auth state protection (protect index.html)
onAuthStateChanged(auth, (user) => {
  const currentPage = window.location.pathname;
  if (!user && currentPage.includes("index.html")) {
    window.location.href = "login.html";
  }
});
