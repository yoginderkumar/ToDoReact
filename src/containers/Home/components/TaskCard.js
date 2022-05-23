import React from "react";
import { Tooltip } from "antd";
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { CardT } from "../../../components/simpleUI";

const TaskCard = ({
  task,
  deleteATask,
  changeTaskToDone,
  changeTaskToProgress,
}) => {
  console.log("Task: ", task);
  return (
    <CardT
      hoverable
      style={{ padding: 0 }}
      className={`mv24 ${
        task.status === "pending"
          ? "yellowGradientBg"
          : task.status === "done"
          ? "greenGradient"
          : "blueGradientBg"
      } br5`}
    >
      <div className="flex flexRow alignItemsCenter justifyContentSpaceBet">
        <h1
          className={`f18 poppinsBold ${
            task.status === "done" ? "strikeThrough" : ""
          }`}
        >
          {task.title}
        </h1>
        <div
          style={{ marginBottom: 6 }}
          className="flex flexRow alignItemsCenter justifyContentCenter"
        >
          {task.status === "pending" ? (
            <Tooltip placement="top" title={"To move your task in progress"}>
              <PlayCircleOutlined
                className="f18"
                onClick={() => changeTaskToProgress(task.id)}
              />
            </Tooltip>
          ) : task.status === "progress" ? (
            <Tooltip placement="top" title={"To mark your task done!!"}>
              <CheckOutlined
                className="f18"
                onClick={() => changeTaskToDone(task.id)}
              />
            </Tooltip>
          ) : null}

          <Tooltip placement="top" title={"To edit your task."}>
            <EditOutlined className="f18 mh12" />
          </Tooltip>
          <Tooltip placement="top" title={"To delete your task!"}>
            <DeleteOutlined
              className="f18 errorColor"
              onClick={() => deleteATask(task.id)}
            />
          </Tooltip>
        </div>
      </div>
    </CardT>
  );
};

export default TaskCard;
