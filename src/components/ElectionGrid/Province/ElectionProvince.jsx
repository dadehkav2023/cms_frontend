import { Col, Container, Row } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UseGetElectionProvince } from '../../../core/services/api/get-election-province';
import ElectionLayout from '../common/layout/ElectionLayout/ElectionLayout';
import Loading from '../../common/Loading/Loading';
import Location from '../common/Location/Location';

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
      <ElectionLayout title=":استان">
        {getElectionProvine.isLoading && <Loading />}
        {Province?.length > 0 &&
          Province?.map((election, index) => {
            return (
              <Location
                key={index}
                index={index}
                locationId={election.provinceId}
                locationTitle={election.provinceTitle}
                urlTitle="Counties"
              />
            );
          })}
      </ElectionLayout>
    </>
  );
};
export default ElectionProvince;
