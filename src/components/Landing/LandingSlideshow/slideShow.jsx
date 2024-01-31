import React, { useEffect, useState } from 'react';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import './slideShow.scss';
import { UseGetSlides } from '../../../core/services/api/get-slides';
import { correctUploadPath } from '../../../core/utils/image-path-correction';
import { useSelector } from 'react-redux';

const SlideShow = () => {
  
  const state = useSelector((state) => state.setting);

  const { data, isError, isLoading, isSuccess, mutate } = UseGetSlides();
  useEffect(() => {
    mutate({
      page: 1,
      pageSize: state.sliderImageCount,
      id: 0,
      title: null,
      description: null,
      canShow: true,
      startShowDateTime: null,
      endShowDateTime: null,
    });
  }, [state.sliderImageCount]);

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (index) => {
    // console.log(index);
    setSelectedTab(index);
  };

  // console.log('selected tab: ', selectedTab);

  return isSuccess ? (
    <Container  fluid className='sliderContainer pt-5' >
      <Row>
        <Col className="tab" xs={12} sm={12} md={12} lg={10} >
          <Carousel
            autoPlaySpeed={2000}
            className="slide-show"
            activeIndex={selectedTab}
            indicators={false}
            prevIcon={
              <div
                onClick={() => {
                  if (selectedTab - 1 < data?.data.result.sliderList.length) {
                    setSelectedTab(0);
                  } else {
                    setSelectedTab(selectedTab - 1);
                  }
                }}
              >
                <IoIosArrowBack
                  className="backIconSlider"
                  style={{
                    fontSize: '24px',
                    color: 'white',
                    position: 'relative',
                    top: '-40px',
                    left: '-50px',
                  }}
                />
              </div>
            }
            nextIcon={
              <div
                onClick={() => {
                  if (selectedTab + 1 < data?.data.result.sliderList.length) {
                    setSelectedTab(selectedTab + 1);
                  } else {
                    setSelectedTab(0);
                  }
                }}
              >
                <IoIosArrowForward
                className="nextIconSlider"
                  style={{
                    fontSize: '24px',
                    color: 'white',
                    position: 'relative',
                    top: '-40px',
                    left: '20px',
                  }}
                />
              </div>
            }
          >
            {data?.data.result.sliderList.map((slide, index) => {
              return (
                <Carousel.Item key={index} className="slide-show-item">
                  <a className="" href={`${slide.linkAddress}`} >
                    <img
                      className="rounded-lg imgSliderNews "
                      alt="first slide1"
                      style={{ width: '100%', height: '80%' }}
                      src={
                        process.env.REACT_APP_PUBLIC_PATH +
                        '/' +
                        correctUploadPath(slide.imagePath)
                      }
                    />
                  </a>
                  <a className="" href={`${slide.linkAddress}`}>
                    <Carousel.Caption className="slider-caption ">
                      <h5 className="slider-caption-title ">{slide.title}</h5>
                      <p className="slider-caption-text ">{slide.description}</p>
                    </Carousel.Caption>
                  </a>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Col>
        <Col
          className="sliderNewsTab"
          xs={0}
          sm={0}
          md={0}
          lg={2}
          
          
          style={{}}
        >
          {data?.data.result.sliderList.map((slide, index) => (
            <div
              key={index}
              className={` mb-2  ${selectedTab === index ? 'active' : ''}`}
            >
              <Row>
                <a
                  className=""
                  // href={slide.linkAddress}
                  onClick={() => handleTabClick(index)}
                  style={{ width: '200px', height: '100px', borderRadius:'25px',marginLeft:'30px' }}
                >
              
                    <img
                      className={` grayscale-filter   ${
                        selectedTab === index
                          ? 'active grayscale-filter-selected'
                          : ''
                      }`}
                      alt={`slide-${index}`}
                      style={{ width: '100%', height: '100%', borderRadius:'5px' }}
                      src={
                        process.env.REACT_APP_PUBLIC_PATH +
                        '/' +
                        correctUploadPath(slide.imagePath)
                      }
                    />
                 
                </a>
              </Row>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  ) : (
    <></>
  );
};

export default SlideShow;
