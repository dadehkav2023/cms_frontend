import { Link, useHistory } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import './ElectionCounties.scss';

import { useEffect } from 'react';

import { UseGetElectionCounties } from '../../../core/services/api/get-election-counties';
import ElectionLayout from '../layout/ElectionLayout/ElectionLayout';

const ElectionCounties = () => {
  const history = useHistory();
  const {
    data: electionCountiesData,
    isError: electionCountiesIsError,
    isLoading: electionCountiesIsLoading,
    isSuccess: electionCountiesIsSuccess,
    mutate: electionCountiesMutate,
  } = UseGetElectionCounties();

  useEffect(() => {
    electionCountiesMutate();
  }, []);

  return (
    <>
      <ElectionLayout>
        <Container fluid dir="rtl" className="">
          <Row>
            <Col>
              <h6 className="countiesParagraph">
                شهرستان هایی که درانتخابات حضور دارند
              </h6>

              <Row className="">
                {electionCountiesData && electionCountiesData.data ? (
                  electionCountiesData.data.result &&
                  (electionCountiesIsError || electionCountiesIsSuccess) ? (
                    electionCountiesData.data.result.map((election, index) => {
                      return (
                        <div key={index} className="countieseButton">
                          <Link
                            className="countiesButtonLink"
                            to={`/Election/Unions/${election.countyId}`}
                          >
                            <p>{election.countyTitle}</p>
                            
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

export default ElectionCounties;
