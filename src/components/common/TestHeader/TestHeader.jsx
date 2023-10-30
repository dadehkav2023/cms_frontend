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
import "./TestHeader.scss";
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
import TestNavbarMenu from "./TestNavbar/TestNavbar";
import TestSearchBox from "./TestSearchBar/TestSerchBox";

const TestHeader = () => {
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
      <>
        <header className="site-header">
          <h6 className="typed-text">
            <Typed
              strings={[
                "  به سامانه جامع بهره برداران کشاورزی خوش آمدید، شما می توانید با ثبت نام در این سامانه از خدمات نظام صنفی بهره مند شوید .      ",
              ]}
              typeSpeed={50}
            />
          </h6>
          <Container fluid="xxl">
            <Row>
              <Col xl={1} lg={1} md={1} sm={1} xs={1}>
                <div className="site-logo">
                  {state.logoImageAddress !== "" && (
                    <Link
                      style={{ color: "inherit", TextDecoration: "none" }}
                      to="/"
                    >
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
              </Col>
              <Col xl={5} lg={11} md={2} sm={2} xs={6}>
                <TestNavbarMenu data={data} />
              </Col>
              <Col xl={3} lg={7} md={9} sm={9} xs={12}>
                <TestSearchBox />
              </Col>
              <Col
                xl={3}
                lg={5}
                md={6}
                sm={8}
                xs={12}
                style={{ textAlign: "right" }}
              >
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
                    <Button className="login" onClick={redirectToLogin}>
                      <div></div>ورود کاربران
                      <img alt="avatar" src={Avatar} />
                    </Button>
                    <a href="https://Register.sabak.org">
                      <Button className="register">
                        <div></div>ثبت نام
                        <img alt="avatar" src={SignUp} />
                      </Button>
                    </a>
                  </>
                )}
              </Col>
            </Row>
          </Container>

          {/* <div className="site-logo">
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
          </div> */}
        </header>
      </>
    )
  );
};

export default TestHeader;
