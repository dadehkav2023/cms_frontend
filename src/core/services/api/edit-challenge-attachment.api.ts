import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import { showToast } from "../../utils/show-toast";
import methods from "../interceptors/http.interceptor";

const MainUrl = "https://api.farmervoice.agroom.org";

const url = MainUrl + "/api/Challenge/Attachment/Edit";

const EditChallengeAttachmentApi = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const formOfValues = new FormData();
  formOfValues.set("Title", value.Title);
  formOfValues.set("File", value.File ? value.File[0] : null);
  formOfValues.set("AttachmentId", value.Id);
  return await methods.put(url, formOfValues, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const UseEditChallengeAttachment = () => {
  const history = useHistory();
  return useMutation((obj: any) => EditChallengeAttachmentApi(obj), {
    onSuccess: (value) => {
      value.data
        ? showToast([" پیوست با موفقیت ویرایش شد"], "success")
        : showToast(["مشکلی رخ داده است"], "error");
      // history.push("/NewsManagement/NewsList/Challenge");
    },
  });
};
