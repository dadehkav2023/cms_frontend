import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { UseGetElectionCandidatesVideo } from '../../../../core/services/api/get-election-candidates-video';
import { useEffect } from 'react';
import { Col, Container, Row, Table } from 'reactstrap';
import Loading from '../../../common/Loading/Loading';
import ModalLocation from '../../common/Modal/ModalLocation';

function VideoElectionModal({ isOpen, toggle, data }) {
  const closeBtn = (
    <button className="close" onClick={toggle} type="button">
      &times;
    </button>
  );

  const getElectionCandidateVideo = UseGetElectionCandidatesVideo();

  const [state, setState] = useState([]);
  useEffect(() => {
    if (
      getElectionCandidateVideo.data &&
      getElectionCandidateVideo.data.data.result
    ) {
      const result = getElectionCandidateVideo.data.data.result?.files;
      setState(result);
    }
  }, [getElectionCandidateVideo.isSuccess]);
  useEffect(() => {
    getElectionCandidateVideo.mutate(data);
  }, [data]);

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle} close={closeBtn}></ModalHeader>
        <ModalBody>
          {getElectionCandidateVideo.isLoading && <Loading />}
          <Row dir="rtl" className="">
            <Table>
              <thead>
                <tr>
                  <th>ردیف</th>
                  <th>نام ویدیو</th>
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

export default VideoElectionModal;
