import React, { useEffect } from "react";
import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/header";
import "./ContactUs.scss";
import ContactUsPage from "../../components/ContactUs/ContactUsPage/ContactUsPage";
import TestHeader from "../../components/common/TestHeader/TestHeader";
const ContactUs = () => {
  return (
    <>
      <TestHeader />
      <ContactUsPage />
      <Footer />
    </>
  );
};
export default ContactUs;
