import React, { useState } from "react";
import { Button, Card, Input } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import "./style.css";
import { signInWithEmailPassword, signInWithGoogle } from "../../../library";
import { showMessage } from "../../../library/messages";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignupEnabled, setIsSignupEnabled] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

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
    signInWithEmailPassword("abhisheksagar25100@gmail.com", "Abhishek@12")
      .then((data) => console.log("Data: ", data.user))
      .catch((err) => {
        console.log("Err: ", err.code);
        handleErrorFromEmailLogin(err.code, err.message);
      });
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

  console.log("Isgoolge loding", isGoogleLoading);

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
              onChange={(e) => setEmail(e.target.value)}
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
                placeholder="confirm password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                className="mt12"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
            <Button
              type="primary"
              className="width100 mt12"
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
