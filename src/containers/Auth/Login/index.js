import React from "react";
import { Card, Input } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import "./style.css";

const Login = () => {
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
            <Input type="email" placeholder="Enter email" />
            <Input.Password
              placeholder="input password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              className="mt12"
            />
          </div>
        </div>
        <div className="flex flexRow alignItemsCenter justifyContentCenter mv12">
          <hr style={{ flex: 0.45 }} />
          <h3>or</h3>
          <hr style={{ flex: 0.45 }} />
        </div>
      </Card>
    </div>
  );
};

export default Login;
