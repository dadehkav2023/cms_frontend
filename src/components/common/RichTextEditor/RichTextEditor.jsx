import React from "react";
import { ErrorMessage, Field } from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { InpuLable } from "../InputLable/InputLable";
// import "RichTextEditor.css";

const RichTextEditor = ({ name, title, significant = true, data }) => {
  return (
    <>
      <InpuLable lableText={title} significant={significant} />
      <Field
        name={name}
        value={data}
        render={({ field, form }) => {
          return (
            <>
              <div
                style={
                  form.touched[name] && form.errors.name
                    ? {
                        border: "1px solid #ff2222",
                        borderRadius: "7px",
                        overflow: "hidden",
                      }
                    : {}
                }
              >
                <ReactQuill
                  theme="snow"
                  value={field.value}
                  onChange={(e) => {
                    form.setFieldValue(field.name, e);
                  }}
                  style={{ minHeight: "250px" }}
                  onBlur={(e) => {
                    form.setFieldTouched(field.name, true);
                  }}
                />
              </div>
            </>
          );
        }}
      />
      <span style={{ color: "#ff2222", fontSize: "11px" }}>
        <ErrorMessage name={name} />
      </span>
    </>
  );
};

export default RichTextEditor;
