import { PlusOutlined } from "@ant-design/icons";
import { Empty, Input } from "antd";
import React from "react";
import TaskCard from "./TaskCard";
import { ButtonT } from "../../../components/simpleUI";

const TodoDashboard = ({
  tasks,
  inputRef,
  newTaskInput,
  deleteATask,
  onHandleChange,
  changeTaskToDone,
  onAddClickHandler,
  focusOnNewTaskInput,
  changeTaskToProgress,
  onEnterPressedOnTaskInput,
}) => {
  return (
    <div className="todoDashboardContainer">
      <div className="flex">
        <Input
          ref={inputRef}
          value={newTaskInput}
          onChange={(e) => onHandleChange("newTask", e.target.value)}
          placeholder="Add a new task"
          className="mr24"
          onKeyDown={(e) => onEnterPressedOnTaskInput(e)}
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
        {tasks.length ? (
          tasks.map((task, index) => (
            <TaskCard
              key={index}
              task={task}
              deleteATask={deleteATask}
              changeTaskToDone={changeTaskToDone}
              changeTaskToProgress={changeTaskToProgress}
            />
          ))
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <p>
                No tasks added yet!{" "}
                <a onClick={focusOnNewTaskInput}> add now</a>
              </p>
            }
          />
        )}
      </div>
    </div>
  );
};

export default TodoDashboard;
