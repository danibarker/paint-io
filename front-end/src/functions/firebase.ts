// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBrzqmBHsiSHZVIp_yTtB1lwOTIGUDbq4Q",
    authDomain: "paint-io-app.firebaseapp.com",
    projectId: "paint-io-app",
    storageBucket: "paint-io-app.appspot.com",
    messagingSenderId: "632657608880",
    appId: "1:632657608880:web:bee2a194ed68a02e4d3b75",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
