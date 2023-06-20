import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyANimYYlakF6OcgWXnR95X2ps5H4VAVQ3Q",
    authDomain: "typing-test-website-c1d31.firebaseapp.com",
    projectId: "typing-test-website-c1d31",
    storageBucket: "typing-test-website-c1d31.appspot.com",
    messagingSenderId: "109773557920",
    appId: "1:109773557920:web:509898b12f9d761adbf9c5",
    measurementId: "G-18KCBHGWQN"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export {auth, db}