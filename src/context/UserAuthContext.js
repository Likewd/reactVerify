import { useContext, createContext, useEffect, useState } from "react"

import {
  AuthErrorCodes, createUserWithEmailAndPassword, onAuthStateChanged,
  signInWithEmailAndPassword, signOut, getAuth, sendEmailVerification
} from 'firebase/auth'
import { auth, db } from "../firebase.config";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";


const userContext = createContext();
export const useAuth = () => { return useContext(userContext) }


const UserAuthContext = ({ children }) => {
  const[verifyemail,setverify] = useState()
  const [currentuser, setuser] = useState()
  onAuthStateChanged(auth, user => {
    // console.log(user)
    if (user) {
      setuser(user)
      setverify(user.emailVerified)
      console.log(verifyemail +"in mail")
      console.log("u are logging")
    }
    else {
      // alert("u are logout")
    }
  })

  // profile information store

  const profileInformation = (profile) => {
    return addDoc(collection(db, "profile"), profile);
  }

// Login Functinallity

  const UserLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  //logout Functionllity
  const logout = () => {
    return signOut(auth)
  }

  // sign User
  const SignUp = async (email, password) => {

     return  createUserWithEmailAndPassword(auth, email, password);

  }
  const value = {
    SignUp,
    currentuser,
    UserLogin,
    logout,
    profileInformation,
    verifyemail
  }
  return (
    <userContext.Provider value={value}>{children}</userContext.Provider>
  )
}

export default UserAuthContext