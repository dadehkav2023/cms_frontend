import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './TestHeader.scss';
import NavbarMenu from './Navbar/navbar';
import logo from '../../../assets/img/landing/logo.png';
import Avatar from '../../../assets/img/landing/icon/Avatar.png';
import SignUp from '../../../assets/img/landing/icon/sign-up.png';
import SearchBox from './SearchBar/SerchBox';
import Typed from 'react-typed';
import { useSelector } from 'react-redux';
import { correctUploadPath } from '../../../core/utils/image-path-correction';
import { UseGetMenu } from '../../../core/services/api/get-menu';
import { useHistory } from 'react-router-dom';
import {
  login,
  isUserLoggedIn,
} from '../../../core/services/authentication/authentication.service';
import { showToast, ToastTypes } from '../../../core/utils/show-toast';
import { useUserAuth } from '../../../core/utils/context/AuthenticationContext';
import TestNavbarMenu from './TestNavbar/TestNavbar';
import TestSearchBox from './TestSearchBar/TestSerchBox';

const TestHeader = () => {
  const { userInfo } = useUserAuth();
  const redirectToLogin = () => {
    showToast(['در حال انتقال به صفحه ورود'], ToastTypes.info);
    login();
  };
  const redirectToLogout = () => {
    showToast(['در حال خروج'], ToastTypes.info);
    history.push('/signout-oidc');
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
        <header className="site-header mb-5">
          <h6 className="typed-text">
            <Typed
              strings={[
                'به سامانه جامع بهره برداران کشاورزی خوش آمدید، شما می توانید با ثبت نام در این سامانه از خدمات نظام صنفی بهره مند شوید .      ',
              ]}
              typeSpeed={50}
            />
          </h6>
          <Container fluid>
            <Row>
              <Col
                xs={6}
                sm={1}
                md={1}
                lg={1}
                className="d-flex justify-content-start logoBox "
              >
                <div className="site-logo">
                  {state.logoImageAddress !== '' && (
                    <Link
                      style={{ color: 'inherit', TextDecoration: 'none' }}
                      to="/"
                    >
                      <img
                        alt="logo"
                        src={
                          process.env.REACT_APP_PUBLIC_PATH +
                          '/' +
                          correctUploadPath(state.logoImageAddress)
                        }
                      />
                    </Link>
                  )}
                </div>
              </Col>

              <Col xs={6} sm={8} md={8} lg={8} className=" menu">
                <div className="navLink mt-3">
                  <a href="/ContactUs">تماس با ما</a>
                  <a href="/AboutUs">درباره ما</a>
                  <a href="/SiteRules">قوانین و مقررات</a>
                </div>

                <div className="navbarMenuBox ">
                  <TestNavbarMenu data={data} />
                </div>
              </Col>

              <Col
                xs={2}
                sm={2}
                md={2}
                lg={2}
                className="d-flex justify-content-center SearchBox "
              >
                {/* <TestSearchBox /> */}
              </Col>

              <Col
                xs={1}
                sm={1}
                md={1}
                lg={1}
                className="d-flex justify-content-center  loginBox "
              >
                {userInfo.userName ? (
                  <>
                    <DropdownButton
                      variant="#ffffff"
                      key="down-centered"
                      className="profile-dropdown User-features "
                      title="امکانات کاربری"
                     
                    >
                      <div className="User-features-items">
                        <Dropdown.Item href="#/action-1">
                          <Link style={{ color: 'black', position: 'relative', right:'-40px', fontSize: '12px' }} to="/Challenges/MyChallenges">
                            مشاهده صدا های من
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item style={{ color: 'black', position: 'relative', right:'-40px', fontSize: '12px' }} href="#/action-2">
                          <Link to="/Challenges/SignedChallenges">
                            مشاهده صدا های امضاء شده من
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                          <Button
                        style={{ color: 'white', position: 'relative', left:'-60px', fontSize: '12px',backgroundColor:'red',border:'0px none',borderRadius:'25px' }}
                            onClick={redirectToLogout}
                          >
                            خروج
                          </Button>
                        </Dropdown.Item>
                      </div>
                    </DropdownButton>
                  </>
                ) : (
                  <>
                    <Button
                      className="login mt-1"
                      onClick={redirectToLogin}
                      style={{}}
                    >
                      <p
                        style={{
                          display: 'inline',
                          margin: 0,
                        }}
                      >
                        ورود
                      </p>
                      {/* <img
                        alt="avatar"
                        src={Avatar}
                        style={{ display: 'inline' }}
                      /> */}
                    </Button>

                    {/* <a href="https://Register.sabak.org">
                      <Button className="register">
                        <div></div>ثبت نام
                        <img alt="avatar" src={SignUp} />
                      </Button>
                    </a> */}
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
