import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import { showToast } from "../../utils/show-toast";
import methods from "../interceptors/http.interceptor";

const MainUrl = "https://api.farmervoice.agroom.org";

const url = MainUrl + "/api/Challenge/Attachment/New";

const AddChallengeAttachmentApi = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const formOfValues = new FormData();
  formOfValues.set("Title", value.Title);
  formOfValues.set("FarmerVoiceId", value.Id);
  formOfValues.set("File", value.File);
  return await methods.post(url, formOfValues, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const UseAddChallengeAttachment = () => {
  // const history = useHistory();
  return useMutation((obj: any) => AddChallengeAttachmentApi(obj), {
    onSuccess: (value) => {
      value.data
        ? showToast([" پیوست با موفقیت اضافه شد"], "success")
        : showToast(["مشکلی رخ داده است"], "error");
      // l      history.push("/ServiceDeskManagement/ServicesList");
    },
  });
};
