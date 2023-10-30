import React from "react";
import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/header";
import TextNewsGrid from "../../components/NewsGrid/TextNewsGrid/TextNewsGrid";
import { Route, Switch } from "react-router-dom";

import "./PeoplesVoice.scss";
import PeoplesVoicePage from "../../components/PeoplesVoice/PeoplesVoicePage/PeoplesVoicePage";
import PeoplesVoiceGrid from "../../components/PeoplesVoice/PeoplesVoiceGrid/PeoplesVoiceGrid";
import MyChallengesGrid from "../../components/PeoplesVoice/MyChallengesGrid/MyChallengesGrid";
import SignedChallengesGrid from "../../components/PeoplesVoice/SignedChallengesGrid/SignedChallengesGrid";
import NewPeoplesVoicePage from "../../components/PeoplesVoice/NewPeoplesVoicePage/NewPeoplesVoicePage";
import PeoplesVoiceFinalRegistration from "../../components/PeoplesVoice/PeoplesVoiceFinalRegistration/PeoplesVoiceFinalRegistration";
const PeoplesVoice = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/Challenges" exact component={PeoplesVoiceGrid} />
        <Route
          path="/Challenges/details/:id"
          exact
          component={PeoplesVoicePage}
        />
        <Route path="/Challenges/New" exact component={NewPeoplesVoicePage} />
        <Route
          path="/Challenges/New/:id"
          exact
          component={PeoplesVoiceFinalRegistration}
        />
        <Route
          path="/Challenges/MyChallenges"
          exact
          component={MyChallengesGrid}
        />
        <Route
          path="/Challenges/SignedChallenges"
          exact
          component={SignedChallengesGrid}
        />
      </Switch>

      <Footer />
    </>
  );
};
export default PeoplesVoice;
