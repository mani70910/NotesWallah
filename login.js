// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js"; // Import from firebase-auth module
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
     apiKey: "AIzaSyA81vbeDhclxr3OiDOgtcamqJ3JPq7WzOQ",
  authDomain: "notes-wallah-project.firebaseapp.com",
  databaseURL: "https://notes-wallah-project-default-rtdb.firebaseio.com",
  projectId: "notes-wallah-project",
  storageBucket: "notes-wallah-project.firebasestorage.app",
  messagingSenderId: "666851075166",
  appId: "1:666851075166:web:b1fe9eb2a0825e52c5c0cf",
  measurementId: "G-H40FPG7NPE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// Getting All the object of html

var email = document.getElementById("email")
var password = document.getElementById("password")

window.login = function(e) {
    e.preventDefault();
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var errorMessage = document.getElementById("error-message"); // Get the error message element
    var obj = {
        email: email.value,
        password: password.value
    };

    // Check if email and password are empty

    if (obj.email == null || obj.password == "") {
        alert("please fill below details");
        return false;
    } else if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }


    signInWithEmailAndPassword(auth, obj.email, obj.password)
        .then((userCredential) => {
            // User is signed in.
            const user = userCredential.user;
            if (user.emailVerified) {
                console.log("Logged in: " + user.email);
                // Redirect to homepage.html or perform other actions here.
                window.location.href = "homepage.html";
            } else {
                alert("Email not verified. Please check your email for verification.");
            }
        })
        .catch((error) => {
            // Handle errors
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === "auth/user-not-found" || errorCode === "auth/wrong-password") {
                alert("Wrong email and password combination. Please try again.");
            } else {
                alert(errorMessage);
            }
        });
}
window.forgotPassword = function() {
    var email = document.getElementById("email").value;
    if (email) {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Password reset email sent. Please check your email.");
            })
            .catch((error) => {
                alert("Error sending password reset email: " + error.message);
            });
    } else {
        alert("Please enter your email to reset the password.");
    }
}
