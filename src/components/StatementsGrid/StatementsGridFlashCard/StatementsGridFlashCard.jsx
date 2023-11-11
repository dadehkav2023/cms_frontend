import React from 'react';
import './StatementsGridFlashCard.scss';
import { Card } from 'react-bootstrap';
import mockImage from '../../../assets/img/landing/slid1.jpg';
import { englishNumbersToPersian } from '../../../core/utils/englishNumbersToPersian';
import OpenStatementsButton from '../../common/Buttons/OpenStatementsButton/OpenStatementsButton';
const StatementsGridFlashCard = ({ statement }) => {
  console.log(statement);
  return (
    <div className="StatmentsBox">
      <div className="row">
        <div className="col-12">
          <p>{statement.title}</p>
        </div>
        
      </div>
    </div>
  );
};
export default StatementsGridFlashCard;

// import React from "react";
// import "./StatementsGridFlashCard.scss";
// import { Card } from "react-bootstrap";
// import mockImage from "../../../assets/img/landing/slid1.jpg";
// import { englishNumbersToPersian } from "../../../core/utils/englishNumbersToPersian";
// import OpenStatementsButton from "../../common/Buttons/OpenStatementsButton/OpenStatementsButton";
// const StatementsGridFlashCard = ({statement}) => {
//   console.log(statement);
//   return (
//     <Card className="statement-grid-card-item text-danger">
//       <Card.Img
//         variant="top"
//         src={`${process.env.REACT_APP_PUBLIC_PATH}/${statement.imagePath}`}
//       />
//       <Card.Body>
//         <Card.Title>{statement.title}</Card.Title>
//         <span className="statement-grid-flash-card-date">
//         {statement.publishedDateTimeAsJalali}
//         </span>
//         <OpenStatementsButton />
//       </Card.Body>
//     </Card>
//   );
// };
// export default StatementsGridFlashCard;
