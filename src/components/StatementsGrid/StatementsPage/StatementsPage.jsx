import React, { useEffect, useState } from 'react';
import './StatementsPage.scss';
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Card, Button, Container, Col, Row, Breadcrumb } from 'react-bootstrap';
import StatementsFlashCard from '../StatementsGridFlashCard/StatementsGridFlashCard';
import { UseGetCategories } from '../../../core/services/api/get-news-categories';
import { FallBackSpinner } from '../../common/Spinner/FallBackSpinner/FallbackSpinner';
import { useParams, Redirect } from 'react-router-dom';
import SectionTitle from '../../common/SectionTitle/SectionTitle';
import mockImage from '../../../assets/img/landing/slid1.jpg';
import telegram from '../../../assets/img/icons/telegram.svg';
import facebook from '../../../assets/img/icons/facebook.svg';
import twitter from '../../../assets/img/icons/twitter.svg';
import instagram from '../../../assets/img/icons/instagram.svg';
import Carousel from 'react-elastic-carousel';
import { englishNumbersToPersian } from '../../../core/utils/englishNumbersToPersian';
import SocialMedia from '../../common/Social/socialMedia';
import { UseGetStatement } from '../../../core/services/api/get-statement';
import { UseGetStatementAttachments } from '../../../core/services/api/get-statement-attachments';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StatementsPage = () => {
  const { id } = useParams();
  const breadcrumbText = 'Category 2 / 1402/08/13';
  const modifiedBreadcrumbText = breadcrumbText.replace(/\//g, ' > ');
  const location = useLocation();
  const [manifestData, setManifestData] = useState();
  // console.log('test: ', location?.state?.manifestData);

  useEffect(() => {
    console.log('location.state.manifestData:', location.state.manifestData);
    setManifestData(location?.state?.manifestData);
  }, [location.state]);

  const {
    data: StatementsData,
    isError: StatementsIsError,
    isLoading: StatementsIsLoading,
    isSuccess: StatementsIsSuccess,
    mutate: StatementsMutate,
  } = UseGetStatement();
  const {
    data: attachmentData,
    isError: attachmentIsError,
    isLoading: attachmentIsLoading,
    isSuccess: attachmentIsSuccess,
    mutate: attachmentMutate,
  } = UseGetStatementAttachments();
  useEffect(() => {
    StatementsMutate({ page: 1, pageSize: 1, id: id, isActive: true });
    attachmentMutate({ Id: id, isActive: true, Title: '' });
  }, []);

  const breakPoints = [
    { width: 500, itemsToShow: 1 },
    { width: 1000, itemsToShow: 2 },
    { width: 1500, itemsToShow: 3 },
  ];

  return StatementsIsLoading || !StatementsIsSuccess || attachmentIsLoading ? (
    <FallBackSpinner />
  ) : !StatementsData?.data?.result.statementList[0] &&
    (StatementsIsSuccess || StatementsIsError) ? (
    <div style={{ textAlign: 'center' }}>
      <p>اطلاعات مورد نظر شما یافت نشد</p>
      <Redirect to="/Statement/Statements" />
    </div>
  ) : (
    <>
     
        <Container fluid>
        <section className="statement-page">
          <Row>
            <h4 className="statement-head-title">{manifestData?.title}</h4>
            <div className="image-container">
              <img
                src={`${process.env.REACT_APP_PUBLIC_PATH}/${manifestData?.imagePath}`}
                alt="statement"
              />
            </div>

            <p
              className="statement-description"
              dangerouslySetInnerHTML={{
                __html: manifestData?.description,
              }}
            />
          </Row>
          <Row className='bread-crumb-container'>
            <Breadcrumb
              className="custom-breadcrumb "
              style={
                {
                  // minWidth: '800px',
                  // maxWidth: '800px',
                }
              }
            >
              <Breadcrumb.Item href="#" active>
                <span
                className='statement-date'
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {englishNumbersToPersian(
                    StatementsData?.data?.result.statementList[0]
                      .publishedDateTimeAsJalali
                  )}
                </span>
               
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {StatementsData?.data?.result.statementList[0].statementCategories.map(
                    (category, index) => {
                      return (
                        <p key={index}>
                          {index === 0
                            ? category.title
                            : ` / ${category.title} `}
                        </p>
                      );
                    }
                  )}
                </span>
              </Breadcrumb.Item>
            </Breadcrumb>
          </Row>
          </section>
        </Container>

        {/* <Row>
            <Col lg={}>
              <div className="share-statement">
                <img src={facebook} alt="facebook" />
                <img src={telegram} alt="telegram" />
                <img src={instagram} alt="instagram" />
                <img src={twitter} alt="twitter" />
              </div>
            </Col>
            <Col lg={4}>
              <p className="statement-date">
                {englishNumbersToPersian(
                  StatementsData?.data?.result.statementList[0]
                    .publishedDateTimeAsJalali
                )}
              </p>
            </Col>
            <Col lg={4} className="category-box">
              {StatementsData?.data?.result.statementList[0].statementCategories.map(
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
          <hr /> */}

        {/* {attachmentData?.data?.result?.statementAttachmentList[0] && (
          <>
            <SectionTitle TitleText="پیوست ها" />{' '}
            <Carousel isRTL breakPoints={breakPoints}>
              {attachmentData && attachmentData.data ? (
                attachmentData.data?.result.statementAttachmentList.map(
                  (attachment, index) => {
                    return (
                      <Card
                        key={index}
                        style={{
                          width: '18rem',
                          textAlign: 'center',
                          marginBottom: '100px',
                        }}
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
            </Carousel>{' '}
          </>
        )} */}
    
    </>
  );
};
export default StatementsPage;
