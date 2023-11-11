import React, { useEffect } from 'react';
import Carousel from 'react-elastic-carousel';

import './Services.scss';
import ServiceItem from './ServicesItem/ServicesItem';

import SectionTitle from '../../common/SectionTitle/SectionTitle';
import { UseGetServices } from '../../../core/services/api/get-services';
import { correctUploadPath } from '../../../core/utils/image-path-correction';
import { Container } from 'react-bootstrap';
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 630, itemsToShow: 2 },
  { width: 945, itemsToShow: 3 },
  { width: 1260, itemsToShow: 4 },
  { width: 1575, itemsToShow: 5 },
];

function Services() {
  const {
    data: getAllData,
    isError: getAllIsError,
    isLoading: getAllIsLoading,
    isSuccess: getAllIsSuccess,
    mutate: getAllMutate,
  } = UseGetServices();

  useEffect(() => {
    getAllMutate({
      page: 1,
      pageSize: 5000,
      isActive: true,
    });
  }, []);

  return getAllIsSuccess ? (
    <Container fluid className="pr-lg-5 pt-lg-5">
      <section className="service-section">
        <div className="service-container">
          <SectionTitle TitleText=" خدمات ما" className="sectionTitle"/>

          <Carousel itemPosition="CENTER" isRTL breakPoints={breakPoints}>
            {getAllData && getAllData.data ? (
              getAllData.data.result.serviceDeskList[0] &&
              (getAllIsError || getAllIsSuccess) ? (
                getAllData.data.result.serviceDeskList.map((service, index) => {
                  return (
                    <ServiceItem
                      key={index}
                      servicePic={correctUploadPath(service.imagePath)}
                      serviceTitle={service.title}
                      serviceLink={service.linkService}
                    />
                  );
                })
              ) : (
                <h2
                  style={{
                    color: 'red',
                    textAlign: 'center',
                    width: '100%',
                  }}
                >
                  هیچ اطلاعاتی جهت نمایش وجود ندارد
                </h2>
              )
            ) : (
              <h1>لطفا منتظر بمانید</h1>
            )}
          </Carousel>
        </div>
      </section>
    </Container>
  ) : (
    <></>
  );
}

export default Services;
