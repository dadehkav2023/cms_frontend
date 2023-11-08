import React, { useEffect, useState } from 'react';
import { Carousel, Container, Row } from 'react-bootstrap';

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
    setSelectedTab(index);
  };

  console.log('selected tab: ', selectedTab);

  return isSuccess ? (
    <Container fluid>
      <div className="row">
        <div className="col-10 mt-3 tab">
          <Carousel
            autoPlaySpeed={2000}
            className="slide-show"
            activeIndex={selectedTab}
            indicators={false}
            
          >
            {data?.data.result.sliderList.map((slide, index) => {
              return (
                <Carousel.Item key={index} className="slide-show-item">
                  <a className="" href={slide.linkAddress}>
                    <img
                      className="rounded-lg "
                      alt="first slide1"
                      width={1200}
                      height={500}
                      src={
                        process.env.REACT_APP_PUBLIC_PATH +
                        '/' +
                        correctUploadPath(slide.imagePath)
                      }
                    />
                  </a>
                  <a className="col-6 slider-caption" href={slide.linkAddress}>
                    <Carousel.Caption className="slider-caption">
                      <h5 className="slider-caption-title">{slide.title}</h5>
                      <p className="slider-caption-text">{slide.description}</p>
                    </Carousel.Caption>
                  </a>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>

        <div className="col-2 mt-3 detailTab">
          {data?.data.result.sliderList.map((slide, index) => (
            <div
              key={index}
              className={`col-md-4 mb-4 ${
                selectedTab === index ? 'active' : ''
              }`}
            >
              <Row>
                <a
                  className=""
                  href={slide.linkAddress}
                  onClick={() => handleTabClick(index)}
                >
                  <img
                    className="rounded-lg"
                    alt={`slide-${index}`}
                    width={200}
                    height={100}
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
        </div>
      </div>
    </Container>
  ) : (
    <></>
  );
};

export default SlideShow;
