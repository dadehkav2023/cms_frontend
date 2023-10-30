import React, { useEffect } from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavMenu.scss";
import NavItem from "../NavItem/NavItem";
const NavMenu = ({ title, menus, count }) => {
  return count === 1 ? (
    <>
      {menus.map((menu) => {
        return (
          <>
            {!menu.menuComponentResponses && <NavItem menu={menu} />}
            {menu.menuComponentResponses &&
              menu.menuComponentResponses.length > 0 && (
                <NavMenu
                  menus={menu.menuComponentResponses}
                  title={menu.title}
                  count={++count}
                />
              )}
          </>
        );
      })}
    </>
  ) : (
    <>
      <NavDropdown title={title} id="basic-nav-dropdown">
        {menus.map((menu) => {
          return (
            <>
              <NavItem menu={menu} />
              {menu.menuComponentResponses &&
                menu.menuComponentResponses.length > 0 && (
                  <NavMenu
                    menus={menu.menuComponentResponses}
                    title={menu.title}
                    count={++count}
                  />
                )}
            </>
          );
        })}
      </NavDropdown>
    </>
  );
};

export default NavMenu;
