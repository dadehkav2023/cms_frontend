import React, { useEffect, useState } from "react";
import "./NewPeoplesVoicePage.scss";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router-dom";
import { FallBackSpinner } from "../../common/Spinner/FallBackSpinner/FallbackSpinner";
import SectionTitle from "../../common/SectionTitle/SectionTitle";
import { Card as RsCard, CardBody, ModalBody, ModalFooter } from "reactstrap";
import { TextInput } from "../../common/TextInput/TextInput";
import { Form, Formik } from "formik";
import { useUserAuth } from "../../../core/utils/context/AuthenticationContext";
import { DropZone } from "../../common/DropZone/DropZone";
import { UseAddChallenge } from "../../../core/services/api/add-challenge";
import { TextArea } from "../../common/TextArea/TextArea";
import { showToast } from "../../../core/utils/show-toast";
import { SimpleSubmitButton } from "../../common/SimpleSubmitBtn/SimpleSubmitButton";
import { NewChallengeValidation } from "../../../core/validations/new-challenge.validation";

const NewPeoplesVoicePage = () => {
  const {
    data: challengeData,
    isError: challengeIsError,
    isLoading: challengeIsLoading,
    isSuccess: challengeIsSuccess,
    mutate: challengeMutate,
  } = UseAddChallenge();

  const { userInfo } = useUserAuth();

  const history = useHistory();

  const handleSubmit = (values) => {
    challengeMutate({
      Title: values.Title,
      ImageFile: values.ImageFile ? values.ImageFile[0] : null,
      DraftDescription: values.DraftDescription,
      AuthorFirstName: userInfo.name,
      AuthorLastName: userInfo.family,
      AuthorUserId: userInfo.userInfoId,
      AuthorNationalCode: userInfo.userName,
    });
  };

  useEffect(() => {
    !userInfo.userName &&
      showToast(["!لطفا ابتدا وارد حساب خود شوید"], "error");
    !userInfo.userName && history.push("/");
  }, []);

  useEffect(() => {
    challengeIsSuccess &&
      history.push("/Challenges/new/" + challengeData.data.result.id);
  }, [challengeData]);

  return challengeIsLoading ? (
    <FallBackSpinner />
  ) : (
    <>
      <section className="peoples-voice-page">
        <div style={{ textAlign: "center" }}>
          <SectionTitle TitleText={"ثبت چالش جدید"} />
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            Title: "",
            DraftDescription: "",
            ImageFile: null,
          }}
          onSubmit={handleSubmit}
          validationSchema={NewChallengeValidation}
        >
          {({ params, values }) => {
            return (
              <Form>
                <ModalBody className="modal-dialog-centered">
                  <RsCard className="w-100 shadow-none m-0">
                    <CardBody className="text-center mb-0 pb-0">
                      <TextInput
                        lableText="تیتر چالش"
                        name="Title"
                        placeholder="تیتر چالش"
                        significant
                      />
                      <DropZone
                        name="ImageFile"
                        lableText="عکس چالش"
                        significant
                        placeholder="فقط فایل های عکس"
                        accept="image/jpeg, image/png, image/jpg"
                        isSingle={true}
                      />
                      <TextArea
                        lableText="توضیحات چالش"
                        name="DraftDescription"
                        placeholder="توضیحات چالش"
                        significant
                      />
                    </CardBody>
                  </RsCard>
                </ModalBody>
                <ModalFooter className="justify-content-start">
                  <SimpleSubmitButton
                    isLoading={false}
                    style={{ margin: "0 auto" }}
                    type="submit"
                    className="mb-1"
                    outLine
                    btnText="افزودن"
                  />
                </ModalFooter>
              </Form>
            );
          }}
        </Formik>
      </section>
    </>
  );
};
export default NewPeoplesVoicePage;
