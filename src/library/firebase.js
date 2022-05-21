import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserWithEmailPassword = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);
export const signInWithEmailPassword = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const signOutUser = () => auth.signOut();

//DATABASE OPERATIONS
const database = getFirestore(firebase.initializeApp(firebaseConfig));

export const addUserInDatabase = async (uid, email) => {
  try {
    return await setDoc(doc(database, "Users", uid), {
      email,
      createdAt: serverTimestamp()
    });
  } catch (err) {
    console.log("Err: ", err);
  }
};

export default firebase;
