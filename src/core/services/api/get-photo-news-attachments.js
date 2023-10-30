import axios from "axios";
import { useMutation } from "react-query";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/News/PhotoNews/Attachment/GetAttachment";

const GetPhotoNewsAttachmentsApi = async (value) => {
  const formOfValues = new FormData();
  value.Id && formOfValues.set("PhotoNewsId", value.Id);
  value.Title && formOfValues.set("Title", value.Title);
  return await axios.post(url, formOfValues, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const UseGetPhotoNewsAttachments = () => {
  return useMutation((obj) => GetPhotoNewsAttachmentsApi(obj), {});
};
