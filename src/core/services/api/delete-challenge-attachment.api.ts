import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import { showToast } from "../../utils/show-toast";
import methods from "../interceptors/http.interceptor";

const MainUrl = "https://api.farmervoice.agroom.org";

const url = MainUrl + "/api/Challenge/Attachment/Delete";

const DeleteChallengeAttachmentApi = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const formOfValues = new FormData();
  formOfValues.set("attachmentId", value.Id);
  return await methods.delete(url, {
    data: formOfValues,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const UseDeleteChallengeAttachment = () => {
  const history = useHistory();
  return useMutation((obj: any) => DeleteChallengeAttachmentApi(obj), {
    onSuccess: (value) => {
      value.data
        ? showToast([" پیوست با موفقیت حذف شد"], "success")
        : showToast(["مشکلی رخ داده است"], "error");
      // history.push("/NewsManagement/NewsList/Challenge");
    },
  });
};
