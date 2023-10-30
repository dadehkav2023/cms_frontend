import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Landing from "./screens/Landing/Landing";
import { UseGetSetting } from "./core/services/api/getSetting";
import "bootstrap-v4-rtl/dist/css/bootstrap-rtl.min.css";
import "bootstrap-v4-rtl/dist/css/bootstrap-rtl.css";
import { bindActionCreators } from "redux";
import { actionCreators } from "./core/state/index";
import { useDispatch, useSelector } from "react-redux";
import NewsGrid from "./screens/NewsGrid/NewsGrid";
import AboutUs from "./screens/AboutUs/AboutUs";
import ContactUs from "./screens/ContactUs/ContactUs";
import SiteRules from "./screens/SiteRules/SiteRules";
import HandleScroll from "./components/common/HandleScroll/HandleScroll";
import StatementsGrid from "./screens/StatementsGrid/StatementsGrid";
import SiteModal from "./components/common/SiteModal/SiteModal";
import { correctUploadPath } from "./core/utils/image-path-correction";
import { SigninOidc } from "./components/Authentication/SigninOidc/SigninOidc";
import { SignOutOidc } from "./components/Authentication/SignOutOidc/SignOutOidc";
import PeoplesVoice from "./screens/PeoplesVoice/PeoplesVoice";

function App() {
  const state = useSelector((state) => state.setting);

  const dispatch = useDispatch();
  const { setSetting } = bindActionCreators(actionCreators, dispatch);
  const { data, isSuccess, isIdle, isError, isLoading } = UseGetSetting();
  useEffect(() => {
    setSetting({
      name: data?.data.result ? data.data.result.name : "لطفا شکیبا باشید",
      logoImageAddress: data?.data.result
        ? data.data.result.logoImageAddress
        : "",
      fax: data?.data.result ? data.data.result.fax : "۰۲۱۵۴۶۶۵۹۲۳۱",
      address: data?.data.result
        ? data.data.result.address
        : "تهران - خیابان شریعتی - نرسیده به پل سید خندان - ورودی ۲۲ - ساختمان مرکزی",
      googleMapLink: data?.data.result
        ? data.data.result.googleMapLink
        : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3204.623834154988!2d53.0494553156805!3d36.563181979998106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDMzJzQ3LjUiTiA1M8KwMDMnMDUuOSJF!5e0!3m2!1sen!2sus!4v1629196622351!5m2!1sen!2sus",
      latitudeAndLongitude: data?.data.result
        ? data.data.result.latitudeAndLongitude
        : "1N,32E",
      sliderImageCount: data?.data.result
        ? data.data.result.sliderImageCount
        : 4,
      homePageNewsCount: data?.data.result
        ? data.data.result.homePageNewsCount
        : 4,

      aboutUsSummary: data?.data.result
        ? data.data.result.aboutUsSummary
        : "به سامانه جامع بهره برداران کشاورزی خوش آمدید، شما می توتانید با ثبت نام در این سامانه از خدمات نظام صنفی بهره مند شوید .",

      tell: data?.data.result ? data.data.result.tell : "۰۲۱۵۴۶۶۵۹۲۳۱",

      postalCode: data?.data.result ? data.data.result.postalCode : "۱۱۱۱۱۱۱۱۱",

      telegramAddress: data?.data.result
        ? data.data.result.telegramAddress
        : "https://telegram.me",
      whatsappAddress: data?.data.result
        ? data.data.result.whatsappAddress
        : "https://whatsapp.com",
      instagramAddress: data?.data.result
        ? data.data.result.instagramAddress
        : "https://instagram.com",
      facebookAddress: data?.data.result
        ? data.data.result.facebookAddress
        : "https://facebook.com",
      twitterAddress: data?.data.result
        ? data.data.result.twitterAddress
        : "https://twitter.com",
    });
  }, [isLoading]);

  return (
    <>
      <Router>
        <Helmet>
          <title>{state.name}</title>
          <link
            rel="icon"
            href={
              process.env.REACT_APP_PUBLIC_PATH +
              "/" +
              correctUploadPath(state.logoImageAddress)
            }
          />
        </Helmet>
        <HandleScroll />
        <SiteModal />
        <Switch>
          <Route path="/signin-oidc" component={SigninOidc} />
          <Route path="/signout-oidc" component={SignOutOidc} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/AboutUs" component={AboutUs} />
          <Route exact path="/ContactUs" component={ContactUs} />
          <Route exact path="/SiteRules" component={SiteRules} />
          <Route path="/News" component={NewsGrid} />
          <Route path="/Statement" component={StatementsGrid} />
          <Route path="/Challenges" component={PeoplesVoice} />
        </Switch>
        {/* 
        <Switch>
          <Route
            exact
            path="/"
            component={() => {
              return (
                <HandleScroll>
                  <Landing />
                </HandleScroll>
              );
            }}
          />
          <Route
            exact
            path="/AboutUs"
            component={() => {
              return (
                <HandleScroll>
                  <AboutUs />
                </HandleScroll>
              );
            }}
          />
          <Route
            exact
            path="/ContactUs"
            component={() => {
              return (
                <HandleScroll>
                  <ContactUs />
                </HandleScroll>
              );
            }}
          />

          <Route
            exact
            path="/SiteRules"
            component={() => {
              return (
                <HandleScroll>
                  <SiteRules />
                </HandleScroll>
              );
            }}
          />
          <Route
            exact
            path="/News"
            component={() => {
              return (
                <HandleScroll>
                  <NewsGrid />
                </HandleScroll>
              );
            }}
          />
        </Switch> */}
      </Router>
    </>
  );
}

export default App;
