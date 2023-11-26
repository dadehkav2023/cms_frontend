import { Col, Container, Row } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UseGetElectionProvince } from '../../../core/services/api/get-election-province';
import ElectionLayout from '../layout/ElectionLayout/ElectionLayout';
import Style from './ElectionProvince.module.scss';
import Loading from '../../common/Loading/Loading';

const ElectionProvince = () => {
  const [Province, setProvince] = useState();
  const getElectionProvine = UseGetElectionProvince();
  const { data, isLoading, isSuccess } = UseGetElectionProvince();
  
  useEffect(() => {
    if (data && data.data && data.data.result) {
      const result = data.data?.result;
      setProvince(result);
    }
  }, [isSuccess]);

  return (
    <>
      <ElectionLayout title=" :استان ">
        <Container fluid dir="rtl">
          {getElectionProvine.isLoading && <Loading />}
          <Row>
            <Col>
              {Province?.length > 0 &&
                Province?.map((election, index) => {
                  return (
                    <div key={index} className={`${Style.provinceButton} mb-5`}>
                      <Link
                        className={Style.provinceButtonLink}
                        to={`/Election/Counties/${election.provinceId}`}
                      >
                        <p>{election.provinceTitle}</p>
                      </Link>
                    </div>
                  );
                })}
            </Col>
          </Row>
        </Container>
      </ElectionLayout>
    </>
  );
};

export default ElectionProvince;
