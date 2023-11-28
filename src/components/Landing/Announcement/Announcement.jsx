import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { UseGetMap } from '../../../core/services/api/get-map';
import { UseGetStatement } from '../../../core/services/api/get-statement';
import { FallBackSpinner } from '../../common/Spinner/FallBackSpinner/FallbackSpinner';
import './Announcement.scss';
import IranMap from './IranMap/IranMap';
import StatementsGridFlashCard from '../../StatementsGrid/StatementsGridFlashCard/StatementsGridFlashCard';
import MoreItemsButton from '../../common/Buttons/MoreItemsButton/MoreItemsButton';
import OpenItemButton from '../../common/Buttons/OpenItemButton/OpenItemButton';
import SectionTitle from '../../common/SectionTitle/SectionTitle';
import { Link } from 'react-router-dom';

const Announcement = () => {
  const { data, isLoading, isError, isSuccess } = UseGetMap();
  // const scrollToTop = () => {
  //   window.scrollTo(0, 0); // Scroll to the top of the page
  // };
  const [currentProvince, setCurrentProvince] = useState(0);
  const provinces = [
    'استان ها',
    'آذربایجان شرقی',
    'آذربایجان غربی',
    'اردبیل',
    'اصفهان',
    'البرز',
    'ایلام',
    'بوشهر',
    'تهران',
    'چهارمحال وبختیاری',
    'خراسان جنوبی',
    'خراسان رضوی',
    'خراسان شمالی',
    'خوزستان',
    'زنجان',
    'سمنان',
    'سیستان وبلوچستان',
    'فارس',
    'قزوین',
    'قم',
    'کردستان',
    'کرمان',
    'کرمانشاه',
    'کهگیلویه وبویراحمد',
    'گلستان',
    'گیلان',
    'لرستان',
    'مازندران',
    'مرکزی',
    'هرمزگان',
    'همدان',
    'یزد',
  ];

  useEffect(() => {}, [currentProvince]);

  const state = useSelector((state) => state.setting);

  const {
    data: StatementsData,
    isError: StatementsIsError,
    isLoading: StatementsIsLoading,
    isSuccess: StatementsIsSuccess,
    mutate: StatementsMutate,
  } = UseGetStatement();

  useEffect(() => {
    StatementsMutate({
      page: 1,
      // pageSize: pageSize,
      isActive: true,
    });
  }, []);

  return isLoading ? (
    <FallBackSpinner />
  ) : (
    <section className="announcement-section ">
      <Container fluid className="announcements-container pr-lg-5 pt-lg-5">
        <Row>
          <Col xl={8}>
            <Row className="province-title">
              <Col lg={10}>
                <SectionTitle TitleText="استان ها" />
              </Col>
            </Row>
            <Row className="provinces-detail-row">
              <Col className="provinces-news pr-5 pr-lg-0" xl={5}>
                <span className="provinces-title-news">
                  {provinces[currentProvince]}
                </span>
                <p className="province-description">
                  {currentProvince === 0
                    ? 'جهت مشاهده توضیحات هر استان ماوس(موشواره) را بر بروی مکان آن از روی نقشه ببرید و جهت مشاهوه وبسایت استان مورد نظر روی موقعیت مکانی آن کلیک کنید'
                    : data?.data?.result
                        .map((item) => item.province.province)
                        .includes(currentProvince)
                    ? data.data.result.filter(
                        (item) => item.province.province === currentProvince
                      )[0].description
                    : 'توضیحاتی برای این استان ثبت نشده است'}
                </p>
              </Col>
              <Col xl={7}>
                <IranMap
                  className=""
                  activeMap={data?.data?.result}
                  currentProvince={currentProvince}
                  setCurrentProvince={setCurrentProvince}
                />
              </Col>
            </Row>
          </Col>
          <Col xl={4} className="mb-5">
            <SectionTitle
              TitleText="بیانیه و اطلاعیه"
              className="statement-title"
            />

            <Row className="statement-card pt-3 pr-2" style={{ direction: 'rtl' }}>
              {StatementsData?.status < 300 ? (
                StatementsData?.data?.result.statementList[0] &&
                (StatementsIsError || StatementsIsSuccess) ? (
                  StatementsData?.data?.result.statementList.map(
                    (news, index) => (
                      <div key={index} className=''>
                        <div className="row ">
                          <div className="col ">
                            <Link
                              style={{
                                color: '#000',
                                textDecoration: 'none',
                              
                              }}
                              to={{
                                pathname: `/Statement/Statements/${news.id}`,
                                state: { manifestData: news },
                              }}
                              // onClick={scrollToTop}
                            >
                              <StatementsGridFlashCard statement={news} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <h2
                    style={{
                      color: 'red',
                      fontSize: '14px',
                      textAlign: 'center',
                      width: '100%',
                      margin: '10% ',
                    }}
                  >
                    هیچ اطلاعاتی جهت نمایش وجود ندارد
                  </h2>
                )
              ) : (
                <div
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    width: '100%',
                    margin: '10% ',
                  }}
                >
                  <h1
                    style={{
                      fontSize: '14px',
                      color: '#065cfd',
                      width: '100%',
                    }}
                  >
                    لطفا منتظر بمانید...
                  </h1>
                  <div className="spinner"></div>
                </div>
              )}
              <div dir="ltr" className="w-100 d-flex justify-content-start ">
                <OpenItemButton text="مشاهده بیشتر" />
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Announcement;
