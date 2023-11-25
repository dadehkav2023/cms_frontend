import { Col, Container, Row, Table } from 'reactstrap';
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
        <Container fluid dir="rtl">
          <Row>
            <Col>
              <h6 className="unionsParagraph mb-5">
                اتحادیه هایی که درانتخابات حضور دارند:
              </h6>

              <Row className="">
                <Table>
                  <thead>
                    <tr>
                      <th>ردیف</th>
                      <th>نام اتحادیه</th>
                    </tr>
                  </thead>
                  {electionUnionsData && electionUnionsData.data ? (
                    electionUnionsData.data.result &&
                    (electionUnionsIsError || electionUnionsIsSuccess) ? (
                      electionUnionsData.data.result.map((election, index) => {
                        return (
                          <>
                            <tbody>
                              <tr>
                                <th scope="row">{index + 1}</th>
                                <Link
                                  className="unionsButtonLink"
                                  to={`/Election/Candidates/${election.unionElectionId}`}
                                >
                                  <td>{election.unionTitle}</td>
                                </Link>
                              </tr>
                            </tbody>
                          </>
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
                </Table>
              </Row>
            </Col>
          </Row>
        </Container>
      </ElectionLayout>
    </>
  );
};

export default ElectionUnions;
