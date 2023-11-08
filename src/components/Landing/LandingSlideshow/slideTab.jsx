const slideTab = () => {
    return (
        <div>
           <Tabs
                onSelect={(e) => {
                  setSelectedCategory(+e);
                }}
                className="text-news-tab"
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
                        {textNewsData && textNewsData.data ? (
                          textNewsData?.data?.result.newsList[0] &&
                          (textNewsIsError || textNewsIsSuccess) ? (
                            textNewsData?.data?.result.newsList.map(
                              (news, index) => {
                                return (
                                  <Link
                                    key={index}
                                    style={{
                                      color: '#000',
                                      textDecoration: 'none',
                                      marginTop: '50px',
                                    }}
                                    to={{
                                      pathname: `/News/TextNews/${news.id}`,
                                      state: { newsData: news },
                                    }}
                                    onClick={scrollToTop} // Call scrollToTop when the link is clicked
                                  >
                                    <TextNewsFlashCard
                                      title={news.title}
                                      description={news.summaryTitle}
                                      img={news.imagePath}
                                      id={news.id}
                                      date={news.publishedDateTimeAsJalali}
                                    />
                                  </Link>
                                );
                              }
                            )
                          ) : (
                            <h2
                              style={{
                                color: 'red',
                                fontSize: '14px',
                                textAlign: 'center',
                                width: '100%',
                                margin: '10% ',
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
                                color: '#065cfd',
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
        </div>
    );
}

export default slideTab;