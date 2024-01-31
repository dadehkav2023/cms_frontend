import { useEffect, useState } from "react";
import { UseGetElectionCounties } from "../../../core/services/api/get-election-counties";
import { useParams } from "react-router-dom";
import ElectionLocations from "../common/ElectionLocations/ElectionLocations";

const ElectionCounties = () => {
  const { id } = useParams();
  const [county, setCounty] = useState();

  const getCountiesMutation = UseGetElectionCounties();
  useEffect(() => {
    getCountiesMutation.mutate(id, {
      onSuccess(val) {
        const result = val.data?.result;

        let countyDataArray = [];
        result?.length > 0 &&
          result.forEach((row) => {
            countyDataArray.push({
              id: row.countyId,
              title: row.countyTitle,
            });
          });
        setCounty(countyDataArray);
      },
    });
  }, []);

  return (
    <>
      <ElectionLocations
        data={county}
        isLoading={getCountiesMutation.isLoading}
        title=":شهرستان"
        urlTitle="Unions"
      />
    </>
  );
};

export default ElectionCounties;
