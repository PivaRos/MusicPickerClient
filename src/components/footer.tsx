import React from "react";
import "../index.css";
import { MdQueue } from "react-icons/md";
import { PiQueueBold } from "react-icons/pi";
import { MdHowToVote } from "react-icons/md";
import { MdOutlineSelfImprovement } from "react-icons/md";
import { BottomTab } from "./bottomTab";

const Footer: React.FC<{}> = () => {
  return (
    <div className="footer-container">
      <div className="footer">
        <BottomTab
          Pagelink="my/queue"
          title="הרשימה שלי"
          Icon={MdOutlineSelfImprovement}
        />
        <BottomTab Pagelink="queue/add" title="הוספה" Icon={MdQueue} />
        <BottomTab Pagelink="queue/" title="הרשימה" Icon={PiQueueBold} />
        <BottomTab Pagelink="vote/" title="הצבעות" Icon={MdHowToVote} />
      </div>
    </div>
  );
};

export default Footer;
