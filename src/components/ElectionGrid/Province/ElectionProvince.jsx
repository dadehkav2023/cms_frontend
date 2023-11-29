import { useEffect, useState } from 'react';
import { UseGetElectionProvince } from '../../../core/services/api/get-election-province';
import Loading from '../../common/Loading/Loading';
import Location from '../common/Location/Location';
import ElectionLayout from '../common/layout/ElectionLayout/ElectionLayout';

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
    <div>
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
    </div>
  );
};
export default ElectionProvince;
