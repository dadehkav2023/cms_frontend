import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import home from "../../../../assets/img/landing/icon/home.png";
import { UseGetMenu } from "../../../../core/services/api/get-menu";

import "./navbar.scss";
import NavMenu from "./NavMenu/NavMenu";
const NavbarMenu = ({ data }) => {
  return (
    <Navbar id="navbar" expand="lg">
      <Container className="navbar-container">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="navbar-container-collapse"
        >
          <Nav className="ml-auto">
            {data &&
              data.data &&
              data?.data.result[0] &&
              data?.data.result[0].menuComponentResponses && (
                <NavMenu
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

export default NavbarMenu;
