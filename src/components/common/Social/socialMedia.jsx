import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import facebook from "../../../assets/img/landing/icon/facebook.png";
import google from "../../../assets/img/landing/icon/google.png";
import insta from "../../../assets/img/landing/icon/insta.png";
import twiter from "../../../assets/img/landing/icon/twiter.png";

import "./socialMedia.scss";
const SocialMedia = () => {
  const state = useSelector((state) => state.setting);

  return (
    <Container className="socialMediaContainer">
      <Row>
        <Col xs={3}></Col>
        <Col className="social-col" xs={1}>
          <a href={state.facebookAddress}>
            <img className="social-img" alt="facebook-logo" src={facebook} />
          </a>
        </Col>
        <Col className="social-col" xs={1}>
          <a href="/">
            <img className="social-img" alt="google-logo" src={google} />
          </a>
        </Col>
        <Col className="social-col" xs={1}>
          <a href={state.instagramAddress}>
            <img className="social-img" alt="instagram-logo" src={insta} />
          </a>
        </Col>
        <Col className="social-col" xs={1}>
          <a href={state.twitterAddress}>
            <img className="social-img" alt="twiter-logo" src={twiter} />
          </a>
        </Col>
        <Col xs={1}></Col>
      </Row>
    </Container>
  );
};

export default SocialMedia;
