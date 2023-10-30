import React from "react";
import "./PeoplesVoiceGridFlashCard.scss";
import { Card } from "react-bootstrap";
import mockImage from "../../../assets/img/landing/slid1.jpg";
import { englishNumbersToPersian } from "../../../core/utils/englishNumbersToPersian";
import OpenItemButton from "../../common/Buttons/OpenItemButton/OpenItemButton";
import { correctUploadPath } from "../../../core/utils/image-path-correction";
const PeoplesVoiceGridFlashCard = ({
  title,
  showSignature = true,
  signatures,
  image,
}) => {
  return (
    <Card className="news-grid-card-item">
      <Card.Img
        variant="top"
        src={`https://api.farmervoice.agroom.org/${correctUploadPath(image)}`}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {showSignature && (
          <span className="news-grid-flash-card-date">
            {signatures || signatures === 0
              ? englishNumbersToPersian(signatures.toString())
              : " ۰ "}{" "}
            امضا
          </span>
        )}
        <OpenItemButton text="مشاهده جزئیات چالش" />
      </Card.Body>
    </Card>
  );
};
export default PeoplesVoiceGridFlashCard;
