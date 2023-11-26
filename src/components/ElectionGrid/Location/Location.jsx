import React from 'react';
import { Link } from 'react-router-dom';
import Style from './Location.module.scss';

const Location = ({ index, locationId, locationTitle,urlTitle }) => {
  return (
    <div key={index} className={`${Style.locationButton} mb-5`}>
      <Link
        className={Style.locationButtonLink}
        to={`/Election/${urlTitle}/${locationId}`}
      >
        <p>{locationTitle}</p>
      </Link>
    </div>
  );
};

export default Location;
