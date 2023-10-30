import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

import "./SurveySubmit.scss";
const SurverySubmit = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>برنامه به سرور وصل نیست</Modal.Title>
        </Modal.Header>
        <Modal.Body>برای استفاده از این ویژگی بک اند را فعال کنید</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            بستن
          </Button>
        </Modal.Footer>
      </Modal>
      <div onClick={handleShow} className="survery-submit">
        ارسال
      </div>
    </>
  );
};
export default SurverySubmit;
