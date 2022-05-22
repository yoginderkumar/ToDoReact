import { showMessage } from "../library/messages";

export const isEmailValid = (email) => {
  const regExForEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExForEmail.test(email);
};

//Firebase error handling
export const handleErrorFromEmailLogin = (code, message) => {
  switch (code) {
    case "auth/user-not-found":
      return showMessage("error", "This account does not exist. Create one!");
    case "auth/wrong-password":
      return showMessage("error", "Entered incorrect password");
    default:
      return showMessage("error", message);
  }
};


const testHelper = () => {
  console.log('Hello world')
}