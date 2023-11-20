import React from 'react';
import './VideoNewsFlashCard.scss';
import { Card } from 'react-bootstrap';
import mockImage from '../../../../assets/img/landing/slid1.jpg';
import OpenItemButton from '../../../common/Buttons/OpenItemButton/OpenItemButton';
import { englishNumbersToPersian } from '../../../../core/utils/englishNumbersToPersian';
import { Link } from 'react-router-dom';
import { VideoPlayer } from './Player';
const VideoNewsFlashCard = ({ title, description, img, id, date }) => {
  return (
    <Card className="video-news-card-item ">
      <div className="video-news-card-player">
        <VideoPlayer
          videoSrc={`${process.env.REACT_APP_PUBLIC_PATH}/${img}`}
          width={200}
          height={200}
        />
      </div>

      <Card.Body className="">
        <Card.Title className="video-news-card-title">{title}</Card.Title>
        <Card.Text
          dangerouslySetInnerHTML={{ __html: description }}
          className="truncate video-news-card-description"
        ></Card.Text>
        <span className="video-news-flash-card-date">
          {englishNumbersToPersian(date)}
        </span>
        <OpenItemButton text="مشاهده ادامه خبر" />
      </Card.Body>
    </Card>
  );
};
export default VideoNewsFlashCard;
