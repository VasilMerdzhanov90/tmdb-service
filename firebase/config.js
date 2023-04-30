const firebase = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const donetv = require("dotenv").config();

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL:
    "https://movie-app-ba9f8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

const appFirestore = firebase.initializeApp(config);
const db = getFirestore(appFirestore);

module.exports = { appFirestore, db };
