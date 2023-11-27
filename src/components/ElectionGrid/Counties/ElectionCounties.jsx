import { Link, useHistory } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { useEffect, useState } from 'react';
import { UseGetElectionCounties } from '../../../core/services/api/get-election-counties';
import ElectionLayout from '../common/layout/ElectionLayout/ElectionLayout';
import Loading from '../../common/Loading/Loading';
import { useParams } from 'react-router-dom';
import Location from '../common/Location/Location';

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
        {isLoading && <Loading />}

        {counties?.length > 0 &&
          counties?.map((election, index) => {
            return (
              <Location
                key={index}
                index={index}
                locationId={election.countyId}
                locationTitle={election.countyTitle}
                urlTitle="Unions"
              />
            );
          })}
      </ElectionLayout>
    </>
  );
};

export default ElectionCounties;
