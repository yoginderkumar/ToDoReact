import { EditOutlined, LogoutOutlined } from "@ant-design/icons";
import React from "react";
import { ButtonT, UserAvatar } from "../../../components/simpleUI";
import { toUpperCaseStringInitial } from "../../../utils/helperFunctions";

const Profile = ({ user, onClickLogout }) => {
  return (
    <div
      style={{ height: "100%" }}
      className="flex flexColumn alignItemsCenter justifyContentCenter"
    >
      <UserAvatar
        size={100}
        image={user.picture || ""}
        name={user.name ? toUpperCaseStringInitial(user.name) : "U"}
      />
      <div className="flex flexColumn alignItemsCenter justifyContentCenter mt12">
        <h4>{user.name || "TODO User"}</h4>
        <h4>{user.email}</h4>
      </div>
      <div className="flex flexColumn">
        <ButtonT
          type="primary"
          className="mt12"
          text={"Edit Profile"}
          iconAfter={<EditOutlined />}
        />
        <ButtonT
          iconAfter={<LogoutOutlined />}
          type="danger"
          className="mt12"
          text={"Logout"}
          onClick={onClickLogout}
        />
      </div>
    </div>
  );
};

export default Profile;
