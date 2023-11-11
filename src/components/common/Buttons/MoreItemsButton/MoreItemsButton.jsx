import React from "react";
import "./MoreItemsButton.scss";
import { AiOutlineLeft } from "react-icons/ai"; // Import the right arrow icon from react-icons

const MoreItemsButton = ({ text }) => {
  return (
    <div className="more-items-button-container">
      <span className="more-items-button"><AiOutlineLeft className="mx-1" />{text}</span>
       
    </div>
  );
};

export default MoreItemsButton;