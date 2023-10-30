import React from "react";
import { Link } from "react-router-dom";
import "./TextNewsFlashCard.scss";
import { Card } from "react-bootstrap";
import mockImage from "../../../../assets/img/landing/slid1.jpg";
import { englishNumbersToPersian } from "../../../../core/utils/englishNumbersToPersian";
import OpenItemButton from "../../../common/Buttons/OpenItemButton/OpenItemButton";
const TextNewsFlashCard = ({ title, description, img, id, date }) => {
  return (
    <Card className="text-news-card-item">
      <Card.Img
        variant="top"
        src={`${process.env.REACT_APP_PUBLIC_PATH}/${img}`}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <span className="text-news-flash-card-date">
          {englishNumbersToPersian(date)}
        </span>
        <OpenItemButton text="مشاهده ادامه خبر" />
      </Card.Body>
    </Card>
  );
};
export default TextNewsFlashCard;
