import React, { useEffect, useState } from "react";
import "./PeoplesVoiceFinalRegistration.scss";
import { Card, Button, Container, Col, Row } from "react-bootstrap";
import { FallBackSpinner } from "../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { useParams, Redirect } from "react-router-dom";
import SectionTitle from "../../common/SectionTitle/SectionTitle";
import Styles from "./ExtraStyles.module.scss";
import { UseGetChallengeDetails } from "../../../core/services/api/get-challenge-details";
import PeoplesVoiceSignButton from "../../common/Buttons/PeoplesVoiceSignButton/PeoplesVoiceSignButton";
import { SimpleSubmitButton } from "../../common/SimpleSubmitBtn/SimpleSubmitButton";
import { correctUploadPath } from "../../../core/utils/image-path-correction";
import { UseAddChallengeAttachment } from "../../../core/services/api/add-challenge-attachment.api";
import { AddChallengeAttachmentsModal } from "./AddChallengeAttachmentsModal/AddChallengeAttachmentsModal";
import { DeleteChallengeAttachmentsModal } from "./DeleteChallengeAttachmentsModal/DeleteChallengeAttachmentsModal";
import { EditChallengeAttachmentsModal } from "./EditChallengeAttachmentsModal/EditChallengeAttachmentsModal";
import { UseDeleteChallengeAttachment } from "../../../core/services/api/delete-challenge-attachment.api";
import { UseGetChallengeAttachments } from "../../../core/services/api/get-challenge-attachments.api";
import { UseEditChallengeAttachment } from "../../../core/services/api/edit-challenge-attachment.api";
import PeoplesVoiceConfirmButton from "../../common/Buttons/PeoplesVoiceConfirmButton/PeoplesVoiceConfirmButton";
import { UseGetHashtags } from "../../../core/services/api/get-hashtags.api";
import { InpuLable } from "../../common/InputLable/InputLable";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { UseSetHashtags } from "../../../core/services/api/set-hashtags";

