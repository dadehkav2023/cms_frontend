import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../core/state";

const SiteModal = () => {
  const state = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { setModal } = bindActionCreators(actionCreators, dispatch);
  return (
    <>
      <Modal
        show={state.show}
        onHide={() => {
          setModal({ ...state, show: false });
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "right", width: "100%" }}>
            {state.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          dangerouslySetInnerHTML={{
            __html: state.body,
          }}
        ></Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setModal({ ...state, show: false });
            }}
          >
            بستن
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default SiteModal;
