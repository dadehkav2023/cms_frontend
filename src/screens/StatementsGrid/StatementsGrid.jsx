import React, { useEffect } from "react";
import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/header";
import { Route, Switch } from "react-router-dom";

import "./StatementsGrid.scss";
import StatementsGridPage from "../../components/StatementsGrid/StatementsGridPage/StatementsGridPage";
import StatementsPage from "../../components/StatementsGrid/StatementsPage/StatementsPage";
const StatementsGrid = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route
          path="/Statement/Statements"
          exact
          component={StatementsGridPage}
        />
        <Route
          path="/Statement/Statements/:id"
          exact
          component={StatementsPage}
        />
      </Switch>

      <Footer />
    </>
  );
};
export default StatementsGrid;
