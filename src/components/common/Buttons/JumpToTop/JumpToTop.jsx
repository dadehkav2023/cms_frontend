import React, { useState, useEffect } from "react";
import "./JumpToTop.scss";
import jumoIcon from "../../../../assets/img/landing/icon/jump.png";

const Footer = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Function to check the scroll position
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showButton && (
        <div onClick={scrollToTop} className="jump-to-top">
          <img alt="up-arrow" src={jumoIcon} />
        </div>
      )}
    </>
  );
};

export default Footer;
