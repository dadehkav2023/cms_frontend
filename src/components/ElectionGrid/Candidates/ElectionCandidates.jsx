import { Col, Container, Row, Table, Button } from 'reactstrap';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import './ElectionCandidates.scss';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UseGetElectionCandidates } from '../../../core/services/api/get-election-candidates';
import { UseGetElectionCandidatesProfile } from '../../../core/services/api/get-election-candidates-profile';

import ElectionLayout from '../layout/ElectionLayout/ElectionLayout';
import { englishNumbersToPersian } from '../../../../src/core/utils/englishNumbersToPersian';
import ElectionModal from '../ResumeElectionModal/ResumeElectionModal';
import VideoElectionModal from '../VideoElectionModal/VideoElectionModal';
import AudioElectionModal from '../AudioElectionModal/AudioElectionModal';
import ResumeElectionModal from '../ResumeElectionModal/ResumeElectionModal';

import { useServeFile } from '../../../core/services/api/get-election-candidates-downloads';

const ElectionCandidates = () => {
  const history = useHistory();

  const [pageNumber, setPageNumber] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenVideoModal, setIsOpenVideoModal] = useState(false);
  const [isOpenAudioModal, setIsOpenAudioModal] = useState(false);

  const [result, setResult] = useState();

  const state = useSelector((state) => state.setting);

  const {
    data: electionCandidatesData,
    isError: electionCandidatesIsError,
    isLoading: electionCandidatesIsLoading,
    isSuccess: electionCandidatesIsSuccess,
    mutate: electionCandidatesMutate,
  } = UseGetElectionCandidates();

  const electionDate = `${electionCandidatesData?.data?.result?.electionInfo?.electionDate}`;

  const iconStyle = {
    color: '#0B1803',
    fontSize: '24px',
  };

  useEffect(() => {
    electionCandidatesMutate({
      page: pageNumber,
      pageSize: 10,
      unionElectionId: 45,
    });
  }, [pageNumber]);



  useEffect(() => {
    getElectionCandidateProfile.mutate();
  }, []);

  const getElectionCandidateProfile = UseGetElectionCandidatesProfile();
  const [candidateProfile, setCandidateProfile] = useState([]);
  useEffect(() => {
    if (
      getElectionCandidateProfile.data &&
      getElectionCandidateProfile.data.data.result
    ) {
      const result = getElectionCandidateProfile.data.data.result?.files;
      setCandidateProfile(result);
    }
  }, [getElectionCandidateProfile.isSuccess]);


  const useServeFileMutation = useServeFile();

  const profile = (candidateNationalCode) => {
    useServeFileMutation.mutate(candidateNationalCode);
  };

  return (
    <>
      <ElectionLayout>
        <Container fluid dir="rtl">
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
              <Row className=" ">
                <div className="description mb-5 m-auto ">
                  <h5>
                    نام اتحادیه
                    <p className="descriptionDetails mt-3">
                      {`${electionCandidatesData?.data?.result?.unionInfo?.unionTitle}`}
                    </p>
                  </h5>

                  <h5>
                    نوع اتحادیه
                    <p className="descriptionDetails mt-3">
                      {`${electionCandidatesData?.data?.result?.unionInfo?.unionTypeTitle}`}
                    </p>
                  </h5>

                  <h5>
                    تاریخ برگزاری
                    <p
                      className="descriptionDetails mt-3"
                      style={{ color: 'red' }}
                    >
                      {englishNumbersToPersian(electionDate)}
                    </p>
                  </h5>
                </div>

                <Table>
                  <thead>
                    <tr className="tableTitle">
                      <th>ردیف</th>
                      <th> نام و نام خانوادگی کاندیدا</th>
                      <th> شغل اصلی </th>
                      <th>محل فعالیت</th>
                      <th> تصویر متقاضی </th>
                      <th> عملیات </th>
                    </tr>
                  </thead>
                  {electionCandidatesData && electionCandidatesData.data ? (
                    electionCandidatesData.data.result.candidates &&
                    (electionCandidatesIsError ||
                      electionCandidatesIsSuccess) ? (
                      electionCandidatesData.data.result.candidates.map(
                        (election, index) => {
                          return (
                            <>
                              <tbody>
                                <tr className="tableDetails">
                                  <th scope="row">{index + 1}</th>
                                  <td>
                                    {election.candidateFirstName}{' '}
                                    {election.candidateLastName}{' '}
                                  </td>
                                  <td> {election.mainJobTitle}</td>
                                  <td>{election.address}</td>

                                  <td>
                                    {/* {election.candidateNationalCode} */}
                                     {profile(election.candidateNationalCode)} 
                                   
                                  </td>

                                  <td className="d-flex operation">
                                    <Button
                                      className="operationsButton"
                                      onClick={() => {
                                        setResult({
                                          nationalCode:
                                            election?.candidateNationalCode,
                                          unionElectionId: 45,
                                        });
                                        setIsOpenModal(true);
                                      }}
                                    >
                                      نمایش رزومه
                                    </Button>
                                    <Button
                                      className="operationsButton"
                                      onClick={() => {
                                        setResult({
                                          nationalCode:
                                            election?.candidateNationalCode,
                                          unionElectionId: 45,
                                        });
                                        setIsOpenVideoModal(true);
                                      }}
                                    >
                                      فایل تصویری{' '}
                                    </Button>
                                    <Button
                                      className="operationsButton"
                                      onClick={() => {
                                        setResult({
                                          nationalCode:
                                            election?.candidateNationalCode,
                                          unionElectionId: 45,
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
                        }
                      )
                    ) : (
                      <h2
                        style={{
                          color: 'red',
                          fontSize: '14px',
                          textAlign: 'center',
                          width: '100%',
                          margin: '10% ',
                        }}
                      >
                        هیچ اطلاعاتی جهت نمایش وجود ندارد
                      </h2>
                    )
                  ) : (
                    <div
                      style={{
                        color: 'black',
                        textAlign: 'center',
                        width: '100%',
                        margin: '10% ',
                      }}
                    >
                      <h1
                        style={{
                          fontSize: '14px',
                          color: '#2A7221',
                          width: '100%',
                        }}
                      >
                        لطفا منتظر بمانید...
                      </h1>
                      <div className="spinner"></div>
                    </div>
                  )}
                </Table>

                <div className=" mt-5  extraDescription">
                  <h6 className="d-flex row">
                    محل برگذاری انتخابات :{' '}
                    <p>
                      {`${electionCandidatesData?.data?.result?.electionInfo?.electionAddress}`}
                    </p>
                  </h6>

                  <h6 className="d-flex row">
                    توضیحات تکمیلی :{' '}
                    <p>
                      {`${electionCandidatesData?.data?.result?.electionInfo?.electionDescription}`}
                    </p>
                  </h6>
                </div>
              </Row>
            </Col>
          </Row>
          <Row className="justify-content-center mb-5">
            <ReactPaginate
              previousLabel={
                <span className="">
                  <IoIosArrowForward style={iconStyle} />
                </span>
              }
              nextLabel={
                <span className="">
                  <IoIosArrowBack style={iconStyle} />
                </span>
              }
              breakLabel="..."
              breakClassName="break-me"
              pageCount={Math.ceil(
                electionCandidatesData?.data.result.totalCount / 10
              )}
              containerClassName="disabled-pagination-btn pagination-holder "
              activeClassName="page-active   "
              forcePage={pageNumber - 1}
              pageRangeDisplayed={2}
              marginPagesDisplayed={2}
              onPageChange={(page, pageSize) => {
                setPageNumber(page.selected + 1);
              }}
            />
          </Row>
        </Container>
      </ElectionLayout>
    </>
  );
};

export default ElectionCandidates;
