import React from "react";
import "./SectionTitle.scss";
const SectionTitle = ({ TitleText }) => {
  return (
    <>
      <div className="sectionTitleContainer">
        <h1 className="sectionTitles">{TitleText}</h1>
      </div>
    </>
  );
};
export default SectionTitle;
