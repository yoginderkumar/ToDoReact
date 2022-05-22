import { PlusOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React from "react";
import { ButtonT } from "../../../components/simpleUI";
import TaskCard from "./Card";

const TodoDashboard = ({

  tasks,
  newTaskInput,
  onHandleChange,
  onAddClickHandler,
  onHandleDiscChange,
  newTaskDisc,
  ondelHandler,
  onEditUser,
  btnState,
  getTaskStatus,
}) => {
  return (
    <div className="todoDashboardContainer">
      <div className="flex">
        <Input
          value={newTaskInput}
          onChange={(e) => onHandleChange("newTask", e.target.value)}
          placeholder="Add a new task"
          className="mr24"
        />
        <Input
          value={newTaskDisc}
          onChange={(e) => onHandleDiscChange("newTaskDisc", e.target.value)}
          placeholder="Description (optional)"
          className="mr24"
        />
        <ButtonT
          type="primary"
          text={btnState ? 'Save Changes' : 'Add'}
          disabled={!newTaskInput}
          iconAfter={<PlusOutlined />}
          onClick={onAddClickHandler}
        />
      </div>
      <div>
        {tasks.length
          ? tasks.map((task, index) => <TaskCard data={task} key={index} ondelHandler={ondelHandler} onEditUser={onEditUser} getTaskStatus={getTaskStatus} />)
          : null}
      </div>
    </div>
  );
};

export default TodoDashboard;
