import { Col, Container, Row } from 'reactstrap';

import { Link, useHistory } from 'react-router-dom';
import './ElectionProvince.scss';

import { useEffect } from 'react';

import { UseGetElectionProvince } from '../../../core/services/api/get-election-province';
import ElectionLayout from '../layout/ElectionLayout/ElectionLayout';

const ElectionProvince = () => {
  const history = useHistory();
  const {
    data: electionProvinceData,
    isError: electionProvinceIsError,
    isLoading: electionProvinceIsLoading,
    isSuccess: electionProvinceIsSuccess,
    mutate: electionProvinceMutate,
  } = UseGetElectionProvince();

  useEffect(() => {
    electionProvinceMutate();
  }, []);

  return (
    <>
      <ElectionLayout>
        <Container fluid dir="rtl" className="">
          <Row className="">
            <Col>
              <h6 className="provinceParagraph">
                استان هایی که درانتخابات حضور دارند:
              </h6>

              <Row className="">
                {electionProvinceData && electionProvinceData.data ? (
                  electionProvinceData.data.result &&
                  (electionProvinceIsError || electionProvinceIsSuccess) ? (
                    electionProvinceData.data.result.map((election, index) => {
                      console.log('election: ', election);
                      return (
                        <div key={index} className=" provinceButton">
                          <Link
                            className="provinceButtonLink"
                            to={`/Election/Counties/${election.provinceId}`}
                          >
                            <p>{election.provinceTitle}</p>
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

export default ElectionProvince;
