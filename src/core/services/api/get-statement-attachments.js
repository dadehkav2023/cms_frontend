import axios from "axios";
import { useMutation } from "react-query";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/Statement/Attachment/GetAttachment";

const GetStatementAttachmentsApi = async (value) => {
  const formOfValues = new FormData();
  formOfValues.set("StatementId", value.Id);
  formOfValues.set("Title", value.Title);
  return await axios.post(url, formOfValues, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const UseGetStatementAttachments = () => {
  // const history = useHistory();
  return useMutation((obj) => GetStatementAttachmentsApi(obj), {});
};
