import React, { useEffect } from "react";
import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/header";
import "./ContactUs.scss";
import ContactUsPage from "../../components/ContactUs/ContactUsPage/ContactUsPage";
const ContactUs = () => {
  return (
    <>
      <Header />
      <ContactUsPage />
      <Footer />
    </>
  );
};
export default ContactUs;
