import React, { useEffect } from "react";
import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/header";
import SiteRulesPage from "../../components/SiteRules/SiteRulesPage/SiteRulesPage";

import "./SiteRules.scss";

const SiteRules = () => {
  return (
    <>
      <Header />
      <SiteRulesPage />
      <Footer />
    </>
  );
};
export default SiteRules;
