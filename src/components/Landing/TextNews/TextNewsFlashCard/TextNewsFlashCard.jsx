import { Card } from 'react-bootstrap';
import { englishNumbersToPersian } from '../../../../core/utils/englishNumbersToPersian';
import OpenItemButton from '../../../common/Buttons/OpenItemButton/OpenItemButton';
import './TextNewsFlashCard.scss';
const TextNewsFlashCard = ({ title, description, img, id, date }) => {
  return (
    <Card className="text-news-card-item">
      <Card.Img
        variant="top"
        src={`${process.env.REACT_APP_PUBLIC_PATH}/${img}`}
      />
      <Card.Body>
        {title.length > 30 ? `${title.slice(0, 30)}...` : title}
        <Card.Text className="truncate card-description">
          {description}
        </Card.Text>
        <span className="text-news-flash-card-date">
          {englishNumbersToPersian(date)}
        </span>
        <OpenItemButton text="مشاهده ادامه خبر" />
      </Card.Body>
    </Card>
  );
};
export default TextNewsFlashCard;
