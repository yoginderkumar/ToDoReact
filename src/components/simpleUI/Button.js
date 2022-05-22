import { Button } from "antd";
import React from "react";

const ButtonT = ({
  text,
  type,
  iconBefore,
  iconAfter,
  onClick,
  className,
  ...props
}) => {
  return (
    <Button
      type={type || "default"}
      onClick={onClick}
      className={className}
      {...props}
    >
      {iconBefore}
      {text}
      {iconAfter}
    </Button>
  );
};

export default ButtonT;
