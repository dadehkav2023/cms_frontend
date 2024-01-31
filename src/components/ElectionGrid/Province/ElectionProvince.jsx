import { useEffect, useState } from "react";
import { UseGetElectionProvince } from "../../../core/services/api/get-election-province";
import ElectionLocations from "../common/ElectionLocations/ElectionLocations";

const ElectionProvince = () => {
  const [province, setProvince] = useState();
  const { data, isLoading, isFetching, isSuccess } = UseGetElectionProvince();
  useEffect(() => {
    if (data && data.data && data.data.result) {
      const result = data.data?.result;

      let provinceDataArray = [];
      result?.length > 0 &&
        result.forEach((row) => {
          provinceDataArray.push({
            id: row.provinceId,
            title: row.provinceTitle,
          });
        });
      setProvince(provinceDataArray);
    }
  }, [isSuccess, data]);
  return (
    <>
      <ElectionLocations
        data={province}
        isLoading={isFetching}
        title=":استان"
        urlTitle="Counties"
      />
    </>
  );
};
export default ElectionProvince;
