import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
  updateDoc,
  getDocs,
  collection,
  deleteDoc,
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

export const checkIfUserExist = async (uid) => {
  const docRef = doc(database, "Users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return true;
  } else {
    return false;
  }
};

export const addUserInDatabase = async (uid, data) => {
  try {
    return await setDoc(doc(database, "Users", uid), {
      ...data,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const addTaskInDatabase = async (uid, task) => {
  try {
    return await setDoc(doc(database, `Users/${uid}/tasks`, `${task.id}`), {
      ...task,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const updateTaskTitleInDatabase = async (uid, taskId, title) => {
  try {
    return await updateDoc(doc(database, `Users/${uid}/tasks`, `${taskId}`), {
      title,
    });
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const updateTaskStatusInDatabase = async (uid, taskId, status) => {
  try {
    return await updateDoc(doc(database, `Users/${uid}/tasks`, `${taskId}`), {
      status,
    });
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const getUserTasksFromFirebase = async (uid) => {
  try {
    let userTasks = [];
    await (
      await getDocs(collection(database, `Users/${uid}/tasks`))
    ).forEach((doc) => {
      userTasks.push({ ...doc.data() });
    });
    return userTasks.reverse();
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const deleteATaskInFirebase = async (uid, taskId) => {
  await deleteDoc(doc(database, `Users/${uid}/tasks`, `${taskId}`));
};

export default firebase;
