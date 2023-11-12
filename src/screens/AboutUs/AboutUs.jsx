import React, { useEffect } from "react";
import AboutUsPage from "../../components/AboutUs/AboutUsPage/AboutUsPage";
import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/header";
import "./AboutUs.scss";
import TestHeader from "../../components/common/TestHeader/TestHeader";

const AboutUs = () => {
  return (
    <>
      <TestHeader />
      <AboutUsPage />
      <Footer />
    </>
  );
};
export default AboutUs;
