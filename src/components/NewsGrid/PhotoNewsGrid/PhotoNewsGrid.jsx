import React, { useEffect, useState } from "react";
import "./PhotoNewsGrid.scss";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import TextNewsFlashCard from "../NewsGridFlashCard/NewsGridFlashCard";
import { UseGetCategories } from "../../../core/services/api/get-news-categories";
import { FallBackSpinner } from "../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { UseGetPhotoNews } from "../../../core/services/api/get-photo-news";
import { useHistory, Link } from "react-router-dom";

const PhotoNewsGrid = () => {
  const [newsType, setNewsType] = useState(2);
  const history = useHistory();

  useEffect(() => {
    if (newsType === 1) {
      history.push("/News/TextNews");
    } else if (newsType === 2) {
      history.push("/News/PhotoNews");
    } else {
      history.push("/News/VideoNews");
    }
  }, [newsType]);

  const [pageSize, setPageSize] = useState(12);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState("");
  const {
    data: photoNewsData,
    isError: photoNewsIsError,
    isLoading: photoNewsIsLoading,
    isSuccess: photoNewsIsSuccess,
    mutate: photoNewsMutate,
  } = UseGetPhotoNews();

  useEffect(() => {
    photoNewsMutate({
      title: searchText,
      page: 1,
      pageSize: pageSize,
      isActive: true,
    });
  }, []);

  useEffect(() => {
    photoNewsMutate({
      title: searchText,
      page: pageNumber,
      pageSize: pageSize,
      isActive: true,
    });
  }, [pageSize, pageNumber, searchText]);

  return (
    <>
      <section className="photo-news-section" style={{ textAlign: "center" }}>
        <Container className="container" fluid>
          <Row style={{ direction: "rtl" }}>
            <Col lg={4} style={{ direction: "rtl" }}>
              <Row>
                <Col xs={6}> تعداد نمایش :</Col>

                <Col xs={6}>
                  <select
                    onChange={(e) => {
                      const newCount = +e.target.value;
                      setPageSize(newCount);
                    }}
                    style={{ float: "right" }}
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
            <Col lg={4} style={{ direction: "rtl" }}>
              <Row>
                <Col xs={6}> نوع خبر :</Col>
                <Col xs={6}>
                  {" "}
                  <select
                    onChange={(e) => {
                      const selectedNewsType = +e.target.value;
                      setNewsType(selectedNewsType);
                    }}
                    style={{ float: "right" }}
                  >
                    <option value="2">تصویری</option>
                    <option value="1">متنی</option>
                    <option value="3">ویدئویی</option>
                  </select>
                </Col>
              </Row>{" "}
            </Col>

            <Col xl={2}>جست و جو در عنوان :</Col>
            <Col xl={2}>
              <input
                type="text"
                onChange={(e) => {
                  setTimeout(() => {
                    setSearchText(e.target.value);
                  }, 400);
                }}
              />
            </Col>
          </Row>
          <Row className="text-news-gird">
            {photoNewsData && photoNewsData.data ? (
              photoNewsData.data.result.newsList[0] &&
              (photoNewsIsError || photoNewsIsSuccess) ? (
                photoNewsData.data.result.newsList.map((news, index) => {
                  return (
                    <Col lg={3} key={index}>
                      <Link
                        className="text-news-grid-item"
                        to={`/News/PhotoNews/${news.id}`}
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
                    color: "red",
                    textAlign: "center",
                    width: "100%",
                    margin: "20px 0 20px 0",
                  }}
                >
                  هیچ اطلاعاتی جهت نمایش وجود ندارد
                </h2>
              )
            ) : (
              <h1
                style={{
                  color: "#00",
                  textAlign: "center",
                  width: "100%",
                  margin: "20px 0 20px 0",
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
                {"<"}
              </span>
            }
            nextLabel={
              <span className="page-prev">
                <ChevronLeft size={15} />
                {">"}
              </span>
            }
            breakLabel="..."
            breakClassName="break-me"
            pageCount={Math.ceil(
              photoNewsData?.data.result.totalCount / pageSize
            )}
            containerClassName="disabled-pagination-btn pagination-holder"
            activeClassName="page-active"
            forcePage={pageNumber - 1}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            onPageChange={(page) => {
              setPageNumber(page.selected + 1);
            }}
          />{" "}
        </Container>
      </section>
    </>
  );
};
export default PhotoNewsGrid;
