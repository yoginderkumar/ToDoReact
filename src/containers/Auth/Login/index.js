import React, { useEffect, useState } from "react";
import { Button, Card, Input } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import "./style.css";
import {
  signInWithEmailPassword,
  createUserWithEmailPassword,
  signInWithGoogle,
} from "../../../library";
import { showMessage } from "../../../library/messages";
import { isEmailValid } from "../../../utils/helperFunctions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignupEnabled, setIsSignupEnabled] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  useEffect(() => {
    if (email.length) {
      const isValidEmail = isEmailValid(email);
      setValidationError({
        ...validationError,
        emailError: isValidEmail ? "" : "Enter a valid email!",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  useEffect(() => {
    if (isSignupEnabled && confirmPassword.length) {
      setValidationError({
        ...validationError,
        confirmPasswordError:
          password !== confirmPassword
            ? "Enter password matching above entered password"
            : "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmPassword]);

  const handleErrorFromEmailLogin = (code, message) => {
    switch (code) {
      case "auth/user-not-found":
        setIsSignupEnabled(true);
        return showMessage("error", "This account does not exist. Create one!");
      case "auth/wrong-password":
        return showMessage("error", "Entered incorrect password");
      default:
        return showMessage("error", message);
    }
  };

  const onLoginClickHandler = async () => {
    if (isSignupEnabled) {
      createUserWithEmailPassword(email, password)
        .then((data) => {
          console.log("Data: ", data);
        })
        .catch((err) => {
          console.log("err ", err);
          handleErrorFromEmailLogin(err.code, err.message);
        });
    } else {
      signInWithEmailPassword(email, password)
        .then((data) => console.log("Data: ", data.user))
        .catch((err) => {
          console.log("Err: ", err.code);
          handleErrorFromEmailLogin(err.code, err.message);
        });
    }
  };

  const onLoginWithGoogleClickHandler = () => {
    console.log("Hello");
    setIsGoogleLoading(true);
    signInWithGoogle()
      .then((data) => {
        console.log("Data: ", data);
      })
      .catch((err) => {
        showMessage("error", err.message);
      })
      .finally(() => {
        setIsGoogleLoading(false);
      });
  };

  return (
    <div className="LoginPageContainer">
      <Card
        style={{ flex: 0.6 }}
        className="br10 flex justifyContentCenter"
        hoverable
      >
        <h2 className="poppinsBold flex justifyContentCenter">Login...</h2>
        <div className="flex justifyContentCenter">
          <div>
            <Input
              value={email}
              status={
                validationError.emailError && validationError.emailError.length
                  ? "error"
                  : ""
              }
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Enter email"
            />
            <Input.Password
              value={password}
              placeholder="enter password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={(e) => setPassword(e.target.value)}
              className="mt12"
            />
            {isSignupEnabled && (
              <Input.Password
                value={confirmPassword}
                status={
                  validationError.confirmPasswordError &&
                  validationError.confirmPasswordError.length
                    ? "error"
                    : ""
                }
                placeholder="confirm password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                className="mt12"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}

            <div className="mv12 errorText">
              {validationError.emailError &&
              validationError.emailError.length ? (
                <p>{validationError.emailError}</p>
              ) : validationError.confirmPasswordError &&
                validationError.confirmPasswordError.length ? (
                <p>{validationError.confirmPasswordError}</p>
              ) : null}
            </div>

            <Button
              type="primary"
              className="width100"
              onClick={onLoginClickHandler}
              disabled={
                !email || !password || (isSignupEnabled && !confirmPassword)
              }
            >
              {isSignupEnabled ? "Create an account" : "Login"}
            </Button>
          </div>
        </div>
        <div className="flex flexRow alignItemsCenter justifyContentCenter mv12">
          <hr style={{ flex: 0.45 }} />
          <h3>or</h3>
          <hr style={{ flex: 0.45 }} />
        </div>
        <Button
          type="primary"
          className="width100"
          loading={isGoogleLoading}
          onClick={onLoginWithGoogleClickHandler}
        >
          Login with google
        </Button>
      </Card>
    </div>
  );
};

export default Login;
