import React, { useEffect, useState } from 'react';
import './SignedChallengesGrid.scss';
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Col, Container, Row } from 'react-bootstrap';
import PeoplesVoiceFlashcard from '../PeoplesVoiceGridFlashCard/PeoplesVoiceGridFlashCard';
import { FallBackSpinner } from '../../common/Spinner/FallBackSpinner/FallbackSpinner';
import { useHistory, Link } from 'react-router-dom';
import { UseGetChallenge } from '../../../core/services/api/get-challenge';
import { UseGetSignedChallenge } from '../../../core/services/api/get-signed-challenge';
import { UseSignChallenge } from '../../../core/services/api/sign-challenge';
const SignedChallengesGrid = () => {
  const history = useHistory();

  const {
    data: challengeData,
    isError: challengeIsError,
    isLoading: challengeIsLoading,
    isSuccess: challengeIsSuccess,
  } = UseGetSignedChallenge();

  return challengeIsLoading ? (
    <FallBackSpinner />
  ) : (
    <>
      <section
        className="text-news-section-grid"
        style={{ textAlign: 'center' }}
      >
        <Container className="container" fluid>
          <Row className="text-news-gird">
            {challengeData && challengeData.data ? (
              challengeData.data.result[0] &&
              (challengeIsError || challengeIsSuccess) ? (
                challengeData.data.result.map((challenge, index) => {
                  return (
                    <Col lg={3} key={index}>
                      <Link
                        className="text-news-grid-item"
                        to={`/Challenges/details/${challenge.farmerVoiceId}`}
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
                          showSignature={false}
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
        </Container>
      </section>
    </>
  );
};
export default SignedChallengesGrid;
