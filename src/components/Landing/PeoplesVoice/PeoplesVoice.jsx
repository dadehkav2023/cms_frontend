import React, { useEffect, useState } from 'react';
import './PeoplesVoice.scss';
import SectionTitle from '../../common/SectionTitle/SectionTitle';
import PeoplesVoiceFlashCard from './PeoplesVoiceFlashCard/PeoplesVoiceFlashCard';
import { Col, Container, Row, Tabs, Tab } from 'react-bootstrap';
import Carousel from 'react-elastic-carousel';
import './PeoplesVoice.scss';
import MoreItemsButton from '../../common/Buttons/MoreItemsButton/MoreItemsButton';
import NewChallengeButton from '../../common/Buttons/NewChallengeButton/NewChallengeButton';
import { UseAddChallenge } from '../../../core/services/api/add-challenge';
import { UseGetChallenge } from '../../../core/services/api/get-challenge';
import { FallBackSpinner } from '../../common/Spinner/FallBackSpinner/FallbackSpinner';
import { Link, useHistory } from 'react-router-dom';

const PeoplesVoice = () => {
  const breakPoints = [
    { width: 800, itemsToShow: 1 },
    { width: 1000, itemsToShow: 2 },
    { width: 1500, itemsToShow: 3 },
  ];
  const {
    data: challengeData,
    isError: challengeIsError,
    isLoading: challengeIsLoading,
    isSuccess: challengeIsSuccess,
    mutate: challengeMutate,
  } = UseAddChallenge();

  const {
    data: getData,
    isError: getIsError,
    isLoading: getIsLoading,
    isSuccess: getIsSuccess,
    mutate: getMutate,
  } = UseGetChallenge();

  useEffect(() => {
    getMutate({
      page: 1,
      pageSize: 10,
      loadInTimeChallenges: true,
    });
  }, []);

  const history = useHistory();

  return getIsLoading ? (
    <>
      <FallBackSpinner />
    </>
  ) : (
    <>
      {getData?.data.result.challenges[0] ? (
        <>
          <section className="Peoples-voices-section">
            <SectionTitle TitleText="صدای مردم" />
            <NewChallengeButton
              action={() => {
                history.push('/Challenges/new');
              }}
            />
            <Tabs className="peoples-voice-tab" defaultActiveKey="mahboobTarin">
              <Tab id="mahboobTarin" eventKey="mahboobTarin" title="محبوب ترین">
                <Carousel itemPosition="START" isRTL breakPoints={breakPoints}>
                  {getData && getData.data ? (
                    getData.data.result.challenges[0] &&
                    (getIsError || getIsSuccess) ? (
                      getData.data.result.challenges.map((challenge, index) => {
                        return (
                          <Link
                            key={index}
                            style={{
                              color: '#000',
                              textDecoration: 'none',
                            }}
                            to={`/Challenges/details/${challenge.id}`}
                          >
                            <PeoplesVoiceFlashCard
                              title={challenge.title}
                              from={
                                challenge.authorFirstName +
                                ' ' +
                                challenge.authorLastName
                              }
                              startDate={challenge.startDateTimeShowAsJalali}
                              endDate={challenge.endDateTimeShowAsJalali}
                              signatures={`${challenge.signaturesCount}`}
                              image={challenge.imagePath}
                            />
                          </Link>
                        );
                      })
                    ) : (
                      <>
                        <h2
                          style={{
                            color: 'red',
                            textAlign: 'center',
                            width: '100%',
                          }}
                        >
                          هیچ اطلاعاتی جهت نمایش وجود ندارد
                        </h2>
                      </>
                    )
                  ) : (
                    <>
                      <h1
                        style={{
                          color: '#000',
                          textAlign: 'center',
                          width: '100%',
                        }}
                      >
                        لطفا منتظر بمانید
                      </h1>
                    </>
                  )}

                  {/* <PeoplesVoiceFlashCard
                    title="درخواست اقدام برای نجات تالاب شمالی"
                    from="فعالان و دلسوزان محیط زیست"
                    startDate="۱۴۰۰/۰۲/۱۴"
                    endDate="۱۴۰۰/۰۴/۱۰"
                    signatures="۱۲۳۵۶"
                    signURL="/"
                  /> */}
                </Carousel>
                <Link to="/Challenges">
                  <MoreItemsButton text="سایر صدای کشاورزان" />
                </Link>
              </Tab>
            </Tabs>
          </section>
        </>
      ) : (
        <>
           {/* <SectionTitle TitleText="اخبار" />
          <h2
            style={{
              color: 'red',
              textAlign: 'center',
              width: '100%',
              margin: '30px 0 30px 0',
            }}
          >
            هیچ اطلاعاتی جهت نمایش وجود ندارد
          </h2>  */}
        </>
      )}
    </>
  );
};
export default PeoplesVoice;
