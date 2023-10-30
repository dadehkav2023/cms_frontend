import React, { useEffect } from "react";
import locationPic from "../../../assets/img/icons/location.svg";
import phonePic from "../../../assets/img/icons/phone.svg";
import phonePic2 from "../../../assets/img/icons/phone2.svg";
import mailPic from "../../../assets/img/icons/email.svg";
import postPic from "../../../assets/img/icons/post.svg";
import userPic from "../../../assets/img/icons/user.svg";
import cloudPic from "../../../assets/img/icons/cloud.svg";
import { Container, Row, Col, FormControl, InputGroup } from "react-bootstrap";
import "./ContactUsPage.scss";
import { englishNumbersToPersian } from "../../../core/utils/englishNumbersToPersian";

const ContactUsPage = () => {
  return (
    <>
      <section className="contact-us-section">
        <h3>تماس با ما</h3>
        <hr />
        <ul>
          <li>
            <p>نظام صنفی کشاورزی و منابع طبیعی کشور</p>
            <hr />
          </li>
          <li>
            <span>
              <img src={locationPic} alt="location" />
            </span>
            {englishNumbersToPersian(
              "  آدرس پستی : تهران،  بهار ، کوچه طباطبائی مقدم ، خیابان شهید آیت اله طالقانی ، پلاک 38 طبقه دوم شرقی"
            )}
            <hr />
          </li>
          <li>
            <span>
              <img src={phonePic} alt="phone" />
            </span>
            {englishNumbersToPersian("  شماره تماس : 02177628525")}
            <hr />
          </li>
          <li>
            <span>
              <img src={mailPic} alt="email" />
            </span>
            ایمیل :nsk.keshvar@gmail.com
            <hr />
          </li>
          <li>
            <span>
              <img src={postPic} alt="post" />
            </span>
            {englishNumbersToPersian("   کد پستی : 1561934518")}
            <hr />
          </li>
        </ul>
        <Container className="contact-us-container" fluid>
          <Row>
            <h4>.لطفا سؤالات خود را از نظام صنفی کشور بپرسید</h4>
          </Row>
          <Row>
            <Col md={6}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="ایمیل"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon2">
                    <span className="inputPic">
                      <img src={mailPic} alt="user" />
                    </span>
                  </InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="نام و نام خانوادگی"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon2">
                    <span className="inputPic">
                      <img src={userPic} alt="user" />
                    </span>
                  </InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="موضوع"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon2">
                    <span className="inputPic">
                      <img src={cloudPic} alt="user" />
                    </span>
                  </InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
            </Col>{" "}
            <Col md={6}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="شماره تلفن"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon2">
                    <span className="inputPic">
                      <img src={phonePic2} alt="user" />
                    </span>
                  </InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
            </Col>
          </Row>
          <Row className="messege-box">
            <h4>متن پیام</h4>
            <textarea name="messege" id="messege" />
          </Row>
          <Row>
            <span className="send-messege-button">ارسال</span>
          </Row>
        </Container>
      </section>
    </>
  );
};
export default ContactUsPage;
