// Import the functions you need from the Firebase SDK
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js"; 

// Initialize Firebase with your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyACjk_6IpSuE30D2S0_kjTE6fdbQelY2Rs",
    authDomain: "noteswallah-3c7d5.firebaseapp.com",
    projectId: "noteswallah-3c7d5",
    storageBucket: "noteswallah-3c7d5.firebasestorage.app",
    messagingSenderId: "452106121683",
    appId: "1:452106121683:web:9ee83f0f8096d302967f26",
    measurementId: "G-KNZ16J7GMW"
};

// Initialize Firebase app and get auth instance
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get references to the email, password, and error message DOM elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMessageElement = document.getElementById("error-message");

// Validate email format
function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

// Toggle password visibility
document.getElementById("eye").addEventListener("click", function() {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";  // Show password
    } else {
        passwordInput.type = "password";  // Hide password
    }
});

// Login function
window.login = function(e) {
    e.preventDefault();

    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    // Validate email format
    if (!isValidEmail(emailValue)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Check if email and password are provided and password length
    if (emailValue === "" || passwordValue === "") {
        alert("Please fill in both email and password.");
        return;
    }
    if (passwordValue.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    // Sign in with Firebase Authentication
    signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
            const user = userCredential.user;
            if (user.emailVerified) {
                // Redirect to homepage after successful login
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

            // Display the error message to the user
            errorMessageElement.textContent = errorMessage;

            // Provide specific error feedback
            if (errorCode === "auth/user-not-found" || errorCode === "auth/wrong-password") {
                alert("Wrong email or password. Please try again.");
            } else {
                alert("Error: " + errorMessage);
            }
        });
};

// Forgot password function
window.forgotPassword = function() {
    const emailValue = emailInput.value;

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
};
