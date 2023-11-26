import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Style from './ProfileElectionModal.module.scss';

const ProfileElectionModal = ({ imageUrl }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  const closeBtn = (
    <button className="close" onClick={toggle} type="button">
      &times;
    </button>
  );

  return (
    <div>
      <img
        src={imageUrl}
        className={Style.profileImage}
        alt="candidates image"
        onClick={toggle}
      />

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} close={closeBtn}></ModalHeader>
        <ModalBody>
          <img src={imageUrl} alt="Large Image" className={Style.largeImage} />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ProfileElectionModal;
