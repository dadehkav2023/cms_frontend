import React, { useEffect, useState } from 'react';
import './TextNewsPage.scss';
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Card, Button, Container, Col, Row, Breadcrumb } from 'react-bootstrap';
import { UseGetTextNews } from '../../../core/services/api/get-text-news';
import TextNewsFlashCard from '../NewsGridFlashCard/NewsGridFlashCard';
import { UseGetCategories } from '../../../core/services/api/get-news-categories';
import { FallBackSpinner } from '../../common/Spinner/FallBackSpinner/FallbackSpinner';
import { useParams, Redirect, useLocation } from 'react-router-dom';
import SectionTitle from '../../common/SectionTitle/SectionTitle';
import mockImage from '../../../assets/img/landing/slid1.jpg';
import telegram from '../../../assets/img/icons/telegram.svg';
import facebook from '../../../assets/img/icons/facebook.svg';
import twitter from '../../../assets/img/icons/twitter.svg';
import instagram from '../../../assets/img/icons/instagram.svg';
import { UseGetTextNewsAttachments } from '../../../core/services/api/get-text-news-attachments';
import Carousel from 'react-elastic-carousel';
import TextNews from '../../Landing/TextNews/TextNews';
import { englishNumbersToPersian } from '../../../core/utils/englishNumbersToPersian';
import SocialMedia from '../../common/Social/socialMedia';

const TextNewsPage = () => {
  // const breadcrumbText = 'Category 2 / 1402/08/13';
  // const modifiedBreadcrumbText = breadcrumbText.replace(/\//g, ' > ');

  const location = useLocation();
  const [newsData, setNewsData] = useState();

  useEffect(() => {
    // console.log('location.state.newsData:', location.state.newsData);
    setNewsData(location?.state?.newsData);
  }, [location?.state?.newsData]);

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
    <div style={{ textAlign: 'center' }}>
      <p>اطلاعات مورد نظر شما یافت نشد</p>
      <Redirect to="/News/TextNews" />
    </div>
  ) : (
    <div className="">
      <section className="text-news-page">
        <Container fluid>
          <Row>
            <h5 className="text-news-head-title">{newsData?.headTitle}</h5>
          </Row>
        </Container>

        <SectionTitle TitleText={newsData?.title} />
        <h4 className="text-news-sub-title">{newsData?.subTitle}</h4>
        <img
          src={`${process.env.REACT_APP_PUBLIC_PATH}/${newsData?.imagePath}`}
          alt="news"
        />
        <p
          className="text-news-lead"
          dangerouslySetInnerHTML={{
            __html: newsData?.lead,
          }}
        />
        <p
          className="text-news-content"
          dangerouslySetInnerHTML={{
            __html: newsData?.content,
          }}
        />

        {attachmentData.data.result.newsAttachmentList[0] && (
          <>
            <SectionTitle TitleText="Attachments" />{' '}
            <Carousel isRTL breakPoints={breakPoints}>
              {attachmentData && attachmentData.data ? (
                attachmentData.data.result.newsAttachmentList.map(
                  (attachment, index) => {
                    return (
                      <Card
                        key={index}
                        style={{ width: '18rem', textAlign: 'center' }}
                      >
                        <Card.Body>
                          <Card.Title>
                            Attachment Title: {attachment.title}
                          </Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            File Type: {attachment.fileTypeText}
                          </Card.Subtitle>
                          <Card.Text>
                            Click the button below to view the attachment
                          </Card.Text>
                          <Card.Link
                            href={`${process.env.REACT_APP_PUBLIC_PATH}/${attachment.attachmentFile}`}
                          >
                            <Button>Download Attachment</Button>
                          </Card.Link>
                        </Card.Body>
                      </Card>
                    );
                  }
                )
              ) : (
                <h1>Please wait</h1>
              )}
            </Carousel>{' '}
          </>
        )}
        <Container fluid>
          <Row>
            <Breadcrumb className="custom-breadcrumb ">
              <Breadcrumb.Item>
                <span
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {textNewsData?.data.result.newsList[0].newsCategories.map(
                    (category, index) => {
                      return (
                        <p key={index}>
                          {index === 0
                            ? category.title
                            : ` - ${category.title} `}{' '}
                          {/* Replace '/' with '>' here */}
                        </p>
                      );
                    }
                  )}
                </span>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="#" active>
                <span
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {englishNumbersToPersian(
                    textNewsData?.data.result.newsList[0]
                      .publishedDateTimeAsJalali
                  ).replace(/\//g, '-')}{' '}
                </span>
              </Breadcrumb.Item>
            </Breadcrumb>
          </Row>
        </Container>
      </section>
      <hr className="custom-hr" />
      <div className="container-fluid pr-5 ">
        <TextNews newsData={newsData} />
      </div>
    </div>
  );
};

export default TextNewsPage;
