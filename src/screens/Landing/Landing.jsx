import React, { useEffect } from 'react';
import Header from '../../components/common/Header/header';
import SlideShow from '../../components/Landing/LandingSlideshow/slideShow';
import License from '../../components/Landing/License/License';
import Map from '../../components/Landing/Map/Map';
import Footer from '../../components/common/Footer/Footer';
import Services from '../../components/Landing/services/Services';
import Blog from '../../components/Landing/Blog/blog';
import PeoplesVoice from '../../components/Landing/PeoplesVoice/PeoplesVoice';
import TextNews from '../../components/Landing/TextNews/TextNews';
import Announcement from '../../components/Landing/Announcement/Announcement';
import Survey from '../../components/Landing/Survey/Survey';
import './Landing.scss';
import VideoNews from '../../components/Landing/VideoNews/VideoNews';
import TestHeader from '../../components/common/TestHeader/TestHeader';
import PhotoNews from '../../components/Landing/PhotoNews/PhotoNews';
import ElectionBanner from '../../components/Landing/ElectionBanner/ElectionBanner';
import { Col, Container, Row } from 'reactstrap';
const Landing = () => {
  return (
    <>
     <TestHeader />
      <SlideShow /> 
      <Container>
        <Row className="justify-content-center">
          <Col xs="auto" className="d-flex align-items-center">
            <ElectionBanner />
          </Col>
        </Row>
      </Container>

      <Services />
      <TextNews />
      <PhotoNews />
      {/* <PeoplesVoice /> */}
      <VideoNews />
      <Announcement />
      {/* <Survey /> */}
      {/* <Blog /> */}
      {/* <License /> */}
      <Footer />
    </>
  );
};
export default Landing;
