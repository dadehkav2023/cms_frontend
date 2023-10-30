import React from "react";
import "./License.scss";
import LicenceItem from "./LicenseItem/LicenseItem";
const License = () => {
  return (
    <section className="LicenseContainer">
      <div className="LicenseMask">
        <div className="LicenseItemsContainer">
          <LicenceItem licenseTitle="پروانه زراعت" licenseNumber="3789" />
          <LicenceItem licenseTitle="پروانه باغبانی" licenseNumber="3279" />
          <LicenceItem licenseTitle="پروانه دام" licenseNumber="559" />
          <LicenceItem licenseTitle="منابع طبیعی" licenseNumber="4" />
          <LicenceItem licenseTitle="شیلات و آبزیان" licenseNumber="14" />
          {/* <LicenceItem licenseTitle="طیور  و ماکیان" licenseNumber="14" /> */}
          {/* <LicenceItem licenseTitle="خدمات و صنایع" licenseNumber="21" /> */}
        </div>
      </div>
    </section>
  );
};
export default License;
