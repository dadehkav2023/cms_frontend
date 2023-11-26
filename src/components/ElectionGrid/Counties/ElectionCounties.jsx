import { Link, useHistory } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { useEffect, useState } from 'react';
import { UseGetElectionCounties } from '../../../core/services/api/get-election-counties';
import ElectionLayout from '../layout/ElectionLayout/ElectionLayout';
import Loading from '../../common/Loading/Loading';
import { useParams } from 'react-router-dom';
import Style from './ElectionCounties.module.scss'

const ElectionCounties = () => {
  const { id } = useParams();
  const { data, isLoading, isSuccess, mutate } = UseGetElectionCounties();
  const counties = data && data.data && data.data.result;
  useEffect(() => {
    mutate(id);
  }, []);

  return (
    <>
      <ElectionLayout title={':شهرستان'}>
        <Container fluid dir="rtl">
          {isLoading && <Loading />}
          <Row>
            <Col>
              {counties?.length > 0 &&
                counties?.map((election, index) => {
                  return (
                    <div key={index} className={`${Style.countieseButton} mb-5`}>
                      <Link
                        className={Style.countiesButtonLink}
                        to={`/Election/Unions/${election.countyId}`}
                      >
                        <p>{election.countyTitle}</p>
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

export default ElectionCounties;
