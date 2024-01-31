import Loading from "../../../common/Loading/Loading";
import Location from "./Location/Location";
import ElectionLayout from "../layout/ElectionLayout/ElectionLayout";

const ElectionLocations = ({ data, isLoading, urlTitle, title }) => {
  return (
    <>
      <ElectionLayout title={title}>
        {isLoading && <Loading />}
        {data?.length > 0 &&
          data?.map((item, index) => {
            return (
              <Location
                key={index}
                index={index}
                locationId={item.id}
                locationTitle={item.title}
                urlTitle={urlTitle}
              />
            );
          })}
      </ElectionLayout>
    </>
  );
};

export default ElectionLocations;
