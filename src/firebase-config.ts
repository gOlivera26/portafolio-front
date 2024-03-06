import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {

  apiKey: "AIzaSyDbXX_QvBmnVp_STSeto3rLPDXrJVgaaBE",

  authDomain: "myresumen-portafolio.firebaseapp.com",

  projectId: "myresumen-portafolio",

  storageBucket: "myresumen-portafolio.appspot.com",

  messagingSenderId: "853640542713",

  appId: "1:853640542713:web:8a9a0e5fdff729861b2528",

  measurementId: "G-G6BWXHZ1B1"

};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);