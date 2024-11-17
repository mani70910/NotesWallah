// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js"; // Import from firebase-auth module
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
