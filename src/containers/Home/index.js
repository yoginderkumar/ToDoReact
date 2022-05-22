import React, { useState } from "react";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { Profile, TodoDashboard, DashboardHeader } from "./components";
import { signOutUser } from "../../library";
import { handleErrorFromEmailLogin } from "../../utils/helperFunctions";
import "./components/style.css";

const { Header, Sider, Content } = Layout;

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [tasks, setTasks] = useState([]);
  const [newTaskInput, setNewTaskInput] = useState("");

  const onHandleChange = (name, value) => {
    switch (name) {
      case "newTask":
        setNewTaskInput(value);
        break;
      default:
        return;
    }
  };

  const onAddClickHandler = () => {
    setTasks([newTaskInput, ...tasks]);
    setNewTaskInput("");
  };

  const onClickLogout = () => {
    signOutUser()
      .then((data) => {
        localStorage.removeItem("user");
        navigate("/");
      })
      .catch((err) => {
        handleErrorFromEmailLogin(err.code, err.message);
      });
  };

  console.log("Add: ", tasks);

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        width={300}
        className="whiteBgColor"
        style={{ borderRight: "2px solid #b2bec3" }}
      >
        <Profile user={user} onClickLogout={onClickLogout} />
      </Sider>
      <Layout>
        <Header>
          <DashboardHeader />
        </Header>
        <Content className="whiteBgColor">
          <TodoDashboard
            tasks={tasks}
            newTaskInput={newTaskInput}
            onHandleChange={onHandleChange}
            onAddClickHandler={onAddClickHandler}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
