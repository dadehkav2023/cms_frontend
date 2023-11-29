import { useEffect, useState } from 'react';
import { Col, Container, Tab, Tabs } from 'react-bootstrap';
import Carousel from 'react-elastic-carousel';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UseGetCategories } from '../../../core/services/api/get-news-categories';
import { UseGetPhotoNews } from '../../../core/services/api/get-photo-news';
import MoreItemsButton from '../../common/Buttons/MoreItemsButton/MoreItemsButton';
import SectionTitle from '../../common/SectionTitle/SectionTitle';
import { FallBackSpinner } from '../../common/Spinner/FallBackSpinner/FallbackSpinner';
import './PhotoNews.scss';
import NewsGridFlashCard from '../../NewsGrid/NewsGridFlashCard/NewsGridFlashCard';

const PhotoNews = () => {
  // const scrollToTop = () => {
  //   window.scrollTo(0, 0); // Scroll to the top of the page
  // };
  const state = useSelector((state) => state.setting);
  const breakPoints = [
    { width: 400, itemsToShow: 1 },
    { width: 800, itemsToShow: 2 },
    { width: 1200, itemsToShow: 3 },
    { width: 1600, itemsToShow: 4 },
    { width: 2000, itemsToShow: 5 },
  ];
  const [selectedCategory, setSelectedCategory] = useState(0);
  const {
    data: categoryData,
    isError: categoryIsError,
    isLoading: categoryIsLoading,
    isSuccess: categoryIsSuccess,
  } = UseGetCategories();
  const {
    data: photoNewsData,
    isError: photoNewsIsError,
    isLoading: photoNewsIsLoading,
    isSuccess: photoNewsIsSuccess,
    mutate: photoNewsMutate,
  } = UseGetPhotoNews();

  useEffect(() => {
    categoryData &&
      categoryData.data &&
      categoryData.data.result[0] &&
      setSelectedCategory(categoryData.data.result[0].id);
  }, [categoryData]);

  useEffect(() => {
    photoNewsMutate({
      page: 1,
      pageSize: state.homePageNewsCount,
      categoryIds: [selectedCategory],
      isActive: true,
    });
  }, [selectedCategory, state.homePageNewsCount]);
  return categoryIsSuccess ? (
    <>
      {categoryData?.data.result[0] ? (
        <>
          <Container
            fluid
            className="pr-lg-5 pt-lg-5 photo-news-section-container  "
          >
            <section className="photo-news-section ">
              <SectionTitle className="sectionTitle " TitleText=" تصاویر" />
              <Link
                style={{
                  color: 'rgba(0, 0, 0, 0.5)',
                }}
                to="/News/PhotoNews"
                // onClick={scrollToTop} // Call scrollToTop when the link is clicked
              >
                <MoreItemsButton text=" مشاهده بیشتر" />
              </Link>
              <Tabs
                onSelect={(e) => {
                  setSelectedCategory(+e);
                }}
                className="photo-news-tab"
                defaultActiveKey={categoryData?.data.result[0].id}
              >
                {categoryData?.data.result.map((category, index) => {
                  return (
                    <Tab
                      key={index}
                      id={category.id}
                      eventKey={category.id}
                      title={category.title}
                    >
                      <Carousel
                        itemPosition="START"
                        isRTL
                        breakPoints={breakPoints}
                      >
                        {photoNewsData && photoNewsData.data ? (
                          photoNewsData?.data?.result.newsList[0] &&
                          (photoNewsIsError || photoNewsIsSuccess) ? (
                            photoNewsData?.data?.result.newsList.map(
                              (news, index) => {
                                return (
                                  <Col lg={3} className="mt-5 mb-5">
                                    <Link
                                      key={index}
                                      className="photo-news-grid-item "
                                      style={{
                                        color: '#000',
                                        textDecoration: 'none',
                                        marginTop: '50px',
                                      }}
                                      to={{
                                        pathname: `/News/PhotoNews/${news.id}`,
                                        state: { photosNewsData: news },
                                      }}
                                      // onClick={scrollToTop} // Call scrollToTop when the link is clicked
                                    >
                                      <NewsGridFlashCard
                                        id={news.id}
                                        title={news.title}
                                        subTitle={news.subTitle}
                                        date={news.publishedDateTimeAsJalali}
                                        img={news.imagePath}
                                      />
                                    </Link>
                                  </Col>
                                );
                              }
                            )
                          ) : (
                            <h2
                              style={{
                                color: 'red',
                                textAlign: 'center',
                                fontSize: '14px',
                                width: '100%',
                                margin: '10%',
                              }}
                            >
                              هیچ اطلاعاتی جهت نمایش وجود ندارد
                            </h2>
                          )
                        ) : (
                          <div
                            style={{
                              color: 'black',
                              textAlign: 'center',
                              width: '100%',
                              margin: '10% ',
                            }}
                          >
                            <h1
                              style={{
                                fontSize: '14px',
                                color: '#2A7221',
                                width: '100%',
                              }}
                            >
                              لطفا منتظر بمانید...
                            </h1>
                            <div className="spinner"></div>
                          </div>
                        )}
                      </Carousel>
                    </Tab>
                  );
                })}
              </Tabs>
            </section>
          </Container>
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
          </h2> */}
        </>
      )}
    </>
  ) : (
    <>
      <FallBackSpinner />
    </>
  );
};
export default PhotoNews;
