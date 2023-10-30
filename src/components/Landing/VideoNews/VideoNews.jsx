import React, { useEffect, useState } from "react";
import "./VideoNews.scss";
import SectionTitle from "../../common/SectionTitle/SectionTitle";
import VideoNewsFlashCard from "./VideoNewsFlashCard/VideoNewsFlashCard";
import { Col, Container, Row, Tabs, Tab } from "react-bootstrap";
import Carousel from "react-elastic-carousel";
import "./VideoNews.scss";
import { UseGetCategories } from "../../../core/services/api/get-news-categories";
import { UseGetVideoNews } from "../../../core/services/api/get-video-news";
import { FallBackSpinner } from "../../common/Spinner/FallBackSpinner/FallbackSpinner";
import MoreItemsButton from "../../common/Buttons/MoreItemsButton/MoreItemsButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const VideoNews = () => {
  const state = useSelector((state) => state.setting);
  const breakPoints = [
    { width: 400, itemsToShow: 1 },
    { width: 800, itemsToShow: 2 },
    { width: 1200, itemsToShow: 3 },
    { width: 1600, itemsToShow: 4 },
    { width: 2000, itemsToShow: 5 },
  ];
  const [selectedCategory, setSelectedCategory] = useState(0);
  const {
    data: categoryData,
    isError: categoryIsError,
    isLoading: categoryIsLoading,
    isSuccess: categoryIsSuccess,
  } = UseGetCategories();
  const {
    data: VideoNewsData,
    isError: VideoNewsIsError,
    isLoading: VideoNewsIsLoading,
    isSuccess: VideoNewsIsSuccess,
    mutate: VideoNewsMutate,
  } = UseGetVideoNews();

  useEffect(() => {
    categoryData &&
      categoryData.data &&
      categoryData.data.result[0] &&
      setSelectedCategory(categoryData.data.result[0].id);
  }, [categoryData]);

  useEffect(() => {
    VideoNewsMutate({
      page: 1,
      pageSize: state.homePageNewsCount,
      categoryIds: [selectedCategory],
      isActive: true,
    });
  }, [selectedCategory, state.homePageNewsCount]);
  return categoryIsSuccess ? (
    <>
      {categoryData.data.result[0] ? (
        <>
          <section className="video-news-section">
            <SectionTitle TitleText="ویدئو" />
            <Tabs
              onSelect={(e) => {
                setSelectedCategory(+e);
              }}
              className="video-news-tab"
              defaultActiveKey={categoryData.data.result[0].id}
            >
              {categoryData.data.result.map((category, index) => {
                return (
                  <Tab
                    key={index}
                    id={category.id}
                    eventKey={category.id}
                    title={category.title}
                  >
                    <Carousel
                      itemPosition="START"
                      isRTL
                      breakPoints={breakPoints}
                    >
                      {VideoNewsData && VideoNewsData.data ? (
                        VideoNewsData.data.result.newsList[0] &&
                        (VideoNewsIsError || VideoNewsIsSuccess) ? (
                          VideoNewsData.data.result.newsList.map(
                            (news, index) => {
                              return (
                                <Link
                                  key={index}
                                  className="text-news-grid-item"
                                  to={`/News/VideoNews/${news.id}`}
                                >
                                  <VideoNewsFlashCard
                                    title={news.title}
                                    description={news.summaryTitle}
                                    img={news.imagePath}
                                    id={news.id}
                                    date={news.publishedDateTimeAsJalali}
                                  />
                                </Link>
                              );
                            }
                          )
                        ) : (
                          <h2
                            style={{
                              color: "red",
                              textAlign: "center",
                              width: "100%",
                            }}
                          >
                            هیچ اطلاعاتی جهت نمایش وجود ندارد
                          </h2>
                        )
                      ) : (
                        <h1
                          style={{
                            color: "#000",
                            textAlign: "center",
                            width: "100%",
                          }}
                        >
                          لطفا منتظر بمانید
                        </h1>
                      )}
                    </Carousel>
                    <Link
                      style={{
                        color: "rgba(0, 0, 0, 0.5)",
                      }}
                      to="/News/VideoNews"
                    >
                      <MoreItemsButton text="سایر ویدئو ها" />
                    </Link>
                  </Tab>
                );
              })}
            </Tabs>
          </section>
        </>
      ) : (
        <>
          <SectionTitle TitleText="ویدئو" />
          <h2
            style={{
              color: "red",
              textAlign: "center",
              width: "100%",
              margin: "30px 0 30px 0",
            }}
          >
            هیچ اطلاعاتی جهت نمایش وجود ندارد
          </h2>
        </>
      )}
    </>
  ) : (
    <>
      <FallBackSpinner />
    </>
  );
};
export default VideoNews;
