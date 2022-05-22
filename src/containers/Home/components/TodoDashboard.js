import { PlusOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React from "react";
import { ButtonT } from "../../../components/simpleUI";

const TodoDashboard = ({
  tasks,
  newTaskInput,
  onHandleChange,
  onAddClickHandler,
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
          value={newTaskInput}
          onChange={(e) => onHandleChange("newTask", e.target.value)}
          placeholder="Description (optional)"
          className="mr24"
        />
        <ButtonT
          type="primary"
          text="Add"
          disabled={!newTaskInput}
          iconAfter={<PlusOutlined />}
          onClick={onAddClickHandler}
        />
      </div>
      <div>
        {tasks.length
          ? tasks.map((task, index) => <div key={index}>task</div>)
          : null}
      </div>
    </div>
  );
};

export default TodoDashboard;
