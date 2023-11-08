import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./header.scss";
import NavbarMenu from "./Navbar/navbar";
import logo from "../../../assets/img/landing/logo.png";
import Avatar from "../../../assets/img/landing/icon/Avatar.png";
import SignUp from "../../../assets/img/landing/icon/sign-up.png";
import SearchBox from "./SearchBar/SerchBox";
import Typed from "react-typed";
import { useSelector } from "react-redux";
import { correctUploadPath } from "../../../core/utils/image-path-correction";
import { UseGetMenu } from "../../../core/services/api/get-menu";
import { useHistory } from "react-router-dom";
import {
  login,
  isUserLoggedIn,
} from "../../../core/services/authentication/authentication.service";
import { showToast, ToastTypes } from "../../../core/utils/show-toast";
import { useUserAuth } from "../../../core/utils/context/AuthenticationContext";

const Header = () => {
  const { userInfo } = useUserAuth();
  const redirectToLogin = () => {
    showToast(["در حال انتقال به صفحه ورود"], ToastTypes.info);
    login();
  };
  const redirectToLogout = () => {
    showToast(["در حال خروج"], ToastTypes.info);
    history.push("/signout-oidc");
  };
  const history = useHistory();
  const state = useSelector((state) => state.setting);
  const linkIsValidRegex = /http/;
  const [linkIsValid, setLinkIsValid] = useState(false);
  useEffect(() => {
    setLinkIsValid(linkIsValidRegex.test(state.googleMapLink));
  }, [state]);
  const { data, isLoading, isError, isSuccess } = UseGetMenu();
  return (
    isSuccess && (
      <section className="header-section">
        <header id="head">
          <Container fluid="xxl" className="top-head">
            <Row>
              <Col sm={8} className="top-head-right">
                <h6 className="top-head-text">
                  <Typed
                    strings={[
                      "  به سامانه جامع بهره برداران کشاورزی خوش آمدید، شما می توانید با ثبت نام در این سامانه از خدمات نظام صنفی بهره مند شوید .      ",
                    ]}
                    typeSpeed={50}
                  />
                </h6>
              </Col>
              <Col sm={4} className="top-head-left">
                {/* <SocialMedia /> */}
              </Col>
            </Row>
          </Container>
          <div id="bottom-head-logo" style={{ float: "right" }}>
            {state.logoImageAddress !== "" && (
              <Link style={{ color: "inherit", TextDecoration: "none" }} to="/">
                <img
                  alt="logo"
                  src={
                    process.env.REACT_APP_PUBLIC_PATH +
                    "/" +
                    correctUploadPath(state.logoImageAddress)
                  }
                />
              </Link>
            )}
          </div>
          <Container fluid="xxl" id="bottom-head" className="navbarFixedTop">
            <Row>
              <Col xl={9} xs={12} id="bottom-head-menu">
                <NavbarMenu data={data} />
              </Col>
              <Col xl={3} xs={12} id="bottom-head-Search ">
                <SearchBox />

                {userInfo.userName ? (
                  <>
                    <DropdownButton
                      className="profile-dropdown"
                      title="امکانات کاربری"
                    >
                      <Dropdown.Item href="#/action-1">
                        <Link to="/Challenges/MyChallenges">
                          مشاهده صدا های من
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        <Link to="/Challenges/SignedChallenges">
                          مشاهده صدا های امضاء شده من
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        <Button
                          style={{
                            backgroundColor: "#e74c3c",
                            borderColor: "transparent",
                          }}
                          onClick={redirectToLogout}
                        >
                          خروج
                        </Button>
                      </Dropdown.Item>
                    </DropdownButton>
                  </>
                ) : (
                  <>
                    <Button id="sign-button" onClick={redirectToLogin}>
                      <div></div>ورود کاربران
                      <img alt="avatar" src={Avatar} />
                    </Button>
                    {/* <a href="https://Register.sabak.org">
                      <Button id="register-button">
                        <div></div>ثبت نام
                        <img alt="avatar" src={SignUp} />
                      </Button>
                    </a> */}
                  </>
                )}
              </Col>
            </Row>
          </Container>
        </header>
      </section>
    )
  );
};

export default Header;
