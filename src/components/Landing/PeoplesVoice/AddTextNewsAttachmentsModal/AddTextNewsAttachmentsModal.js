import { FieldArray, Form, Formik } from "formik";
import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { useUserAuth } from "../../../../core/utils/context/AuthenticationContext";
import { DropZone } from "../../../common/DropZone/DropZone";
import RichTextEditor from "../../../common/RichTextEditor/RichTextEditor";
import { SimpleSubmitButton } from "../../../common/SimpleSubmitBtn/SimpleSubmitButton";
import { FallBackSpinner } from "../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { TextInput } from "../../../common/TextInput/TextInput";
// import {
//   DropZone,
//   InpuLable,
//   SimpleSubmitButton,
//   TextInput,
// } from "../../../../../common/Form";
import Styles from "./AddTextNewsAttachmentsModal.module.scss";
// import { FallBackSpinner } from "../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
const AddTextNewsAttachmentsModal = ({
  isOpen,
  modalToggled,
  loading,
  mutate,
}) => {
  const handleSubmit = (values) => {
    mutate({
      Title: values.Title,
      ImageFile: values.ImageFile ? values.ImageFile[0] : null,
      DraftDescription: values.DraftDescription,
      AuthorFirstName: userInfo.name,
      AuthorLastName: userInfo.family,
      AuthorUserId: userInfo.userInfoId,
      AuthorNationalCode: userInfo.userName,
    });
  };
  const { userInfo } = useUserAuth();

  return loading ? (
    <Modal
      isOpen={isOpen}
      toggle={modalToggled}
      className="modal-dialog-centered"
    >
      <Formik
        enableReinitialize
        initialValues={{ Title: "", DraftDescription: "" }}
        onSubmit={handleSubmit}
        // validationSchema={EditCategoryValidation}
      >
        {({ params, values }) => {
          return (
            <Form>
              <ModalHeader toggle={modalToggled} className="bg-info">
                افزودن چالش
              </ModalHeader>
              <ModalBody className="modal-dialog-centered">
                <FallBackSpinner />
              </ModalBody>
              <ModalFooter className="justify-content-start"></ModalFooter>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  ) : (
    <Modal
      isOpen={isOpen}
      toggle={modalToggled}
      className="modal-dialog-centered"
    >
      <Formik
        enableReinitialize
        initialValues={{
          Title: "",
          DraftDescription: "",
        }}
        onSubmit={handleSubmit}
        // validationSchema={EditCategoryValidation}
      >
        {({ params, values }) => {
          return (
            <Form>
              <ModalHeader toggle={modalToggled} className="bg-info">
                افزودن چالش
              </ModalHeader>
              <ModalBody className="modal-dialog-centered">
                <Card className="w-100 shadow-none m-0">
                  <CardBody className="text-center mb-0 pb-0">
                    <TextInput
                      lableText="تیتر چالش"
                      name="Title"
                      placeholder="تیتر چالش"
                      significant
                    />
                    <DropZone
                      name="ImageFile"
                      placeholder="فقط فایل های عکس"
                      accept="image/jpeg, image/png, image/jpg"
                      isSingle={true}
                    />
                    <RichTextEditor
                      name="DraftDescription"
                      title="توضیحات چالش"
                      significant={true}
                      data={""}
                    />
                  </CardBody>
                </Card>
              </ModalBody>
              <ModalFooter className="justify-content-start">
                <SimpleSubmitButton
                  isLoading={false}
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
    </Modal>
  );
};
export { AddTextNewsAttachmentsModal };
