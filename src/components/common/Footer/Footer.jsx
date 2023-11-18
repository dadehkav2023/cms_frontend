import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import enamad from '../../../assets/img/landing/enamad.png';
import Backward from '../../../assets/img/landing/icon/Backward.png';
import './Footer.scss';
import JumpToTop from '../Buttons/JumpToTop/JumpToTop';
import { Col, Container, Row, Card } from 'react-bootstrap';
import website from '../../../assets/img/landing/icon/google.png';

import facebook from '../../../assets/img/landing/icon/facebook.png';
import instagram from '../../../assets/img/landing/icon/instagram.png';
import twiter from '../../../assets/img/landing/icon/twiter.png';
import telegram from '../../../assets/img/landing/icon/telegram.png';
import whatsapp from '../../../assets/img/landing/icon/whatsapp.png';

import { useSelector } from 'react-redux';
import { englishNumbersToPersian } from '../../../core/utils/englishNumbersToPersian';
import { UseGetQuickAccess } from '../../../core/services/api/get-quick-access';
import { UseGetRelatedLinks } from '../../../core/services/api/get-related-links';

const Footer = () => {
  const state = useSelector((state) => state.setting);

  const {
    data: quickAccessData,
    isLoading: quickAccessIsLoading,
    isSuccess: quickAccessIsSuccess,
    isError: quickAccessIsError,
    mutate: quickAccessMutate,
  } = UseGetQuickAccess();
  const {
    data: relatedLinksData,
    isLoading: relatedLinksIsLoading,
    isSuccess: relatedLinksIsSuccess,
    isError: relatedLinksIsError,
    mutate: relatedLinksMutate,
  } = UseGetRelatedLinks();

  useEffect(() => {
    quickAccessMutate({ page: 1, pageSize: 10, isActive: true });
    relatedLinksMutate({ page: 1, pageSize: 10, isActive: true });
    
  }, []);
  return (
    <section className="footer-section  pt-lg-5">
      <footer>
        <Container fluid className="footer-top">
          <Row>
            <Col lg={3} className="enamad">
              <img alt="enamad-logo" src={enamad} />
              <div>
                {/* <a
                  referrerpolicy="origin"
                  target="_blank"
                  href="https://trustseal.enamad.ir/?id=221714&amp;Code=foRitFWRXiWPgHWUby1H"
                  rel="noreferrer"
                >
                  <img
                    referrerpolicy="origin"
                    src="https://Trustseal.eNamad.ir/logo.aspx?id=221714&amp;Code=foRitFWRXiWPgHWUby1H"
                    alt="enamad"
                    style={{
                      width: "100px",
                      height: "100px",
                      cursor: "pointer",
                    }}
                    id="foRitFWRXiWPgHWUby1H"
                  />
                </a> */}
              </div>
              <div>
                {/* <img
                  referrerpolicy="origin"
                  id="nbqejzpeapfusizpfukzjxlz"
                  style={{ cursor: "pointer" }}
                  onclick='window.open("https://logo.samandehi.ir/Verify.aspx?id=275961&p=uiwkjyoedshwpfvlgvkarfth", "Popup","toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30")'
                  alt="logo-samandehi"
                  src="https://logo.samandehi.ir/logo.aspx?id=275961&p=odrfyndtujynbsiywlbqnbpd"
                /> */}
              </div>
            </Col>
            <Col lg={3} className="footer-col1">
              <Card className="footer-card">
                <Card.Body>
                  <span className="title-footer-col">تماس با ما</span>
                  <ul>
                    <li>
                      <p className="title-footer-link">{state.address}</p>
                    </li>
                    <li>
                      <span>
                        کد پستی : {englishNumbersToPersian(state.postalCode)}
                      </span>
                    </li>
                    <li>
                      <span>تلفن : {englishNumbersToPersian(state.tell)}</span>
                    </li>

                    {/* <a href={`${state?.facebookAddress}`}>فیس بوک </a>
                    <a href={`${state?.twitterAddress}`}>توئیتر</a>
                    <a href={`${state?.instagramAddress}`}> اینستاگرام </a>
                    <a href={`${state?.telegramAddress}`}>تلگرام</a>
                    <a  href={`${state?.whatsappAddress}`}>واتس آپ</a> */}
                  </ul>
                  <div className="social-media-footer-box">
                    <div className="social-media-icon">
                      <a
                        href={`https://instagram.com/${state?.instagramAddress}`}
                      >
                        <img alt="instagram-logo" src={instagram} />
                      </a>
                    </div>
                    <div className="social-media-icon">
                      <a href={`https://twitter.com/${state?.twitterAddress}`}>
                        <img alt="twitter-logo" src={twiter} />
                      </a>
                    </div>
                    <div className="social-media-icon">
                      <a
                        href={`https://facebook.com/${state?.facebookAddress}`}
                      >
                        <img alt="facebook-logo" src={facebook} />
                      </a>
                    </div>
                    <div className="social-media-icon">
                      <a
                        href={`https://telegram.org/${state?.telegramAddress}`}
                      >
                        <img alt="telegram-logo" src={telegram} />
                      </a>
                    </div>
                    <div className="social-media-icon">
                      <a
                        href={`https://whatsapp.com/${state?.whatsappAddress}`}
                      >
                        <img alt="whatsapp-logo" src={whatsapp} />
                      </a>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} className="footer-col2">
              <Card className="footer-card">
                <Card.Body>
                  <span className="title-footer-col">لینک های مرتبط</span>
                  <ul>
                    {relatedLinksIsSuccess &&
                      relatedLinksData?.data.result.relatedLinkList.map(
                        (relatedLink, index) => {
                          return (
                            <li>
                              {/* <img alt="backward-logo" src={Backward} /> */}
                              <a
                                target="_blank"
                                rel="noreferrer"
                                href={relatedLink.link}
                              >
                                {relatedLink.title}
                              </a>
                            </li>
                          );
                        }
                      )}
                    {/* <li>
                      <img alt="backward-logo" src={Backward} />
                      <a
                        href="https://maj.ir/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        وزارت جهاد کشاورزی
                      </a>
                    </li>
                    <li>
                      <img alt="backward-logo" src={Backward} />
                      <a
                        href="https://frw.ir/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        سازمان جنگل ها، مراتع و آبخیزداری کشور
                      </a>
                    </li>
                    <li>
                      <img alt="backward-logo" src={Backward} />
                      <a
                        href="https://doe.ir/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        سازمان حفاظت محیط زیست
                      </a>
                    </li>
                    <li>
                      <img alt="backward-logo" src={Backward} />
                      <a
                        href="https://www.moe.gov.ir/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        وزارت نیرو
                      </a>
                    </li>
                    <li>
                      <img alt="backward-logo" src={Backward} />
                      <a
                        href="http://agrieng.org/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        سازمان نظام مهندسی کشاورزی و منابع طبیعی کشور{" "}
                      </a>
                    </li> */}
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={3} className="footer-col3">
              <Card className="footer-card">
                <Card.Body className="footer">
                  <span className="title-footer-col">دسترسی سریع</span>
                  <ul>
                    {quickAccessIsSuccess &&
                      quickAccessData?.data.result.quickAccessList.map(
                        (quickAccess, index) => {
                          return (
                            <li>
                              {/* <img alt="backward-logo" src={Backward} /> */}
                              <Link to={quickAccess.link}>
                                {quickAccess.title}
                              </Link>
                            </li>
                          );
                        }
                      )}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <JumpToTop />

        <div className="footer-bottom  line-height-2">
          {englishNumbersToPersian(
            '.کلیه حقوق بهره برداری از سامانه مربوط به نظام صنفی کشور میباشد'
          )}
          <a
            href="https://dadehkavdehghan.ir/"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <p className="pt-2">
              تولید کننده سامانه شرکت داده کاو دهقان طبرستان
            </p>
          </a>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
