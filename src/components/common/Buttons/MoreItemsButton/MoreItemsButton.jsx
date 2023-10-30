import React from "react";
import "./MoreItemsButton.scss";

const MoreItemsButton = ({ text }) => {
  return (
    <div className="more-items-button-container">
      <span className="more-items-button">{text}</span>
    </div>
  );
};

export default MoreItemsButton;
