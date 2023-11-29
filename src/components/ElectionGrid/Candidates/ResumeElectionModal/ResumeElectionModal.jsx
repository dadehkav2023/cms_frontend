import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { UseGetElectionCandidatesResume } from '../../../../core/services/api/get-election-candidates-resume';
import { useEffect } from 'react';
import { Col, Container, Row, Table } from 'reactstrap';

import Loading from '../../../common/Loading/Loading';
import ModalLocation from '../../common/Modal/ModalLocation';

function ResumeElectionModal({ isOpen, toggle, data }) {
  const closeBtn = (
    <button className="close" onClick={toggle} type="button">
      &times;
    </button>
  );

  const getElectionCandidate = UseGetElectionCandidatesResume();
  const [state, setState] = useState([]);
  useEffect(() => {
    if (getElectionCandidate.data && getElectionCandidate.data.data.result) {
      const result = getElectionCandidate.data.data.result?.files;
      setState(result);
    }
  }, [getElectionCandidate.isSuccess]);
  useEffect(() => {
    getElectionCandidate.mutate(data);
  }, [data]);

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle} close={closeBtn}></ModalHeader>
        <ModalBody>
          {getElectionCandidate.isLoading && <Loading />}
          <Row dir="rtl" className="">
            <Table>
              <thead>
                <tr>
                  <th>ردیف</th>
                  <th>نام رزمه</th>
                  <th>لینک دانلود</th>
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

export default ResumeElectionModal;
