import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { UseGetElectionCandidatesVideo } from '../../../core/services/api/get-election-candidates-video';
import { useEffect } from 'react';
import { Col, Container, Row, Table } from 'reactstrap';

import { useServeFile } from '../../../core/services/api/get-election-candidates-downloads';
import './VideoElectionModal.scss'


function VideoElectionModal({ isOpen, toggle, data }) {
  const closeBtn = (
    <button className="close" onClick={toggle} type="button">
      &times;
    </button>
  );

  const getElectionCandidateVideo = UseGetElectionCandidatesVideo();
  const [state, setState] = useState([]);
  useEffect(() => {
    if (getElectionCandidateVideo.data && getElectionCandidateVideo.data.data.result) {
      const result = getElectionCandidateVideo.data.data.result?.files;
      setState(result);
    }
  }, [getElectionCandidateVideo.isSuccess]);
  useEffect(() => {
    getElectionCandidateVideo.mutate(data);
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
          {getElectionCandidateVideo.isLoading && <div className="spinner"></div>}
          <Row dir="rtl" className="">
            <Table>
              <thead>
                <tr>
                  <th>ردیف</th>
                  <th>نام ویدیو</th>
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

export default VideoElectionModal;
