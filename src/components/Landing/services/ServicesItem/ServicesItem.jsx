import React from "react";
import { Card } from "react-bootstrap";

import "./ServicesItem.scss";
const ServicesItem = ({ servicePic, serviceTitle, serviceLink }) => {
  return (
    <>
      <a href={serviceLink} target="_blank" rel="noreferrer">
        <Card className="services-card-item">
          <div className="services-flash-card-img">
            <div className="services-hover"></div>
            <img
              src={`${process.env.REACT_APP_PUBLIC_PATH}/${servicePic}`}
              alt="services"
            />
            <div className="services-dim-bg">
              <h2>{serviceTitle}</h2>
            </div>
          </div>
        </Card>
      </a>
    </>
  );
};

export default ServicesItem;
