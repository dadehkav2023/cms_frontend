import React, { useEffect, useState } from 'react';
import './MyChallengesGrid.scss';
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Col, Container, Row } from 'react-bootstrap';
import PeoplesVoiceFlashcard from '../PeoplesVoiceGridFlashCard/PeoplesVoiceGridFlashCard';
import { FallBackSpinner } from '../../common/Spinner/FallBackSpinner/FallbackSpinner';
import { useHistory, Link } from 'react-router-dom';
import { UseGetChallenge } from '../../../core/services/api/get-challenge';
import { useUserAuth } from '../../../core/utils/context/AuthenticationContext';
const MyChallengesGrid = () => {
  const { userInfo } = useUserAuth();
  const history = useHistory();
  const [pageSize, setPageSize] = useState(12);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState('');

  const {
    data: challengeData,
    isError: challengeIsError,
    isLoading: challengeIsLoading,
    isSuccess: challengeIsSuccess,
    mutate: challengeMutate,
  } = UseGetChallenge();

  useEffect(() => {
    challengeMutate({
      authorUserId: +userInfo.localId,
      page: 1,
      pageSize: pageSize,
      isActive: true,
    });
  }, [userInfo.localId]);

  useEffect(() => {
    challengeMutate({
      authorUserId: +userInfo.localId,
      title: searchText,
      page: pageNumber,
      pageSize: pageSize,
      isActive: true,
    });
  }, [pageSize, pageNumber, searchText, userInfo.localId]);

  return challengeIsLoading ? (
    <FallBackSpinner />
  ) : (
    <>
      <section
        className="text-news-section-grid"
        style={{ textAlign: 'center' }}
      >
        <Container className="container" fluid>
          <Row
            style={{
              direction: 'rtl',
            }}
          >
            <Col lg={6} style={{ direction: 'rtl' }}>
              <Row>
                <Col xs={6}> تعداد نمایش :</Col>

                <Col xs={6}>
                  <select
                    onChange={(e) => {
                      const newCount = +e.target.value;
                      setPageSize(newCount);
                    }}
                    style={{ float: 'right' }}
                  >
                    <option selected={pageSize === 12} value="12">
                      ۱۲
                    </option>
                    <option selected={pageSize === 24} value="24">
                      ۲۴
                    </option>
                    <option selected={pageSize === 50} value="50">
                      ۵۰
                    </option>
                    <option selected={pageSize === 100} value="100">
                      ۱۰۰
                    </option>
                  </select>
                </Col>
              </Row>
            </Col>

            <Col sm={3}>جست و جو در عنوان :</Col>
            <Col sm={3}>
              <input
                type="text"
                onChange={(e) => {
                  setTimeout(() => {
                    setSearchText(e.target.value);
                  }, 800);
                }}
              />
            </Col>
          </Row>
        </Container>
        <Container className="container" fluid>
          <Row className="text-news-gird">
            {challengeData && challengeData.data ? (
              challengeData.data.result.challenges[0] &&
              (challengeIsError || challengeIsSuccess) ? (
                challengeData.data.result.challenges.map((challenge, index) => {
                  return (
                    <Col lg={3} key={index}>
                      <Link
                        className="text-news-grid-item"
                        to={`/Challenges/details/${challenge.id}`}
                      >
                        <PeoplesVoiceFlashcard
                          // id={news.id}
                          title={challenge.title}
                          signatures={+challenge.signaturesCount}
                          image={challenge.imagePath}
                          from={
                            challenge.authorFirstName +
                            ' ' +
                            challenge.authorLastName
                          }
                        />
                      </Link>
                    </Col>
                  );
                })
              ) : (
                <h2
                  style={{
                    color: 'red',
                    textAlign: 'center',
                    width: '100%',
                    margin: '20px 0 20px 0',
                  }}
                >
                  هیچ اطلاعاتی جهت نمایش وجود ندارد
                </h2>
              )
            ) : (
              <h1
                style={{
                  color: '#000',
                  textAlign: 'center',
                  width: '100%',
                  margin: '20px 0 20px 0',
                }}
              >
                لطفا منتظر بمانید
              </h1>
            )}
          </Row>

          <ReactPaginate
            previousLabel={
              <span className="page-prev">
                <ChevronRight size={15} />
                {'<'}
              </span>
            }
            nextLabel={
              <span className="page-prev">
                <ChevronLeft size={15} />
                {'>'}
              </span>
            }
            breakLabel="..."
            breakClassName="break-me"
            pageCount={Math.ceil(
              challengeData?.data.result.totalCount / pageSize
            )}
            containerClassName="disabled-pagination-btn pagination-holder"
            activeClassName="page-active"
            forcePage={pageNumber - 1}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            onPageChange={(page) => {
              setPageNumber(page.selected + 1);
            }}
          />
        </Container>
      </section>
    </>
  );
};
export default MyChallengesGrid;
