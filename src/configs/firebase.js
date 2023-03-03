// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyB79V0WoGtVFcZnRuIleJf6o5H50CK2W_8',
    authDomain: 'thue-do-1a73c.firebaseapp.com',
    projectId: 'thue-do-1a73c',
    storageBucket: 'thue-do-1a73c.appspot.com',
    messagingSenderId: '781480839055',
    appId: '1:781480839055:web:87258ec9fbc20e292e2dfa',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
