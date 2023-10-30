import React from "react";
import "./PeoplesVoiceFlashCard.scss";
import userLogo from "../../../../assets/img/landing/icon/Avatar.png";
import dateLogo from "../../../../assets/img/landing/icon/item.png";
import { Card } from "react-bootstrap";
import PeoplesVoiceSignButton from "../../../common/Buttons/PeoplesVoiceSignButton/PeoplesVoiceSignButton";
import { englishNumbersToPersian } from "../../../../core/utils/englishNumbersToPersian";
import { correctUploadPath } from "../../../../core/utils/image-path-correction";
const PeoplesVoiceFlashCard = ({
  title,
  from,
  startDate,
  endDate,
  signatures,
  image,
}) => {
  return (
    <Card className="peoples-voice-card-item">
      <div className="peoples-voice-flash-card-img">
        <div className="peoples-hover"></div>
        <img
          src={"https://api.farmervoice.agroom.org/" + correctUploadPath(image)}
          alt="people-voice"
        />
        <div className="dim-bg">
          <span> : امضا شده</span>
          <span>{englishNumbersToPersian(signatures)} نفر امضا کردند</span>
        </div>
      </div>

      <Card.Body>
        <Card.Title className="peoples-voice-flash-card-title">
          {title}
        </Card.Title>
        <ul className="peoples-voice-flash-card-ul">
          <li>
            <img src={userLogo} alt="user-logo" />
            <span> از طرف :</span>
            <span>{from}</span>
          </li>

          <li>
            <img src={dateLogo} alt="date-logo" />
            <span>تاریخ شروع :</span>
            <span>{englishNumbersToPersian(startDate)}</span>
          </li>

          <li>
            <img src={dateLogo} alt="date-logo" />
            <span>تاریخ پایان :</span>
            <span>{englishNumbersToPersian(endDate)}</span>
          </li>
        </ul>
      </Card.Body>
      <p className="signParagraph">
        <p>من با این چالش موافقم :</p>
        <PeoplesVoiceSignButton ButtonText="امضاء" />
      </p>
    </Card>
  );
};
export default PeoplesVoiceFlashCard;
