import React from "react";
import { englishNumbersToPersian } from "../../../../core/utils/englishNumbersToPersian";
import "./LicenseItem.scss";
const LicenseItem = ({ licenseTitle, licenseNumber }) => {
  return (
    <div className="license-Item">
      <span className="license-title">{licenseTitle}</span>
      <span className="license-number">
        {englishNumbersToPersian(licenseNumber)}
      </span>
    </div>
  );
};
export default LicenseItem;
