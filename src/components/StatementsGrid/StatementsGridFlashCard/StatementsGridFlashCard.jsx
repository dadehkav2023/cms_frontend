import React from "react";
import "./StatementsGridFlashCard.scss";
import { Card } from "react-bootstrap";
import mockImage from "../../../assets/img/landing/slid1.jpg";
import { englishNumbersToPersian } from "../../../core/utils/englishNumbersToPersian";
import OpenStatementsButton from "../../common/Buttons/OpenStatementsButton/OpenStatementsButton";
const StatementsGridFlashCard = ({statement}) => {
  console.log(statement);
  return (
    <Card className="statement-grid-card-item text-danger">
      <Card.Img
        variant="top"
        src={`${process.env.REACT_APP_PUBLIC_PATH}/${statement.imagePath}`}
      />
      <Card.Body>
        <Card.Title>{statement.title}</Card.Title>
        <span className="statement-grid-flash-card-date">
        {statement.publishedDateTimeAsJalali}
        </span>
        <OpenStatementsButton />
      </Card.Body>
    </Card>
  );
};
export default StatementsGridFlashCard;
/*{
    "id": 26,
    "title": "بیانیه من2",
    "imagePath": "Resources\\images\\2023\\2023-5\\3c7297b5-e807-4f58-86c8-0035648d12234573233.jpg",
    "description": "سببربری",
    "isActive": true,
    "publishedDateTimeAsJalali": "1402/03/08",
    "statementCategories": [
        {
            "id": 39,
            "title": "حگحخگخگ"
        }
    ]
}*/