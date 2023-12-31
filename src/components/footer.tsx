import React from "react";
import "../index.css";
import { MdQueue } from "react-icons/md";
import { PiQueueBold } from "react-icons/pi";
import { MdHowToVote } from "react-icons/md";
import { MdOutlineSelfImprovement } from "react-icons/md";
import { BottomTab } from "./bottomTab";
import { appConfig } from "../interfaces";

interface FooterProps {
  appConfig: appConfig;
}

const Footer: React.FC<FooterProps> = ({ appConfig }: FooterProps) => {
  return (
    <div className="footer-container">
      <div className="footer">
        <BottomTab Pagelink="queue/add" title="הוספה" Icon={MdQueue} />
        <BottomTab Pagelink="queue/" title="הרשימה" Icon={PiQueueBold} />
        {appConfig.enableVotes === "true" && (
          <BottomTab Pagelink="vote/" title="הצבעות" Icon={MdHowToVote} />
        )}
      </div>
    </div>
  );
};

export default Footer;
