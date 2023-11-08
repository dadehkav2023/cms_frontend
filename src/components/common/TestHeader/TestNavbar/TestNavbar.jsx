import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import home from "../../../../assets/img/landing/icon/home.png";
import { UseGetMenu } from "../../../../core/services/api/get-menu";

import "./TestNavbar.scss";
import TestNavMenu from "./TestNavMenu/TestNavMenu";
const TestNavbarMenu = ({ data }) => {
  return (
    <Navbar className="my-navbar" expand="lg">
      <Container className="navbar-container">
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="hambergerMenu   " />
        <Navbar.Collapse className="my-nav-customised navbar-container-collapse basic-navbar-nav">
          <Nav className="ml-auto mt-5">
            {data &&
              data.data &&
              data?.data.result[0] &&
              data?.data.result[0].menuComponentResponses && (
                <TestNavMenu
                  menus={data?.data.result[0].menuComponentResponses}
                  title={"Root"}
                  count={1}
                />
              )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TestNavbarMenu;
