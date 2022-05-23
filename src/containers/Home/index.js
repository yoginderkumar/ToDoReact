import React, { useRef, useState } from "react";
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

  const inputRef = useRef(null);

  const onHandleChange = (name, value) => {
    switch (name) {
      case "newTask":
        setNewTaskInput(value);
        break;
      default:
        return;
    }
  };

  const onEnterPressedOnTaskInput = (e) => {
    if (e.key === "Enter" && newTaskInput.length) {
      onAddClickHandler();
    }
  };

  const onAddClickHandler = () => {
    const taskData = {
      id: tasks.length + 1,
      title: newTaskInput,
      status: "pending",
    };
    setTasks([taskData, ...tasks]);
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

  const changeTaskToProgress = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, status: "progress" };
        }
        return { ...task };
      })
    );
  };

  const changeTaskToDone = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, status: "done" };
        }
        return { ...task };
      })
    );
  };

  const deleteATask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const focusOnNewTaskInput = () => {
    inputRef.current.focus();
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
            inputRef={inputRef}
            newTaskInput={newTaskInput}
            deleteATask={deleteATask}
            onHandleChange={onHandleChange}
            changeTaskToDone={changeTaskToDone}
            onAddClickHandler={onAddClickHandler}
            focusOnNewTaskInput={focusOnNewTaskInput}
            changeTaskToProgress={changeTaskToProgress}
            onEnterPressedOnTaskInput={onEnterPressedOnTaskInput}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;

/*
{
  id,
  title,
  status: pending | progress | done,
}
*/
