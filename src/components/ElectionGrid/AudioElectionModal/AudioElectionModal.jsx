import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { UseGetElectionCandidatesAudio } from '../../../core/services/api/get-election-candidates-audio';
import { useEffect } from 'react';
import { Col, Container, Row, Table } from 'reactstrap';

import { useServeFile } from '../../../core/services/api/get-election-candidates-downloads';
import './AudioElectionModal.scss'


function AudioElectionModal({ isOpen, toggle, data }) {
  const closeBtn = (
    <button className="close" onClick={toggle} type="button">
      &times;
    </button>
  );

  const getElectionCandidateAudio = UseGetElectionCandidatesAudio();
  const [state, setState] = useState([]);
  useEffect(() => {
    if (getElectionCandidateAudio.data && getElectionCandidateAudio.data.data.result) {
      const result = getElectionCandidateAudio.data.data.result?.files;
      setState(result);
    }
  }, [getElectionCandidateAudio.isSuccess]);
  useEffect(() => {
    getElectionCandidateAudio.mutate(data);
  }, [data]);


  const useServeFileMutation = useServeFile();


  const handleDownloadClick = (fileName) => {
    useServeFileMutation.mutate(
      fileName
    );
  };

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle} close={closeBtn}></ModalHeader>
        <ModalBody>
          {getElectionCandidateAudio.isLoading && <div className="spinner"></div>}
          <Row dir="rtl" className="">
            <Table>
              <thead>
                <tr>
                  <th>ردیف</th>
                  <th>نام صوت</th>
                </tr>
              </thead>
              {state.length > 0 &&
                state.map((row, key) => {
                  return (
                    <>
                      <tbody>
                        <tr>
                          <th>{key + 1}</th>
                          <td dir="ltr">
                            {row?.fileName.slice(0, 30) + '...'}
                          </td>
                          <td>
                            <Button
                              onClick={() => handleDownloadClick(row?.fileName)}
                            >
                              دانلود
                            </Button>
                          </td>
                        </tr>
                      </tbody>
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
