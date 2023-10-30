import React, { useEffect, useState } from "react";
import "./TextNewsPage.scss";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Card, Button, Container, Col, Row } from "react-bootstrap";
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
import { UseGetTextNewsAttachments } from "../../../core/services/api/get-text-news-attachments";
import Carousel from "react-elastic-carousel";
import TextNews from "../../Landing/TextNews/TextNews";
import { englishNumbersToPersian } from "../../../core/utils/englishNumbersToPersian";
import SocialMedia from "../../common/Social/socialMedia";

const TextNewsPage = () => {
  const { id } = useParams();
  const {
    data: textNewsData,
    isError: textNewsIsError,
    isLoading: textNewsIsLoading,
    isSuccess: textNewsIsSuccess,
    mutate: textNewsMutate,
  } = UseGetTextNews();
  const {
    data: attachmentData,
    isError: attachmentIsError,
    isLoading: attachmentIsLoading,
    isSuccess: attachmentIsSuccess,
    mutate: attachmentMutate,
  } = UseGetTextNewsAttachments();
  useEffect(() => {
    textNewsMutate({ page: 1, pageSize: 1, id: id, isActive: true });
    attachmentMutate({ Id: id, isActive: true });
  }, []);

  const breakPoints = [
    { width: 500, itemsToShow: 1 },
    { width: 1000, itemsToShow: 2 },
    { width: 1500, itemsToShow: 3 },
  ];

  return textNewsIsLoading || !textNewsIsSuccess || attachmentIsLoading ? (
    <FallBackSpinner />
  ) : !textNewsData?.data.result.newsList[0] &&
    (textNewsIsSuccess || textNewsIsError) ? (
    <div style={{ textAlign: "center" }}>
      <p>اطلاعات مورد نظر شما یافت نشد</p>
      <Redirect to="/News/TextNews" />
    </div>
  ) : (
    <>
      <section className="text-news-page">
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
              <p className="text-news-date">
                {englishNumbersToPersian(
                  textNewsData?.data.result.newsList[0]
                    .publishedDateTimeAsJalali
                )}
              </p>
            </Col>
            <Col lg={4} className="category-box">
              {textNewsData?.data.result.newsList[0].newsCategories.map(
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
        <h5 className="text-news-head-title">
          {textNewsData?.data.result.newsList[0].headTitle}
        </h5>
        <SectionTitle TitleText={textNewsData?.data.result.newsList[0].title} />
        <h4 className="text-news-sub-title">
          {textNewsData?.data.result.newsList[0].subTitle}
        </h4>
        <img
          src={`${process.env.REACT_APP_PUBLIC_PATH}/${textNewsData?.data.result.newsList[0].imagePath}`}
          alt="news"
        />
        <p
          className="text-news-lead"
          dangerouslySetInnerHTML={{
            __html: textNewsData?.data.result.newsList[0].lead,
          }}
        />
        <p
          className="text-news-content"
          dangerouslySetInnerHTML={{
            __html: textNewsData?.data.result.newsList[0].content,
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
                        style={{ width: "18rem", textAlign: "center" }}
                      >
                        <Card.Body>
                          <Card.Title>
                            تیتر پیوست :{attachment.title}
                          </Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            پسوند فایل :{attachment.fileTypeText}
                          </Card.Subtitle>
                          <Card.Text>
                            جهت مشاهده پیوست از دکمه زیر استفاده کنید
                          </Card.Text>
                          <Card.Link
                            href={`${process.env.REACT_APP_PUBLIC_PATH}/${attachment.attachmentFile}`}
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
      <TextNews />
    </>
  );
};
export default TextNewsPage;
