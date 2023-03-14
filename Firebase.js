import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAiluNt-dyX4g9FktDOHnCKFR_T0nh6Gdk",
    authDomain: "booking-app-602ef.firebaseapp.com",
    databaseURL: "https://booking-app-602ef-default-rtdb.firebaseio.com",
    projectId: "booking-app-602ef",
    storageBucket: "booking-app-602ef.appspot.com",
    messagingSenderId: "303465012338",
    appId: "1:303465012338:web:c1c9f9dd393163231e36eb"
  };


  export const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);
  export const authentication = getAuth(app);