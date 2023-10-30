import React, { useEffect, useState } from "react";
import "./VideoNewsPage.scss";
import { Card, Button, Container, Col, Row } from "react-bootstrap";
import { FallBackSpinner } from "../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { useParams, Redirect } from "react-router-dom";
import SectionTitle from "../../common/SectionTitle/SectionTitle";
import mockImage from "../../../assets/img/landing/slid1.jpg";
import telegram from "../../../assets/img/icons/telegram.svg";
import facebook from "../../../assets/img/icons/facebook.svg";
import twitter from "../../../assets/img/icons/twitter.svg";
import instagram from "../../../assets/img/icons/instagram.svg";
import Carousel from "react-elastic-carousel";
import { UseGetVideoNewsAttachments } from "../../../core/services/api/get-video-news-attachments";
import { UseGetVideoNews } from "../../../core/services/api/get-video-news";
import { englishNumbersToPersian } from "../../../core/utils/englishNumbersToPersian";

const VideoNewsPage = () => {
  const { id } = useParams();
  const {
    data: videoNewsData,
    isError: videoNewsIsError,
    isLoading: videoNewsIsLoading,
    isSuccess: videoNewsIsSuccess,
    mutate: videoNewsMutate,
  } = UseGetVideoNews();
  const {
    data: attachmentData,
    isError: attachmentIsError,
    isLoading: attachmentIsLoading,
    isSuccess: attachmentIsSuccess,
    mutate: attachmentMutate,
  } = UseGetVideoNewsAttachments();
  useEffect(() => {
    videoNewsMutate({ page: 1, pageSize: 1, id: id, isActive: true });
    attachmentMutate({ Id: id, isActive: true });
  }, []);

  const breakPoints = [
    { width: 400, itemsToShow: 1 },
    { width: 800, itemsToShow: 2 },
    { width: 1200, itemsToShow: 3 },
    { width: 1600, itemsToShow: 4 },
  ];

  return videoNewsIsLoading || !videoNewsIsSuccess || attachmentIsLoading ? (
    <FallBackSpinner />
  ) : !videoNewsData?.data.result.newsList[0] &&
    (videoNewsIsSuccess || videoNewsIsError) ? (
    <div style={{ textAlign: "center" }}>
      <p>اطلاعات مورد نظر شما یافت نشد</p>
      <Redirect to="/News/VideoNews" />
    </div>
  ) : (
    <>
      <section className="video-news-page">
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
              <p className="video-news-date">
                {englishNumbersToPersian(
                  videoNewsData?.data.result.newsList[0]
                    .publishedDateTimeAsJalali
                )}
              </p>
            </Col>
            <Col lg={4} className="category-box">
              {videoNewsData?.data.result.newsList[0].newsCategories.map(
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
          TitleText={videoNewsData?.data.result.newsList[0].title}
        />

        <img
          src={`${process.env.REACT_APP_PUBLIC_PATH}/${videoNewsData?.data.result.newsList[0].imagePath}`}
          alt="news"
        />
        <p
          className="video-news-summary"
          dangerouslySetInnerHTML={{
            __html: videoNewsData?.data.result.newsList[0].summary,
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
                          <Card.Title>تیتر فیلم :{attachment.title}</Card.Title>

                          <video width="350" height="240" controls>
                            <source
                              src={`${process.env.REACT_APP_PUBLIC_PATH}/${attachment.videoPath}`}
                            />
                            مرورگر شما از پخش ویدیو پشتیبانی نمیکند
                          </video>

                          <Card.Text style={{ marginTop: "30px" }}>
                            جهت دریافت پیوست از دکمه زیر استفاده کنید
                          </Card.Text>
                          <Card.Link
                            href={`${process.env.REACT_APP_PUBLIC_PATH}/${attachment.videoPath}`}
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
export default VideoNewsPage;
