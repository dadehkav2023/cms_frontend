import { Col, Container, Row, Table } from 'reactstrap';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';

import './ElectionCandidates.scss';

import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UseGetElectionCandidates } from '../../../core/services/api/get-election-candidates';
import ElectionLayout from '../layout/ElectionLayout/ElectionLayout';

const ElectionCandidates = () => {
  const history = useHistory();
  // const [pageSize, setPageSize] = useState(6);
  const [pageNumber, setPageNumber] = useState(1);

  const state = useSelector((state) => state.setting);
 

  
 
 

  const {
    data: electionCandidatesData,
    isError: electionCandidatesIsError,
    isLoading: electionCandidatesIsLoading,
    isSuccess: electionCandidatesIsSuccess,
    mutate: electionCandidatesMutate,
  } = UseGetElectionCandidates();

  const iconStyle = {
    color: '#0B1803',
    fontSize: '24px',
  };


  // const [pagination , setPagination] = useState({
  //   page : 1 ,
  //   pageSize : pageSize ,
  //   unionElectionId :  45,
  // })

  useEffect(() => {
   
    electionCandidatesMutate({
      page: pageNumber,
      pageSize: 10,
      unionElectionId: 45,
    });
  }, [pageNumber]);

  return (
    <>
      <ElectionLayout>
        <Container fluid dir="rtl" className="">
          <Row>
            <Col>
              <h6 className="candidatesParagraph">
                کاندید هایی که درانتخابات حضور دارند
              </h6>

              <Row className="">
                 <div>
               {`${electionCandidatesData?.data?.result?.unionInfo?.unionTitle}`} 
                </div> 

                <Table>
                  <thead>
                    <tr>
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
                                <tr>
                                  <th scope="row"></th>
                                  <td>
                                    {election.candidateFirstName}{' '}
                                    {election.candidateLastName}{' '}
                                  </td>
                                  <td> {election.mainJobTitle}</td>
                                  <td>{election.address}</td>
                                  <td>*</td>
                                  <td>*</td>
                                </tr>
                              </tbody>

                              {/* <Col lg={4} key={index} className="mt-5 mb-5">
                              <Link className="">
                               
                              </Link>
                            </Col> */}
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
              </Row>
            </Col>
          </Row>
          <Row>
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
              onPageChange={(page , pageSize) => {
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
