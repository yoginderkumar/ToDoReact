import React from "react";
import { Layout } from "antd";
import { Profile } from "./components";
import { signOutUser } from "../../library";
import { handleErrorFromEmailLogin } from "../../utils/helperFunctions";

const { Header, Footer, Sider, Content } = Layout;

const Home = () => {
  const onClickLogout = () => {
    signOutUser()
      .then((data) => console.log("Data: ", data))
      .catch((err) => {
        handleErrorFromEmailLogin(err.code, err.message);
      });
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        width={300}
        className="whiteBgColor"
        style={{ borderRight: "2px solid #b2bec3" }}
      >
        <Profile onClickLogout={onClickLogout} />
      </Sider>
      <Layout>
        <Header>Header</Header>
        <Content className="whiteBgColor">Content</Content>
      </Layout>
    </Layout>
  );
};

export default Home;
