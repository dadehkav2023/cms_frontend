import React, { useEffect } from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./TestNavMenu.scss";
import TestNavItem from "../TestNavItem/TestNavItem";
const TestNavMenu = ({ title, menus, count }) => {
  return count === 1 ? (
    <>
      {menus.map((menu) => {
        return (
          <>
            {!menu.menuComponentResponses && <TestNavItem menu={menu} />}
            {menu.menuComponentResponses &&
              menu.menuComponentResponses.length > 0 && (
                <TestNavMenu
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
      <NavDropdown
        title={title}
        id="basic-nav-dropdown"
        className="nav-menu-component"
      >
        {menus.map((menu) => {
          return (
            <>
              <TestNavItem menu={menu} />
              {menu.menuComponentResponses &&
                menu.menuComponentResponses.length > 0 && (
                  <TestNavMenu
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

export default TestNavMenu;
