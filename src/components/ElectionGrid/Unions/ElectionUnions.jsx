import { Col, Container, Row } from 'reactstrap';

import './ElectionUnions.scss';

import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UseGetElectionUnions } from '../../../core/services/api/get-election-unions';
import ElectionLayout from '../layout/ElectionLayout/ElectionLayout';

const ElectionUnions = () => {
  const history = useHistory();
  const {
    data: electionUnionsData,
    isError: electionUnionsIsError,
    isLoading: electionUnionsIsLoading,
    isSuccess: electionUnionsIsSuccess,
    mutate: electionUnionsMutate,
  } = UseGetElectionUnions();

  useEffect(() => {
    electionUnionsMutate();
  }, []);

  return (
    <>
      <ElectionLayout>
        <Container fluid dir="rtl" className="">
          <Row>
            <Col>
              <h6 className="unionsParagraph">
                اتحادیه هایی که درانتخابات حضور دارند
              </h6>

              <Row className="">
                {electionUnionsData && electionUnionsData.data ? (
                  electionUnionsData.data.result &&
                  (electionUnionsIsError || electionUnionsIsSuccess) ? (
                    electionUnionsData.data.result.map((election, index) => {
                      return (
                        <div key={index} className="unionsButton">
                          <Link
                            className="unionsButtonLink"
                            to={`/Election/Candidates/${election.unionId}`}
                          >
                            <p>{election.unionTitle}</p>
                          </Link>
                        </div>
                      );
                    })
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
              </Row>
            </Col>
          </Row>
        </Container>
      </ElectionLayout>
    </>
  );
};

export default ElectionUnions;
