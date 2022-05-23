import React from "react";
import { Card } from "antd";

const CardT = ({ style, className, children, ...props }) => {
  return (
    <Card style={style} className={className} {...props}>
      {children}
    </Card>
  );
};

export default CardT;
