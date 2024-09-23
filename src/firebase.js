import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyD1OhkkF1W0bVMcJVZqh2uEhl3R4qnClrk",
  authDomain: "netflixcloneportfolio-95320.firebaseapp.com",
  projectId: "netflixcloneportfolio-95320",
  storageBucket: "netflixcloneportfolio-95320.appspot.com",
  messagingSenderId: "527174911377",
  appId: "1:527174911377:web:a98f09f2a36883579bc630"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,

        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' ').toUpperCase())
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' ').toUpperCase())
    }
}

const logout = () => {
    signOut(auth)
}

export {auth, db, login, signup, logout};