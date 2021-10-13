import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCO9tBk8l9JvAuOMo2KkS_10WGeWGSQoY0",
  authDomain: "ecotripulantes.firebaseapp.com",
  projectId: "ecotripulantes",
  storageBucket: "ecotripulantes.appspot.com",
  messagingSenderId: "647589280456",
  appId: "1:647589280456:web:806bc9a766c526b3be03fd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export class ManageAccount{
    register(email, password) {
        createUserWithEmailAndPassword(getAuth(), email, password)
            .then((_) => {
            window.location.href = "chat.html";
        })
            .catch((error) => {
            console.error(error.message);
        }); 
    }

    authenticate(email, password) {
        signInWithEmailAndPassword(getAuth(), email, password)
            .then((_) => {
            window.location.href = "chat.html";
        })
            .catch((error) => {
            console.error(error.message);
        });
    }

    signOut() {
        signOut(getAuth())
            .then((_) => {
            window.location.href = "index.html";
        })
            .catch((error) => {
            console.error(error.message);
        });
    }
}