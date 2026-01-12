import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyASx07fiZTpcgMaM24rXVkPMkCXWKEVEEQ",
    authDomain: "ridetracker-2068e.firebaseapp.com",
    projectId: "ridetracker-2068e",
    storageBucket: "ridetracker-2068e.firebasestorage.app",
    messagingSenderId: "860926377260",
    appId: "1:860926377260:web:3a858385f25073a94cc089",
    measurementId: "G-Y3JQ8RXZ6G"
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
