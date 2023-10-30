import React from "react";
import "./StatementsGridFlashCard.scss";
import { Card } from "react-bootstrap";
import mockImage from "../../../assets/img/landing/slid1.jpg";
import { englishNumbersToPersian } from "../../../core/utils/englishNumbersToPersian";
import OpenStatementsButton from "../../common/Buttons/OpenStatementsButton/OpenStatementsButton";
const StatementsGridFlashCard = ({ title, subTitle, img, id, date }) => {
  return (
    <Card className="statement-grid-card-item">
      <Card.Img
        variant="top"
        src={`${process.env.REACT_APP_PUBLIC_PATH}/${img}`}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <span className="statement-grid-flash-card-date">
          {englishNumbersToPersian(date)}
        </span>
        <OpenStatementsButton />
      </Card.Body>
    </Card>
  );
};
export default StatementsGridFlashCard;
