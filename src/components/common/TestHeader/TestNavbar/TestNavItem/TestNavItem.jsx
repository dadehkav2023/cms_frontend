import React, { useEffect } from "react";
import { NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { siteModules } from "../../../../../core/data/site-modules";
import { actionCreators } from "../../../../../core/state";
import "./TestNavItem.scss";

const TestNavItem = ({ menu }) => {
  const state = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { setModal } = bindActionCreators(actionCreators, dispatch);
  if (menu.menuItem) {
    return menu.menuItem.link ? (
      <>
        <NavDropdown.Item href="#action/3.3">
          {menu.iconPath && (
            <img
              alt="icon"
              className="homeIcon"
              src={`${process.env.REACT_APP_PUBLIC_PATH}/${menu.iconPath}`}
            />
          )}
          <a
            target="_blank"
            rel="noreferrer"
            href={menu.menuItem.link}
            style={{ color: "rgba(0, 0, 0, 0.5)", textDecoration: "none" }}
          >
            {menu.title}
          </a>
        </NavDropdown.Item>
      </>
    ) : menu.menuItem.filePath ? (
      <>
        <NavDropdown.Item href="#action/3.3">
          {menu.iconPath && (
            <img
              alt="icon"
              className="homeIcon"
              src={`${process.env.REACT_APP_PUBLIC_PATH}/${menu.iconPath}`}
            />
          )}
          <a
            style={{ color: "rgba(0, 0, 0, 0.5)", textDecoration: "none" }}
            download
            href={`${process.env.REACT_APP_PUBLIC_PATH}/${menu.menuItem.filePath}`}
          >
            {menu.title}
          </a>
        </NavDropdown.Item>
      </>
    ) : menu.menuItem.modularPage ? (
      <>
        <NavDropdown.Item href="#action/3.3">
          {menu.iconPath && (
            <img
              alt="icon"
              className="homeIcon"
              src={`${process.env.REACT_APP_PUBLIC_PATH}/${menu.iconPath}`}
            />
          )}
          <Link
            style={{ color: "rgba(0, 0, 0, 0.5)", textDecoration: "none" }}
            to={
              siteModules.filter((module) => {
                return module.value === menu.menuItem.modularPage;
              })[0].path
                ? siteModules.filter((module) => {
                    return module.value === menu.menuItem.modularPage;
                  })[0].path
                : "/"
            }
          >
            {menu.title}
          </Link>
        </NavDropdown.Item>
      </>
    ) : (
      <>
        <NavDropdown.Item
          style={{ color: "rgba(0, 0, 0, 0.5)", textDecoration: "none" }}
          onClick={() => {
            setModal({
              ...state,
              show: true,
              title: menu.title,
              body: menu.menuItem.ckEditorText,
            });
          }}
        >
          {menu.iconPath && (
            <img
              alt="icon"
              className="homeIcon"
              src={`${process.env.REACT_APP_PUBLIC_PATH}/${menu.iconPath}`}
            />
          )}

          {menu.title}
        </NavDropdown.Item>
      </>
    );
  } else
    return (
      <>
        <NavDropdown
          className="nav-menu-component"
          title={menu.title}
          id="basic-nav-dropdown"
        ></NavDropdown>
      </>
    );
};

export default TestNavItem;
