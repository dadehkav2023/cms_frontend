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

const Announcement = () => {
  const { data, isLoading, isError, isSuccess } = UseGetMap();
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
    <section className="announcement-section">
      <Container fluid className="announcements-container">
        <Row>
          <Col xl={8}>
            <Row>
              <Col lg={12}>
                <span className="provinces-title pr-lg-5 pt-lg-5">
                  استان ها
                </span>
              </Col>
            </Row>
            <Row className="provinces-detail-row">
              <Col className="provinces-news pr-5 pr-lg-0" xl={5}>
                <span>{provinces[currentProvince]}</span>
                <p className="province-description">
                  {currentProvince === 0
                    ? 'جهت مشاهده توضیحات هر استان ماوس(موشواره) را بر بروی مکان آن از روی نقشه ببرید و جهت مشاهوه وبسایت استان مورد نظر روی موقعیت مکانی آن کلیک کنید'
                    : data.data.result
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
          <Col xl={4} className='mb-5'>
            <span className="announcements-title pr-lg-5 pt-lg-5 mt-lg-4 mb-lg-0 ">
              بیانیه و اطلاعیه
            </span>
            <Row className="statement-card" style={{ direction: 'rtl' }}>
              {StatementsData?.status < 300 ? (
                StatementsData?.data.result.statementList[0] &&
                (StatementsIsError || StatementsIsSuccess) ? (
                  StatementsData?.data.result.statementList.map(
                    (news, index) => (
                      <div key={index}>
                        <div className="row ">
                          <div className="col ">
                            <div
                              className="custom-style "
                              to={`/Statement/Statements/${news.id}`}
                            >
                              <StatementsGridFlashCard statement={news} />
                            </div>
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
              <div dir='ltr' className="w-100 d-flex justify-content-start ">
               
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
