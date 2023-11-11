import React from 'react';
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import home from '../../../../assets/img/landing/icon/home.png';
import { UseGetMenu } from '../../../../core/services/api/get-menu';
import './TestNavbar.scss';
import TestNavMenu from './TestNavMenu/TestNavMenu';
import SearchBox from '../../Header/SearchBar/SerchBox';
import TestSearchBox from '../TestSearchBar/TestSerchBox';
import { useHistory } from 'react-router-dom';

import { showToast, ToastTypes } from '../../../../core/utils/show-toast';
import {
  login,
  isUserLoggedIn,
} from '../../../../core/services/authentication/authentication.service';

const TestNavbarMenu = ({ data }) => {
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
      <Container className="my-navbar-container">
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="my-navbar-icon"
        />
        <Navbar.Collapse className="my-navbar-Collapse">
          <Nav className="my-navbar-detail">
            {data &&
              data.data &&
              data?.data.result[0] &&
              data?.data.result[0].menuComponentResponses && (
                <TestNavMenu
                  menus={data?.data.result[0].menuComponentResponses}
                  title={'Root'}
                  count={1}
                />
              )}
          </Nav>
          <div className="row d-flex justify-content-end ">
            {/* <div className="col-12 bg-warning ">
              <TestSearchBox />
            </div> */}
            <div className="col-12 ">
              {' '}
              <Button
                className="loginRes"
                onClick={redirectToLogin}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'transparent',
                  border: '1px solid #6DCE0E',
                }}
              >
                <p
                  style={{
                    display: 'inline',
                    margin: 0,
                  }}
                >
                  ورود کاربران
                </p>
              </Button>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TestNavbarMenu;
