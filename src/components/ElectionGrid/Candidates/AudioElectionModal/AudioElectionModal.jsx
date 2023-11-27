import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { UseGetElectionCandidatesAudio } from '../../../../core/services/api/get-election-candidates-audio';
import { useEffect } from 'react';
import { Col, Container, Row, Table } from 'reactstrap';
import Loading from '../../../common/Loading/Loading';
import ModalLocation from '../../common/Modal/ModalLocation';

function AudioElectionModal({ isOpen, toggle, data }) {
  const closeBtn = (
    <button className="close" onClick={toggle} type="button">
      &times;
    </button>
  );
  const getElectionCandidateAudio = UseGetElectionCandidatesAudio();
  const [state, setState] = useState([]);
  useEffect(() => {
    if (
      getElectionCandidateAudio.data &&
      getElectionCandidateAudio.data.data.result
    ) {
      const result = getElectionCandidateAudio.data.data.result?.files;
      setState(result);
    }
  }, [getElectionCandidateAudio.isSuccess]);
  useEffect(() => {
    getElectionCandidateAudio.mutate(data);
  }, [data]);

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle} close={closeBtn}></ModalHeader>
        <ModalBody>
          {getElectionCandidateAudio.isLoading && <Loading />}
          <Row dir="rtl" className="">
            <Table>
              <thead>
                <tr>
                  <th>ردیف</th>
                  <th>نام صوت</th>
                  <th> لینک دانلود</th>
                </tr>
              </thead>
              {state.length > 0 &&
                state.map((row, index) => {
                  return (
                    <>
                      <ModalLocation
                        index={index + 1}
                        fileName={row.fileName}
                      />
                    </>
                  );
                })}
            </Table>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default AudioElectionModal;
