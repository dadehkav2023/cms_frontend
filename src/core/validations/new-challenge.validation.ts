import * as Yup from "yup";

export const NewChallengeValidation = Yup.object({
  Title: Yup.string()
    .required("خالی نگذارید")
    .typeError("مقادیر را بررسی کنید"),
  DraftDescription: Yup.string()
    .required("خالی نگذارید")
    .typeError("مقادیر را بررسی کنید"),
  ImageFile: Yup.array()
    .required("خالی نگذارید")
    .test("ImageFile", "حجم فایل باید کمتر از ۳ مگابایت باشد", (value: any) => {
      return value ? value[0].size <= 3 * 1000 * 1000 : true; //bytes
    })
    .typeError("ورودی را کنترل کنید"),
});
