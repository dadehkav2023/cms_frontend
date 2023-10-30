import React, { useEffect, useState } from "react";
import "./PhotoNewsPage.scss";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Card, Button, Col, Row, Container } from "react-bootstrap";
import { UseGetTextNews } from "../../../core/services/api/get-text-news";
import TextNewsFlashCard from "../NewsGridFlashCard/NewsGridFlashCard";
import { UseGetCategories } from "../../../core/services/api/get-news-categories";
import { FallBackSpinner } from "../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { useParams, Redirect } from "react-router-dom";
import SectionTitle from "../../common/SectionTitle/SectionTitle";
import mockImage from "../../../assets/img/landing/slid1.jpg";
import telegram from "../../../assets/img/icons/telegram.svg";
import facebook from "../../../assets/img/icons/facebook.svg";
import twitter from "../../../assets/img/icons/twitter.svg";
import instagram from "../../../assets/img/icons/instagram.svg";
import Carousel from "react-elastic-carousel";
import { UseGetPhotoNewsAttachments } from "../../../core/services/api/get-photo-news-attachments";
import { UseGetPhotoNews } from "../../../core/services/api/get-photo-news";
import { englishNumbersToPersian } from "../../../core/utils/englishNumbersToPersian";

const PhotoNewsPage = () => {
  const { id } = useParams();
  const {
    data: photoNewsData,
    isError: photoNewsIsError,
    isLoading: photoNewsIsLoading,
    isSuccess: photoNewsIsSuccess,
    mutate: photoNewsMutate,
  } = UseGetPhotoNews();
  const {
    data: attachmentData,
    isError: attachmentIsError,
    isLoading: attachmentIsLoading,
    isSuccess: attachmentIsSuccess,
    mutate: attachmentMutate,
  } = UseGetPhotoNewsAttachments();
  useEffect(() => {
    photoNewsMutate({ page: 1, pageSize: 1, id: id, isActive: true });
    attachmentMutate({ Id: id });
  }, []);

  const breakPoints = [
    { width: 400, itemsToShow: 1 },
    { width: 800, itemsToShow: 2 },
    { width: 1200, itemsToShow: 3 },
    { width: 1600, itemsToShow: 4 },
  ];

  return photoNewsIsLoading || !photoNewsIsSuccess || attachmentIsLoading ? (
    <FallBackSpinner />
  ) : !photoNewsData?.data.result.newsList[0] &&
    (photoNewsIsSuccess || photoNewsIsError) ? (
    <div style={{ textAlign: "center" }}>
      <p>اطلاعات مورد نظر شما یافت نشد</p>
      <Redirect to="/News/PhotoNews" />
    </div>
  ) : (
    <>
      <section className="photo-news-page">
        <Container fluid>
          <Row>
            <Col lg={4}>
              <div className="share-news">
                <img src={facebook} alt="facebook" />
                <img src={telegram} alt="telegram" />
                <img src={instagram} alt="instagram" />
                <img src={twitter} alt="twitter" />
              </div>
            </Col>
            <Col lg={4}>
              <p className="photo-news-date">
                {englishNumbersToPersian(
                  photoNewsData?.data.result.newsList[0]
                    .publishedDateTimeAsJalali
                )}
              </p>
            </Col>
            <Col lg={4} className="category-box">
              {photoNewsData?.data.result.newsList[0].newsCategories.map(
                (category, index) => {
                  return (
                    <p key={index}>
                      {index === 0 ? category.title : ` / ${category.title} `}
                    </p>
                  );
                }
              )}
            </Col>
          </Row>
          <hr />
        </Container>
        <SectionTitle
          TitleText={photoNewsData?.data.result.newsList[0].title}
        />

        <img
          src={`${process.env.REACT_APP_PUBLIC_PATH}/${photoNewsData?.data.result.newsList[0].imagePath}`}
          alt="news"
        />
        <p
          className="photo-news-summary"
          dangerouslySetInnerHTML={{
            __html: photoNewsData?.data.result.newsList[0].summary,
          }}
        />

        {attachmentData.data.result.newsAttachmentList[0] && (
          <>
            <SectionTitle TitleText="پیوست ها" />{" "}
            <Carousel isRTL breakPoints={breakPoints}>
              {attachmentData && attachmentData.data ? (
                attachmentData.data.result.newsAttachmentList.map(
                  (attachment, index) => {
                    return (
                      <Card
                        key={index}
                        style={{
                          width: "400px",
                          textAlign: "center",
                          marginBottom: "100px",
                        }}
                      >
                        <Card.Body>
                          <Card.Title>تیتر عکس :{attachment.title}</Card.Title>
                          <a
                            href={`${process.env.REACT_APP_PUBLIC_PATH}/${attachment.imagePath}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Card.Img
                              variant="top"
                              src={`${process.env.REACT_APP_PUBLIC_PATH}/${attachment.imagePath}`}
                            />
                          </a>

                          <Card.Text style={{ marginTop: "30px" }}>
                            جهت مشاهده پیوست از دکمه زیر استفاده کنید
                          </Card.Text>
                          <Card.Link
                            href={`${process.env.REACT_APP_PUBLIC_PATH}/${attachment.imagePath}`}
                            download
                          >
                            <Button>دریافت پیوست</Button>
                          </Card.Link>
                        </Card.Body>
                      </Card>
                    );
                  }
                )
              ) : (
                <h1>لطفا منتظر بمانید</h1>
              )}
            </Carousel>{" "}
          </>
        )}
      </section>
    </>
  );
};
export default PhotoNewsPage;
