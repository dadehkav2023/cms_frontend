import React from 'react';
import { Container, Nav, Navbar, NavDropdown, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import home from '../../../../assets/img/landing/icon/home.png';
import { UseGetMenu } from '../../../../core/services/api/get-menu';
import './TestNavbar.scss';
import TestNavMenu from './TestNavMenu/TestNavMenu';
import SearchBox from '../../Header/SearchBar/SerchBox';
import TestSearchBox from '../TestSearchBar/TestSerchBox';
import { useHistory } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useUserAuth } from '../../../../core/utils/context/AuthenticationContext';

import { showToast, ToastTypes } from '../../../../core/utils/show-toast';
import {
  login,
  isUserLoggedIn,
} from '../../../../core/services/authentication/authentication.service';

const TestNavbarMenu = ({ data }) => {
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
  return (
    <Navbar className="my-navbar" expand="lg">
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="my-navbar-icon"
        >
          <RxHamburgerMenu />
        </Navbar.Toggle>
      <Container className="my-navbar-container ">
        <Navbar.Collapse className="my-navbar-Collapse hambergerMenuBox">
          <Nav className="my-navbar-detail">
            {/* {data &&
              data.data &&
              data?.data.result[0] &&
              data?.data.result[0].menuComponentResponses && (
                <TestNavMenu
                  menus={data?.data.result[0].menuComponentResponses}
                  title={'Root'}
                  count={1}
                />
              )} */}
         
          </Nav>
          <div className="row d-flex justify-content-end hamberger-items">
            {/* <div className="col-12 bg-warning ">
              <TestSearchBox />
            </div> */}
            <div className="col-12 ">
            <div className='hambergerMenuLink'>
                <a href="/ContactUs">تماس با ما</a>
                <a href="/AboutUs">درباره ما</a>
                <a href="/SiteRules">قوانین و مقررات</a>
                </div>



                <div className="d-flex justify-content-center  loginBox " >
                {userInfo.userName ? (
                  <>
                    <DropdownButton
                      variant="#ffffff"
                      key="down-centered"
                      className="profile-dropdown User-features-login "
                      title="امکانات کاربری"
                      style={{  position: 'relative', right:'10px', fontSize: '10px' }}
                    >
                      <div className="User-features-login-items">
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
                      className="hambergerMenuLogin mt-1"
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
              </div>














                
      
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TestNavbarMenu;
