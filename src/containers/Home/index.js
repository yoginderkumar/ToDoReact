import React, { useEffect, useState } from "react";
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
  const [newTaskInput, setNewTaskInput] = useState('');
  const [newTaskDisc, setNewTaskDisc] = useState('');
  const [curTask, setCurTask] = useState({})
  const [btnState, setBtnState] = useState(false)
  const [taskStatus, setTaskStatus] = useState('')





  const onEditUser = (task) => {
    setCurTask(task)
    setBtnState(true)
    setNewTaskInput(curTask.TaskTitle)
    setNewTaskDisc(curTask.TaskDisc)
    console.log(btnState)
  }
  console.log(curTask)
  const onDelUser = (task) => {

    setCurTask(task)
    setTasks(tasks.filter(Todo => Todo !== task))
  }


  const onHandleChange = (name, value) => {
    switch (name) {
      case "newTask":
        setNewTaskInput(value);
        break;
      default:
        return;
    }
  };

  const onHandleDiscChange = (name, value) => {
    switch (name) {
      case "newTaskDisc":
        setNewTaskDisc(value);
        break;
      default:
        return;
    }
  };
  const onAddClickHandler = () => {
    if (!btnState) {
      setTasks([{ TaskTitle: newTaskInput, TaskDisc: newTaskDisc }, ...tasks]);
      setNewTaskInput("");
      setNewTaskDisc("");
    }
    else {
      setBtnState(false)
      curTask.TaskTitle = newTaskInput;
      curTask.TaskDisc = newTaskDisc;
      setNewTaskInput("");
      setNewTaskDisc("");
      setTasks(tasks.filter(tasks => tasks = curTask))
      return tasks

    }

  };


  const getTaskStatus = (taskStats) => {
    setTaskStatus(taskStats)

    if (taskStatus == 'In Progress') {
      console.log('Blue')
    }

    else {
      console.log('green')

    }

  }

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
            newTaskDisc={newTaskDisc}
            onHandleChange={onHandleChange}
            onAddClickHandler={onAddClickHandler}
            onHandleDiscChange={onHandleDiscChange}
            ondelHandler={onDelUser}
            onEditUser={onEditUser}
            btnState={btnState}
            getTaskStatus={getTaskStatus}

          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
