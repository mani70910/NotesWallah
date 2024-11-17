// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js"; // Import from firebase-auth module
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
var fullname = document.getElementById("name")
var email = document.getElementById("email")
var password = document.getElementById("password")



// making an function for storing data
window.signup = function(e) {
    e.preventDefault();

    var obj = {
        fullname: fullname.value,
        email: email.value,
        password: password.value,
    }
    createUserWithEmailAndPassword(auth, obj.email, obj.password)
        .then(function(userCredential) {
            // Signup Successful
            const user = userCredential.user;

            // Send email verification
            sendEmailVerification(user)
                .then(function() {
                    alert("Signup Successful. Verification email sent.");
                })
                .catch(function(error) {
                    alert("Error sending verification email: " + error.message);
                });
        })
        .catch(function(error) {
            alert("Error signing up: " + error.message);
        });

    console.log(obj);
};
