import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import AnnouncementsButton from "../../common/Buttons/AnnouncementsButton/AnnouncementsButton";
import "./Announcement.scss";
import checkMark from "../../../assets/img/landing/icon/check.png";
import bullet from "../../../assets/img/landing/icon/circle_blue.png";
import IranMap from "./IranMap/IranMap";
import { UseGetMap } from "../../../core/services/api/get-map";
import { FallBackSpinner } from "../../common/Spinner/FallBackSpinner/FallbackSpinner";
const Announcement = () => {
  const { data, isLoading, isError, isSuccess } = UseGetMap();
  const [currentProvince, setCurrentProvince] = useState(0);
  const provinces = [
    "استان ها",
    "آذربایجان شرقی",
    "آذربایجان غربی",
    "اردبیل",
    "اصفهان",
    "البرز",
    "ایلام",
    "بوشهر",
    "تهران",
    "چهارمحال وبختیاری",
    "خراسان جنوبی",
    "خراسان رضوی",
    "خراسان شمالی",
    "خوزستان",
    "زنجان",
    "سمنان",
    "سیستان وبلوچستان",
    "فارس",
    "قزوین",
    "قم",
    "کردستان",
    "کرمان",
    "کرمانشاه",
    "کهگیلویه وبویراحمد",
    "گلستان",
    "گیلان",
    "لرستان",
    "مازندران",
    "مرکزی",
    "هرمزگان",
    "همدان",
    "یزد",
  ];

  useEffect(() => {}, [currentProvince]);

  return isLoading ? (
    <FallBackSpinner />
  ) : (
    <section className="announcement-section">
      <div
        style={{ width: "100%", height: "5px", background: "#0059fd" }}
      ></div>
      <Container fluid className="announcements-container">
        <Row>
          <Col xl={8}>
            <Row>
              <Col className="custom-title-line-col" lg={10}>
                <div className="custom-title-line"></div>
              </Col>
              <Col lg={2}>
                <span className="provinces-title">استان ها</span>
              </Col>
            </Row>
            <Row className="provinces-detail-row">
              <Col className="provinces-news" xl={5}>
                <span>{provinces[currentProvince]}</span>
                <p className="province-description">
                  {currentProvince === 0
                    ? "جهت مشاهده توضیحات هر استان ماوس(موشواره) را بر بروی مکان آن از روی نقشه ببرید و جهت مشاهوه وبسایت استان مورد نظر روی موقعیت مکانی آن کلیک کنید"
                    : data.data.result
                        .map((item) => item.province.province)
                        .includes(currentProvince)
                    ? data.data.result.filter(
                        (item) => item.province.province === currentProvince
                      )[0].description
                    : "توضیحاتی برای این استان ثبت نشده است"}
                </p>
              </Col>
              <Col xl={7}>
                <IranMap
                  activeMap={data.data.result}
                  currentProvince={currentProvince}
                  setCurrentProvince={setCurrentProvince}
                />
              </Col>
            </Row>
          </Col>
          <Col xl={4}>
            <span className="announcements-title">بیانیه و اطلاعیه</span>
            <Card className="announcements-card">
              <Card.Body>
                <ul className="announcements-ul">
                  <li>
                    <img src={checkMark} alt="checkmark-logo" />
                    <span>
                      پیام تبریک آقای نظام الدین خوارزمی رئیس‌ شورای مرکزی
                      سازمان نظام صنفی رایانه ای کشور به حضرت آیت اله رئیسی
                    </span>
                  </li>
                  <li>
                    <img src={checkMark} alt="checkmark-logo" />

                    <span>
                      پیام تبریک آقای نظام الدین خوارزمی رئیس‌ شورای مرکزی
                      سازمان نظام صنفی رایانه ای کشور به حضرت آیت اله رئیسی
                    </span>
                  </li>
                  <li>
                    <img src={checkMark} alt="checkmark-logo" />

                    <span>
                      پیام تبریک آقای نظام الدین خوارزمی رئیس‌ شورای مرکزی
                      سازمان نظام صنفی رایانه ای کشور به حضرت آیت اله رئیسی
                    </span>
                  </li>
                  <li>
                    <img src={checkMark} alt="checkmark-logo" />
                    <span>
                      پیام تبریک آقای نظام الدین خوارزمی رئیس‌ شورای مرکزی
                      سازمان نظام صنفی رایانه ای کشور به حضرت آیت اله رئیسی
                    </span>
                  </li>
                </ul>
                <AnnouncementsButton />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Announcement;
