import React, { useEffect } from "react";
import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/header";
import TextNewsGrid from "../../components/NewsGrid/TextNewsGrid/TextNewsGrid";
import { Route, Switch } from "react-router-dom";

import "./NewsGrid.scss";
import PhotoNewsGrid from "../../components/NewsGrid/PhotoNewsGrid/PhotoNewsGrid";
import VideoNewsGrid from "../../components/NewsGrid/VideoNewsGrid/VideoNewsGrid";
import TextNewsPage from "../../components/NewsGrid/TextNewsPage/TextNewsPage";
import PhotoNewsPage from "../../components/NewsGrid/PhotoNewsPage/PhotoNewsPage";
import VideoNewsPage from "../../components/NewsGrid/VideoNewsPage/VideoNewsPage";
import TestHeader from "../../components/common/TestHeader/TestHeader";
const NewsGrid = () => {
  return (
    <>
       <TestHeader />
      <Switch>
        <Route path="/News/TextNews" exact component={TextNewsGrid} />
        <Route path="/News/TextNews/:id" exact component={TextNewsPage} />
        <Route path="/News/PhotoNews" exact component={PhotoNewsGrid} />
        <Route path="/News/PhotoNews/:id" exact component={PhotoNewsPage} />
        <Route path="/News/VideoNews" exact component={VideoNewsGrid} />
        <Route path="/News/VideoNews/:id" exact component={VideoNewsPage} />
      </Switch>

      {/* 
      <Switch>
        <Route
          exact
          path="/News/TextNews"
          component={() => {
            return (
              <HandleScroll>
                <TextNewsGrid />
              </HandleScroll>
            );
          }}
        />
        <Route
          exact
          path="/News/TextNews/:id"
          component={() => {
            return (
              <HandleScroll>
                <TextNewsPage />
              </HandleScroll>
            );
          }}
        />
        <Route
          exact
          path="/News/PhotoNews"
          component={() => {
            return (
              <HandleScroll>
                <PhotoNewsGrid />
              </HandleScroll>
            );
          }}
        />
        <Route
          exact
          path="/News/PhotoNews/:id"
          component={() => {
            return (
              <HandleScroll>
                <PhotoNewsPage />
              </HandleScroll>
            );
          }}
        />
        <Route
          exact
          path="/News/VideoNews"
          component={() => {
            return (
              <HandleScroll>
                <VideoNewsGrid />
              </HandleScroll>
            );
          }}
        />
        <Route
          exact
          path="/News/VideoNews/:id"
          component={() => {
            return (
              <HandleScroll>
                <VideoNewsPage />
              </HandleScroll>
            );
          }}
        />
      </Switch> */}

      <Footer />
    </>
  );
};
export default NewsGrid;
