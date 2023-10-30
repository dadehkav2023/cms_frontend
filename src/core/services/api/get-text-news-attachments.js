import axios from "axios";
import { useMutation } from "react-query";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/News/TextNews/Attachment/GetAttachment";

const GetTextNewsAttachmentsApi = async (value) => {
  const formOfValues = new FormData();
  value.Id && formOfValues.set("NewsId", value.Id);
  value.Title && formOfValues.set("Title", value.Title);
  return await axios.post(url, formOfValues, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const UseGetTextNewsAttachments = () => {
  return useMutation((obj) => GetTextNewsAttachmentsApi(obj), {});
};
