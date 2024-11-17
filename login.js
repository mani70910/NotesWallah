// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js"; 

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

// Getting all the object of HTML
var email = document.getElementById("email");
var password = document.getElementById("password");

// Validate email format
function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

// Toggle password visibility
document.getElementById("eye").addEventListener("click", function() {
    var passwordInput = document.getElementById("password");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";  // Show password
    } else {
        passwordInput.type = "password";  // Hide password
    }
});

// Login function
window.login = function(e) {
    e.preventDefault();
    var emailValue = email.value;
    var passwordValue = password.value;

    // Validate email format
    if (!isValidEmail(emailValue)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Check if email and password are empty
    if (emailValue === "" || passwordValue === "") {
        alert("Please fill in both email and password.");
        return false;
    } else if (passwordValue.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }

    // Sign in with Firebase
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
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Login Error Code:", errorCode);
            console.error("Login Error Message:", errorMessage);

            // Show error message in the UI
            document.getElementById("error-message").textContent = errorMessage;

            if (errorCode === "auth/user-not-found" || errorCode === "auth/wrong-password") {
                alert("Wrong email or password. Please try again.");
            } else {
                alert("Error: " + errorMessage);
            }
        });
}

// Forgot password function
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
