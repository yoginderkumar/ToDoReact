import React from "react";
import { ButtonT, UserAvatar } from "../../../components/simpleUI";

const Profile = ({ onClickLogout }) => {
  return (
    <div
      style={{ height: "100%" }}
      className="flex flexColumn alignItemsCenter justifyContentCenter"
    >
      <UserAvatar
        size={100}
        image="https://images.indianexpress.com/2022/04/kgf-2-1200.jpeg"
      />
      <ButtonT text={"Logout"} onClick={onClickLogout} />
    </div>
  );
};

export default Profile;
