import React, { useEffect } from "react";
import { Carousel } from "react-bootstrap";

import "./slideShow.scss";
import { UseGetSlides } from "../../../core/services/api/get-slides";
import { correctUploadPath } from "../../../core/utils/image-path-correction";
import { useSelector } from "react-redux";

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
  return isSuccess ? (
    <Carousel autoPlaySpeed={2000} className="slide-show">
      {data?.data.result.sliderList.map((slide, index) => {
        return (
          <Carousel.Item key={index} className="slide-show-item">
            <a href={slide.linkAddress}>
              <img
                alt="first slide1"
                className="d-block w-100"
                src={
                  process.env.REACT_APP_PUBLIC_PATH +
                  "/" +
                  correctUploadPath(slide.imagePath)
                }
              />
            </a>
            <a href={slide.linkAddress}>
              <Carousel.Caption className="slider-caption">
                <h5 className="slider-caption-title">{slide.title}</h5>
                <p className="slider-caption-text">{slide.description}</p>
              </Carousel.Caption>
            </a>
          </Carousel.Item>
        );
      })}
    </Carousel>
  ) : (
    <></>
  );
};

export default SlideShow;
