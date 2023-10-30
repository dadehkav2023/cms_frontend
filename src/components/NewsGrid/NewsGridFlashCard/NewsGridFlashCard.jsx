import React from "react";
import "./NewsGridFlashCard.scss";
import { Card } from "react-bootstrap";
import mockImage from "../../../assets/img/landing/slid1.jpg";
import { englishNumbersToPersian } from "../../../core/utils/englishNumbersToPersian";
import OpenItemButton from "../../common/Buttons/OpenItemButton/OpenItemButton";
const NewsGridFlashCard = ({ title, subTitle, img, id, date }) => {
  return (
    <Card className="news-grid-card-item">
      <Card.Img
        variant="top"
        src={`${process.env.REACT_APP_PUBLIC_PATH}/${img}`}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <span className="news-grid-flash-card-date">
          {englishNumbersToPersian(date)}
        </span>
        <OpenItemButton text="مشاهده ادامه خبر" />
      </Card.Body>
    </Card>
  );
};
export default NewsGridFlashCard;