const PeoplesVoiceFinalRegistration = () => {
  const { id } = useParams();

  const {
    data: detailsData,
    isError: detailsIsError,
    isLoading: detailsIsLoading,
    isSuccess: detailsIsSuccess,
    mutate: detailsMutate,
  } = UseGetChallengeDetails();
  useEffect(() => {
    detailsMutate({ Id: id });
  }, []);

  const {
    data: addAttachmentData,
    isError: addAttachmentIsError,
    isLoading: addAttachmentIsLoading,
    isSuccess: addAttachmentIsSuccess,
    mutate: addAttachmentMutate,
  } = UseAddChallengeAttachment();
  const [addIsOpen, setAddIsOpen] = useState(false);

  const {
    data: getAttachmentData,
    isError: getAttachmentIsError,
    isLoading: getAttachmentIsLoading,
    isSuccess: getAttachmentIsSuccess,
    mutate: getAttachmentMutate,
  } = UseGetChallengeAttachments();

  const {
    data: deleteAttachmentData,
    isError: deleteAttachmentIsError,
    isLoading: deleteAttachmentIsLoading,
    isSuccess: deleteAttachmentIsSuccess,
    mutate: deleteAttachmentMutate,
  } = UseDeleteChallengeAttachment();
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);

  const {
    data: editAttachmentData,
    isError: editAttachmentIsError,
    isLoading: editAttachmentIsLoading,
    isSuccess: editAttachmentIsSuccess,
    mutate: editAttachmentMutate,
  } = UseEditChallengeAttachment();

  const {
    data: getHashtagsData,
    isError: getHashtagsIsError,
    isLoading: getHashtagsIsLoading,
    isSuccess: getHashtagsIsSuccess,
    refetch: hashtagRefetch,
  } = UseGetHashtags();

  const {
    data: setHashtagsData,
    isError: setHashtagsIsError,
    isLoading: setHashtagsIsLoading,
    isSuccess: setHashtagsIsSuccess,
    mutate: setHashtagsMutate,
  } = UseSetHashtags();

  const [editIsOpen, setEditIsOpen] = useState(false);

  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    setHashtagsIsSuccess && hashtagRefetch();
    setHashtagsIsSuccess && detailsMutate({ Id: id });
  }, [setHashtagsData]);

  useEffect(() => {
    getAttachmentMutate({
      farmerVoiceId: id,
      page: 1,
      pageSize: 1,
    });
    getAttachmentMutate({ Id: id, Title: "" });
  }, []);

  useEffect(() => {
    getAttachmentMutate({ Id: id, Title: "" });
    setAddIsOpen(false);
    setEditIsOpen(false);
    setDeleteIsOpen(false);
  }, [addAttachmentData, editAttachmentData, deleteAttachmentData]);

  const [hashtagsInitialValues, setHashtagsInitialValues] = useState({
    Hashtags: [],
    newHashtags: [],
  });

  useEffect(() => {
    detailsIsSuccess &&
      setHashtagsInitialValues({
        ...hashtagsInitialValues,
        Hashtags: detailsData?.data.result.hashtags[0]
          ? detailsData?.data.result.hashtags.map((hashtag) => {
              return hashtag.id;
            })
          : [],
      });
  }, [detailsData]);

  return detailsIsLoading ||
    !detailsIsSuccess ||
    detailsIsLoading ||
    getHashtagsIsLoading ||
    setHashtagsIsLoading ||
    !detailsIsSuccess ? (
    <FallBackSpinner />
  ) : !detailsData?.data.result.id && (detailsIsSuccess || detailsIsError) ? (
    <div style={{ textAlign: "center" }}>
      <p>اطلاعات مورد نظر شما یافت نشد</p>
      <Redirect to="/" />
    </div>
  ) : (
    <>
      <AddChallengeAttachmentsModal
        id={id}
        isOpen={addIsOpen}
        modalToggled={() => {
          setAddIsOpen(!addIsOpen);
        }}
        mutate={addAttachmentMutate}
        loading={addAttachmentIsLoading}
      />
      <DeleteChallengeAttachmentsModal
        id={selectedId}
        isOpen={deleteIsOpen}
        modalToggled={() => {
          setDeleteIsOpen(!deleteIsOpen);
        }}
        mutate={deleteAttachmentMutate}
        loading={deleteAttachmentIsLoading}
      />
      <EditChallengeAttachmentsModal
        id={selectedId}
        isOpen={editIsOpen}
        modalToggled={() => {
          setEditIsOpen(!editIsOpen);
        }}
        mutate={editAttachmentMutate}
        loading={editAttachmentIsLoading}
      />
      <section className="peoples-voice-page">
        <div style={{ textAlign: "center" }}>
          <SectionTitle TitleText="تایید نهایی" />
        </div>
        <Container fluid>
          <hr />
        </Container>
        <h5 className="peoples-voice-head-title">
          :از طرف
          <br />
          <br />
          {detailsData?.data.result.authorFirstName +
            " " +
            detailsData?.data.result.authorLastName}
        </h5>
        <div style={{ margin: "0 auto" }}>
          <SectionTitle TitleText={detailsData?.data.result.title} />
        </div>
        <img
          src={`https://api.farmervoice.agroom.org/${detailsData?.data.result.imagePath}`}
          alt="news"
        />
        <p
          className="peoples-voice-content"
          dangerouslySetInnerHTML={{
            __html: detailsData?.data.result.draftDescription,
          }}
        />

        <Formik
          initialValues={hashtagsInitialValues}
          enableReinitialize={true}
          onSubmit={(values) => {
            setHashtagsMutate({
              farmerVoiceId: id,
              hashtags: [
                ...getHashtagsData.data.result.filter((hashtag) => {
                  return values.Hashtags.includes(hashtag.id);
                  // &&
                  // !detailsData?.data.result.hashtags
                  //   .map((hashtag) => hashtag.id)
                  //   .includes(hashtag.id)
                }),
                ...values.newHashtags.map((hashtag) => {
                  return { id: 0, title: hashtag };
                }),
              ],
            });
          }}
        >
          {({
            values,
            setFieldValue,
            setFieldError,
            setErrors,
            errors,
            touched,
          }) => {
            return (
              <>
                <Form noValidate>
                  <div style={{ textAlign: "center" }}>
                    <SectionTitle TitleText="افزودن هشتگ" />
                  </div>

                  <div role="group" aria-labelledby="checkbox-group">
                    <FieldArray
                      name="Hashtags"
                      render={(arrayHelpers) => (
                        <Container fluid>
                          <Row
                            style={{
                              border:
                                errors.Hashtags && touched.Hashtags
                                  ? "1px solid #ff2222"
                                  : "none",
                              borderRadius: "7px",
                              overflow: "hidden",
                              padding: "5px",
                            }}
                          >
                            {getHashtagsData?.data.result.map(
                              (hashtag, index) => (
                                <Col
                                  style={{
                                    padding: "5px",
                                    textAlign: "center",
                                  }}
                                  xs={1}
                                >
                                  <label key={index}>
                                    <input
                                      name="Hashtags"
                                      type="checkbox"
                                      style={{
                                        marginRight: "5px",
                                        fontSize: "20px",
                                      }}
                                      value={hashtag.id}
                                      checked={values.Hashtags.includes(
                                        hashtag.id
                                      )}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          arrayHelpers.push(hashtag.id);
                                        } else {
                                          const idx = values.Hashtags.indexOf(
                                            hashtag.id
                                          );
                                          arrayHelpers.remove(idx);
                                        }
                                      }}
                                    />
                                    <span>{hashtag.title}</span>
                                  </label>
                                </Col>
                              )
                            )}
                          </Row>
                        </Container>
                      )}
                    />
                    <ErrorMessage name="Hashtags" />

                    <FieldArray
                      name="newHashtags"
                      render={(arrayHelpers) => (
                        <div>
                          {values.newHashtags &&
                          values.newHashtags.length > 0 ? (
                            values.newHashtags.map((friend, index) => (
                              <div key={index}>
                                <Field name={`newHashtags.${index}`} />

                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                >
                                  -
                                </button>

                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                                >
                                  +
                                </button>
                              </div>
                            ))
                          ) : (
                            <SimpleSubmitButton
                              style={{
                                margin: "0 auto",
                              }}
                              onCLick={() => arrayHelpers.push("")}
                              isLoading={false}
                              type="button"
                              className="mb-1"
                              outLine
                              btnText="افزودن هشتگ"
                            />
                          )}
                          <SimpleSubmitButton
                            style={{ margin: "0 auto" }}
                            isLoading={false}
                            type="submit"
                            className="mb-1"
                            outLine
                            btnText="ثبت هشتگ ها"
                          />
                        </div>
                      )}
                    />
                  </div>
                </Form>
              </>
            );
          }}
        </Formik>

        <div style={{ textAlign: "center" }}>
          <SectionTitle TitleText="پیوست ها" />
        </div>

        <Container className={Styles.container} fluid>
          <Row style={{ direction: "rtl", marginBottom: "20px" }}>
            <Col xs={2}>ردیف</Col>
            <Col xs={4}>عنوان</Col>
            <Col xs={2}>مشاهده</Col>
            <Col xs={2}>ویرایش</Col>
            <Col xs={2}>حذف</Col>
          </Row>
          {!getAttachmentData?.data.result.attachments[0] ? (
            <h1 style={{ textAlign: "center" }} className={Styles.noneFound}>
              موردی یافت نشد
            </h1>
          ) : (
            getAttachmentData?.data.result.attachments.map((item, index) => {
              return (
                <Row
                  key={index}
                  style={{ direction: "rtl", marginTop: "10px" }}
                >
                  <Col xs={2}>{index + 1}</Col>
                  <Col xs={4}>{item.title}</Col>
                  <Col xs={2}>
                    <div className={Styles.buttonDiv}>
                      <a
                        href={`${
                          process.env.REACT_APP_UPLOAD_SERVER_PATH
                        }/${correctUploadPath(item.filePath)}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <SimpleSubmitButton
                          isLoading={false}
                          type="button"
                          className="mb-1"
                          outLine
                          btnText="مشاهده پیوست"
                        />
                      </a>
                    </div>
                  </Col>
                  <Col xs={2}>
                    <div className={Styles.buttonDiv}>
                      <SimpleSubmitButton
                        isLoading={false}
                        onCLick={() => {
                          setEditIsOpen(true);
                          setSelectedId(item.id);
                        }}
                        type="button"
                        className="mb-1"
                        outLine
                        btnText="ویرایش پیوست"
                      />
                    </div>
                  </Col>
                  <Col xs={2}>
                    <div className={Styles.buttonDiv}>
                      <SimpleSubmitButton
                        isLoading={false}
                        onCLick={() => {
                          setDeleteIsOpen(true);
                          setSelectedId(item.id);
                        }}
                        type="button"
                        className="mb-1"
                        outLine
                        btnText="حذف پیوست"
                      />
                    </div>
                  </Col>
                </Row>
              );
            })
          )}
        </Container>
        <div style={{ margin: "30px 0" }}>
          <SimpleSubmitButton
            style={{ margin: "30px auto" }}
            isLoading={false}
            onCLick={() => {
              setAddIsOpen(!addIsOpen);
            }}
            type="button"
            className="mb-1"
            outLine
            btnText="افزودن پیوست جدید"
          />
        </div>
        <div className="sign-area">
          <p className="signParagraph">
            <p>من این چالش را تایید میکنم :</p>
            <PeoplesVoiceConfirmButton challengeId={id} ButtonText="تایید" />
          </p>
        </div>
      </section>
    </>
  );
};
export default PeoplesVoiceFinalRegistration;
