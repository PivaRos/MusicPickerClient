import React from "react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface BottomTabProps {
  Icon: IconType;
  Pagelink: string;
  title: string;
}

export const BottomTab = ({ Pagelink, Icon, title }: BottomTabProps) => {
  return (
    <Link to={Pagelink}>
      <div className="bottom_tab">
        <Icon height={"100px"} width={"100px"} />
        <label className="label-bottom-tab">{title}</label>
      </div>
    </Link>
  );
};
