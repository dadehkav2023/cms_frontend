import React, { useEffect, useState } from "react";
import "./TextNews.scss";
import SectionTitle from "../../common/SectionTitle/SectionTitle";
import TextNewsFlashCard from "./TextNewsFlashCard/TextNewsFlashCard";
import { Col, Container, Row, Tabs, Tab } from "react-bootstrap";
import Carousel from "react-elastic-carousel";
import "./TextNews.scss";
import { UseGetCategories } from "../../../core/services/api/get-news-categories";
import { UseGetTextNews } from "../../../core/services/api/get-text-news";
import { FallBackSpinner } from "../../common/Spinner/FallBackSpinner/FallbackSpinner";
import MoreItemsButton from "../../common/Buttons/MoreItemsButton/MoreItemsButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TextNews = () => {
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
    data: textNewsData,
    isError: textNewsIsError,
    isLoading: textNewsIsLoading,
    isSuccess: textNewsIsSuccess,
    mutate: textNewsMutate,
  } = UseGetTextNews();

  useEffect(() => {
    categoryData &&
      categoryData.data &&
      categoryData.data.result[0] &&
      setSelectedCategory(categoryData.data.result[0].id);
  }, [categoryData]);

  useEffect(() => {
    textNewsMutate({
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
          <section className="text-news-section">
            <SectionTitle TitleText="اخبار" />
            <Tabs
              onSelect={(e) => {
                setSelectedCategory(+e);
              }}
              className="text-news-tab"
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
                      {textNewsData && textNewsData.data ? (
                        textNewsData.data.result.newsList[0] &&
                        (textNewsIsError || textNewsIsSuccess) ? (
                          textNewsData.data.result.newsList.map(
                            (news, index) => {
                              return (
                                <Link
                                  key={index}
                                  style={{
                                    color: "#000",
                                    textDecoration: "none",
                                  }}
                                  to={`/News/TextNews/${news.id}`}
                                >
                                  <TextNewsFlashCard
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
                      to="/News/TextNews"
                    >
                      <MoreItemsButton text="سایر اخبار" />
                    </Link>
                  </Tab>
                );
              })}
            </Tabs>
          </section>
        </>
      ) : (
        <>
          <SectionTitle TitleText="اخبار" />
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
export default TextNews;
