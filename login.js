// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js"; // Import from firebase-auth module
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCLwUH8pn8aAxDQqXGjeZVTlwKyokLTaXI",
    authDomain: "notes-7cbac.firebaseapp.com",
    projectId: "notes-7cbac",
    storageBucket: "notes-7cbac.firebasestorage.app",
    messagingSenderId: "721820600508",
    appId: "1:721820600508:web:4f90bde22e5821cf61a8b9",
    measurementId: "G-TBG0RTZWJP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Getting All the object of html
var email = document.getElementById("email");
var password = document.getElementById("password");

window.login = function(e) {
    e.preventDefault();
    var emailValue = email.value;
    var passwordValue = password.value;
    var errorMessage = document.getElementById("error-message"); // Get the error message element

    // Check if email and password are empty
    if (emailValue == "" || passwordValue == "") {
        alert("Please fill in both email and password.");
        return false;
    } else if (passwordValue.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }

    signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
            const user = userCredential.user;
            if (user.emailVerified) {
                console.log("Logged in: " + user.email);
                window.location.href = "homepage.html"; // Redirect to homepage
            } else {
                alert("Email not verified. Please check your email for verification.");
            }
        })
        .catch((error) => {
            console.error("Login Error Code:", error.code);
            console.error("Login Error Message:", error.message);
            if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                alert("Wrong email or password. Please try again.");
            } else {
                alert(error.message);
            }
        });
}

window.forgotPassword = function() {
    var emailValue = document.getElementById("email").value;
    if (emailValue) {
        sendPasswordResetEmail(auth, emailValue)
            .then(() => {
                alert("Password reset email sent. Please check your inbox.");
            })
            .catch((error) => {
                console.error("Error sending password reset email:", error.message);
                alert("Error sending password reset email: " + error.message);
            });
    } else {
        alert("Please enter your email to reset the password.");
    }
}
