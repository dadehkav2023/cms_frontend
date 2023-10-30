import React, { useState, useEffect } from "react";
import "./JumpToTop.scss";
import jumoIcon from "../../../../assets/img/landing/icon/jump.png";
const Footer = () => {
  return (
    <>
      <div
        onClick={() => {
          document.body.scrollTop = 0; // For Safari
          document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }}
        className="jump-to-top"
      >
        <img alt="up-arrow" src={jumoIcon} />
      </div>
    </>
  );
};

export default Footer;
