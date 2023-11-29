import { Col, Container, Row, Table, Button } from 'reactstrap';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UseGetElectionCandidates } from '../../../core/services/api/get-election-candidates';
import { UseGetElectionCandidatesProfile } from '../../../core/services/api/get-election-candidates-profile';
import ElectionLayout from '../common/layout/ElectionLayout/ElectionLayout';
import { englishNumbersToPersian } from '../../../../src/core/utils/englishNumbersToPersian';
import ElectionModal from './ResumeElectionModal/ResumeElectionModal';
import VideoElectionModal from './VideoElectionModal/VideoElectionModal';
import AudioElectionModal from './AudioElectionModal/AudioElectionModal';
import ResumeElectionModal from './ResumeElectionModal/ResumeElectionModal';
import { useServeFile } from '../../../core/services/api/get-election-candidates-downloads';
import { useParams } from 'react-router-dom';

import Style from './ElectionCandidates.module.scss';
import ProfileElectionModal from './ProfileElectionModal/ProfileElectionModal';

const ElectionCandidates = () => {
  const { id } = useParams();

  const [pageNumber, setPageNumber] = useState(1);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenVideoModal, setIsOpenVideoModal] = useState(false);
  const [isOpenAudioModal, setIsOpenAudioModal] = useState(false);
  const state = useSelector((state) => state.setting);

  const getElectionCandidate = UseGetElectionCandidates();

  const [result, setResult] = useState();
  const [candidates, setCandidates] = useState([]);
  useEffect(() => {
    if (getElectionCandidate.data && getElectionCandidate.data.data.result) {
      const result = getElectionCandidate.data.data.result.candidates;
      setCandidates(result);
    }
  }, [getElectionCandidate.isSuccess]);

  useEffect(() => {
    getElectionCandidate.mutate({
      page: pageNumber,
      pageSize: 10,
      unionElectionId: id,
    });
  }, [pageNumber]);

  const electionDate = `${getElectionCandidate?.data?.data?.result?.electionInfo?.electionDate}`;

  const iconStyle = {
    color: '#0B1803',
    fontSize: '24px',
  };

  return (
    <>
      <ElectionLayout>
        {isOpenModal && (
          <ResumeElectionModal
            isOpen={isOpenModal}
            toggle={() => {
              setIsOpenModal(!isOpenModal);
            }}
            data={result}
          />
        )}

        {isOpenVideoModal && (
          <VideoElectionModal
            isOpen={isOpenVideoModal}
            toggle={() => {
              setIsOpenVideoModal(!isOpenVideoModal);
            }}
            data={result}
          />
        )}

        {isOpenAudioModal && (
          <AudioElectionModal
            isOpen={isOpenAudioModal}
            toggle={() => {
              setIsOpenAudioModal(!isOpenAudioModal);
            }}
            data={result}
          />
        )}

        <Row>
          <Col>
            <Row>
              <div className={`${Style.description} mb-5 m-auto `}>
                <h5>
                  نام اتحادیه
                  <p className={`${Style.descriptionDetails} mt-3`}>
                    {`${getElectionCandidate?.data?.data?.result?.unionInfo?.unionTitle}`}
                  </p>
                </h5>

                <h5>
                  نوع اتحادیه
                  <p className={`${Style.descriptionDetails} mt-3`}>
                    {`${getElectionCandidate?.data?.data?.result?.unionInfo?.unionTypeTitle}`}
                  </p>
                </h5>

                <h5>
                  تاریخ برگزاری
                  <p
                    className={`${Style.descriptionDetails} mt-3`}
                    style={{ color: 'red' }}
                  >
                    {englishNumbersToPersian(electionDate)}
                  </p>
                </h5>
              </div>

              <Table>
                <thead>
                  <tr className={Style.tableTitle}>
                    <th>ردیف</th>
                    <th> نام و نام خانوادگی کاندیدا</th>
                    <th> شغل اصلی </th>
                    <th>محل فعالیت</th>
                    <th> تصویر متقاضی </th>
                    <th> عملیات </th>
                  </tr>
                </thead>
                {candidates &&
                  candidates.length > 0 &&
                  candidates.map((election, index) => {
                    return (
                      <>
                        <tbody>
                          <tr className={Style.tableDetails}>
                            <th scope="row">{index + 1}</th>
                            <td>
                              {election.candidateFirstName}{' '}
                              {election.candidateLastName}{' '}
                            </td>
                            <td> {election.mainJobTitle}</td>
                            <td>{election.address}</td>

                            <td>
                              <ProfileElectionModal
                                imageUrl={`${process.env.REACT_APP_Sabak_Path}/UnionCandidate/ServeUnionCandidateProfilePicture/?candidateNationalCode=${election.candidateNationalCode}`}
                              />
                            </td>

                            <td className={`d-flex ${Style.operation}`}>
                              <Button
                                className={Style.operationsButton}
                                onClick={() => {
                                  setResult({
                                    nationalCode:
                                      election?.candidateNationalCode,
                                    unionElectionId: id,
                                  });
                                  setIsOpenModal(true);
                                }}
                              >
                                نمایش رزومه
                              </Button>
                              <Button
                                className={Style.operationsButton}
                                onClick={() => {
                                  setResult({
                                    nationalCode:
                                      election?.candidateNationalCode,
                                    unionElectionId: id,
                                  });
                                  setIsOpenVideoModal(true);
                                }}
                              >
                                فایل تصویری{' '}
                              </Button>
                              <Button
                                className={Style.operationsButton}
                                onClick={() => {
                                  setResult({
                                    nationalCode:
                                      election?.candidateNationalCode,
                                    unionElectionId: id,
                                  });
                                  setIsOpenAudioModal(true);
                                }}
                              >
                                فایل صوتی{' '}
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </>
                    );
                  })}
              </Table>

              <div className={`mt-5  ${Style.extraDescription}`}>
                <h6 className="d-flex row">
                  محل برگذاری انتخابات :{' '}
                  <p>
                    {`${getElectionCandidate?.data?.data?.result?.electionInfo?.electionAddress}`}
                  </p>
                </h6>

                <h6 className="d-flex row">
                  توضیحات تکمیلی :{' '}
                  <p>
                    {`${getElectionCandidate?.data?.data?.result?.electionInfo?.electionDescription}`}
                  </p>
                </h6>
              </div>
            </Row>
          </Col>
        </Row>
        <Row className="justify-content-center mb-5">
          <ReactPaginate
            previousLabel={
              <span>
                <IoIosArrowForward style={iconStyle} />
              </span>
            }
            nextLabel={
              <span>
                <IoIosArrowBack style={iconStyle} />
              </span>
            }
            breakLabel="..."
            breakClassName="break-me"
            pageCount={Math.ceil(
              getElectionCandidate?.data?.data?.result?.totalCount / 10
            )}
            containerClassName="disabled-pagination-btn pagination-holder "
            activeClassName="page-active"
            forcePage={pageNumber - 1}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            onPageChange={(page, pageSize) => {
              setPageNumber(page.selected + 1);
            }}
          />
        </Row>
      </ElectionLayout>
    </>
  );
};

export default ElectionCandidates;
