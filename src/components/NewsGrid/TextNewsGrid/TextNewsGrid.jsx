import React, { useEffect, useRef, useState } from 'react';
import './TextNewsGrid.scss';
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import { UseGetTextNews } from '../../../core/services/api/get-text-news';
import TextNewsFlashCard from '../NewsGridFlashCard/NewsGridFlashCard';
import { UseGetCategories } from '../../../core/services/api/get-news-categories';
import { FallBackSpinner } from '../../common/Spinner/FallBackSpinner/FallbackSpinner';
import { useHistory, Link } from 'react-router-dom';
const TextNewsGrid = () => {
  const history = useHistory();
  const [pageSize, setPageSize] = useState(12);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [newsType, setNewsType] = useState(1);

  useEffect(() => {
    if (newsType === 1) {
      history.push('/News/TextNews');
    } else if (newsType === 2) {
      history.push('/News/PhotoNews');
    } else {
      history.push('/News/VideoNews');
    }
  }, [newsType]);

  const {
    data: textNewsData,
    isError: textNewsIsError,
    isLoading: textNewsIsLoading,
    isSuccess: textNewsIsSuccess,
    mutate: textNewsMutate,
  } = UseGetTextNews();

  useEffect(() => {
    textNewsMutate({
      page: 1,
      pageSize: pageSize,
      isActive: true,
    });
  }, []);

  useEffect(() => {
    textNewsMutate({
      title: searchText,
      page: pageNumber,
      pageSize: pageSize,
      isActive: true,
    });
  }, [pageSize, pageNumber, searchText, newsType]);

  return (
    <>
      <section
        className="text-news-section-grid"
        style={{ textAlign: 'center' }}
      >
        <Container className="container" fluid>
          <Row
            style={{
              direction: 'rtl',
            }}
          >
            <Col lg={4} style={{ direction: 'rtl' }}>
              <Row>
                <Col xs={6}> تعداد نمایش :</Col>

                <Col xs={6}>
                  <select
                    onChange={(e) => {
                      const newCount = +e.target.value;
                      setPageSize(newCount);
                    }}
                    style={{ float: 'right' }}
                  >
                    <option selected={pageSize === 12} value="12">
                      ۱۲
                    </option>
                    <option selected={pageSize === 24} value="24">
                      ۲۴
                    </option>
                    <option selected={pageSize === 50} value="50">
                      ۵۰
                    </option>
                    <option selected={pageSize === 100} value="100">
                      ۱۰۰
                    </option>
                  </select>
                </Col>
              </Row>
            </Col>

            <Col lg={4} style={{ direction: 'rtl' }}>
              <Row>
                <Col xs={6}> نوع خبر :</Col>
                <Col xs={6}>
                  {' '}
                  <select
                    onChange={(e) => {
                      const selectedNewsType = +e.target.value;
                      setNewsType(selectedNewsType);
                    }}
                    style={{ float: 'right' }}
                  >
                    <option value="1">متنی</option>
                    <option value="2">تصویری</option>
                    <option value="3">ویدئویی</option>
                  </select>
                </Col>
              </Row>{' '}
            </Col>

            <Col xl={2}>جست و جو در عنوان :</Col>
            <Col xl={2}>
              <input
                type="text"
                onChange={(e) => {
                  setTimeout(() => {
                    setSearchText(e.target.value);
                  }, 800);
                }}
              />
            </Col>
          </Row>
        </Container>
        <Container className="container" fluid>
          <Row className="text-news-gird">
            {textNewsData && textNewsData.data ? (
              textNewsData.data.result.newsList[0] &&
              (textNewsIsError || textNewsIsSuccess) ? (
                textNewsData.data.result.newsList.map((news, index) => {
                  return (
                    <Col lg={3} key={index}>
                      <Link
                        className="text-news-grid-item"
                        to={`/News/TextNews/${news.id}`}
                      >
                        <TextNewsFlashCard
                          id={news.id}
                          title={news.title}
                          subTitle={news.subTitle}
                          date={news.publishedDateTimeAsJalali}
                          img={news.imagePath}
                        />
                      </Link>
                    </Col>
                  );
                })
              ) : (
                <h2
                  style={{
                    color: 'red',
                    textAlign: 'center',
                    width: '100%',
                    margin: '20px 0 20px 0',
                  }}
                >
                  هیچ اطلاعاتی جهت نمایش وجود ندارد
                </h2>
              )
            ) : (
              <h1
                style={{
                  color: '#000',
                  textAlign: 'center',
                  width: '100%',
                  margin: '20px 0 20px 0',
                }}
              >
                لطفا منتظر بمانید
              </h1>
            )}
          </Row>

          <ReactPaginate
            previousLabel={
              <span className="page-prev">
                <ChevronRight size={15} />
                {'<'}
              </span>
            }
            nextLabel={
              <span className="page-prev">
                <ChevronLeft size={15} />
                {'>'}
              </span>
            }
            breakLabel="..."
            breakClassName="break-me"
            pageCount={Math.ceil(
              textNewsData?.data.result.totalCount / pageSize
            )}
            containerClassName="disabled-pagination-btn pagination-holder"
            activeClassName="page-active"
            forcePage={pageNumber - 1}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            onPageChange={(page) => {
              setPageNumber(page.selected + 1);
            }}
          />
        </Container>
      </section>
    </>
  );
};
export default TextNewsGrid;
