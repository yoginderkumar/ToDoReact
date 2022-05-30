import { PlusOutlined, CheckOutlined } from "@ant-design/icons";
import { Empty, Input } from "antd";
import React from "react";
import TaskCard from "./TaskCard";
import { ButtonT } from "../../../components/simpleUI";

const TodoDashboard = ({
  tasks,
  inputRef,
  newTaskInput,
  isEditEnabled,
  deleteATask,
  onHandleChange,
  changeTaskToDone,
  onAddClickHandler,
  onEditClickHandler,
  focusOnNewTaskInput,
  onCancelSaveChanges,
  changeTaskToProgress,
  onEnterPressedOnTaskInput,
  onSaveChangesClickHandler,
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
          text={isEditEnabled ? "Save changes" : "Add"}
          disabled={!newTaskInput}
          iconAfter={isEditEnabled ? <CheckOutlined /> : <PlusOutlined />}
          onClick={
            isEditEnabled ? onSaveChangesClickHandler : onAddClickHandler
          }
        />
        {isEditEnabled && (
          <ButtonT
            text={"Cancel"}
            disabled={!newTaskInput}
            onClick={onCancelSaveChanges}
            style={{ marginLeft: 16 }}
          />
        )}
      </div>
      <div>
        {tasks.length ? (
          tasks.map((task, index) => (
            <TaskCard
              key={index}
              task={task}
              deleteATask={deleteATask}
              changeTaskToDone={changeTaskToDone}
              onEditClickHandler={onEditClickHandler}
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
