// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_GEDQX6TFh78CdlpY-nqbHMahMfsl4GU",
  authDomain: "asd-screen.firebaseapp.com",
  projectId: "asd-screen",
  storageBucket: "asd-screen.appspot.com",
  messagingSenderId: "477106331259",
  appId: "1:477106331259:web:3b0370e41e128c64d10cde"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imgDB = getStorage(app)
const txtDB = getFirestore(app)

export {imgDB,txtDB};