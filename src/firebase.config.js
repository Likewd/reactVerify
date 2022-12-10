import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyDjDnpd7M3WNkV16_S7pdhR0H-tho3CrL4",
    authDomain: "auth-e9113.firebaseapp.com",
    projectId: "auth-e9113",
    storageBucket: "auth-e9113.appspot.com",
    messagingSenderId: "77716144432",
    appId: "1:77716144432:web:726aefdbaa95b884fa88f5"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app);
export {
    db,
    auth,
    storage
}