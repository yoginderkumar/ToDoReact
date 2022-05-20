import { Button } from "antd";
import React from "react";

const ButtonT = ({ text, onClick }) => {
  return <Button onClick={onClick}>{text}</Button>;
};

export default ButtonT;
