import React, { useEffect, useState } from "react";
import "./PeoplesVoicePage.scss";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Card, Button, Container, Col, Row } from "react-bootstrap";
import { FallBackSpinner } from "../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { useParams, Redirect } from "react-router-dom";
import SectionTitle from "../../common/SectionTitle/SectionTitle";
import telegram from "../../../assets/img/icons/telegram.svg";
import facebook from "../../../assets/img/icons/facebook.svg";
import twitter from "../../../assets/img/icons/twitter.svg";
import instagram from "../../../assets/img/icons/instagram.svg";
import { UseGetTextNewsAttachments } from "../../../core/services/api/get-text-news-attachments";
import Carousel from "react-elastic-carousel";
import { englishNumbersToPersian } from "../../../core/utils/englishNumbersToPersian";
import { UseGetChallenge } from "../../../core/services/api/get-challenge";
import { UseGetChallengeDetails } from "../../../core/services/api/get-challenge-details";
import PeoplesVoiceSignButton from "../../common/Buttons/PeoplesVoiceSignButton/PeoplesVoiceSignButton";
import { UseSignChallenge } from "../../../core/services/api/sign-challenge";

const PeoplesVoicePage = () => {
  const { id } = useParams();

  const {
    data: challengesData,
    isError: challengesIsError,
    isLoading: challengesIsLoading,
    isSuccess: challengesIsSuccess,
    mutate: challengesMutate,
  } = UseGetChallenge();
  const {
    data: detailsData,
    isError: detailsIsError,
    isLoading: detailsIsLoading,
    isSuccess: detailsIsSuccess,
    mutate: detailsMutate,
  } = UseGetChallengeDetails();
  useEffect(() => {
    challengesMutate({ page: 1, pageSize: 1, id: id, isActive: true });
    detailsMutate({ Id: id });
  }, []);

  const breakPoints = [
    { width: 500, itemsToShow: 1 },
    { width: 1000, itemsToShow: 2 },
    { width: 1500, itemsToShow: 3 },
  ];

  return challengesIsLoading ||
    !challengesIsSuccess ||
    detailsIsLoading ||
    !detailsIsSuccess ? (
    <FallBackSpinner />
  ) : !challengesData?.data.result.challenges[0] &&
    (challengesIsSuccess || challengesIsError) ? (
    <div style={{ textAlign: "center" }}>
      <p>اطلاعات مورد نظر شما یافت نشد</p>
      <Redirect to="/Challenges" />
    </div>
  ) : (
    <>
      <section className="peoples-voice-page">
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
              <p className="peoples-voice-date">
                {englishNumbersToPersian(
                  challengesData?.data.result.challenges[0]
                    .endDateTimeShowAsJalali
                )}{" "}
                :تاریخ پایان
              </p>
            </Col>
            <Col lg={4} className="category-box">
              <p className="peoples-voice-date">
                {englishNumbersToPersian(
                  challengesData?.data.result.challenges[0]
                    .startDateTimeShowAsJalali
                )}{" "}
                :تاریخ شروع
              </p>
            </Col>
          </Row>
          <hr />
        </Container>
        <h5 className="peoples-voice-head-title">
          :از طرف
          <br />
          <br />
          {challengesData?.data.result.challenges[0].authorFirstName +
            " " +
            challengesData?.data.result.challenges[0].authorLastName}
        </h5>
        <SectionTitle
          TitleText={challengesData?.data.result.challenges[0].title}
        />

        <img
          src={`https://api.farmervoice.agroom.org/${challengesData?.data.result.challenges[0].imagePath}`}
          alt="news"
        />

        <p
          className="peoples-voice-content"
          dangerouslySetInnerHTML={{
            __html: detailsData?.data.result.draftDescription,
          }}
        />
        <div className="sign-area">
          <p className="signParagraph">
            <p>من با این چالش موافقم :</p>
            <PeoplesVoiceSignButton challengeId={id} ButtonText="امضاء" />
          </p>
        </div>
        {/* {attachmentData.data.result.newsAttachmentList[0] && (
          <>
            <SectionTitle TitleText="پیوست ها" />
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
            </Carousel>
          </>
        )} */}
      </section>
    </>
  );
};
export default PeoplesVoicePage;
