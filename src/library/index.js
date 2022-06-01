import {
  signOutUser,
  firebaseConfig,
  signInWithGoogle,
  addUserInDatabase,
  checkIfUserExist,
  signInWithEmailPassword,
  createUserWithEmailPassword,
  addTaskInDatabase,
  deleteATaskInFirebase,
  getUserTasksFromFirebase,
  updateTaskTitleInDatabase,
  updateTaskStatusInDatabase,
} from "./firebase";

export {
  signOutUser,
  firebaseConfig,
  checkIfUserExist,
  signInWithGoogle,
  addUserInDatabase,
  addTaskInDatabase,
  deleteATaskInFirebase,
  signInWithEmailPassword,
  getUserTasksFromFirebase,
  updateTaskTitleInDatabase,
  updateTaskStatusInDatabase,
  createUserWithEmailPassword,
};
