import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter ,ModalHeader} from 'reactstrap';
import './ProfileElectionModal.scss'
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
        className="profileImage"
        alt=""
        onClick={toggle} 
      />

      <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle} close={closeBtn}></ModalHeader>
        <ModalBody>
          <img src={imageUrl} alt="Large Image" className="largeImage" />
        </ModalBody>
        
      </Modal>
    </div>
  );
}

export default ProfileElectionModal;