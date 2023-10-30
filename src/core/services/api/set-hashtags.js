import axios from "axios";
import { useMutation } from "react-query";

const MainUrl = "https://api.farmervoice.agroom.org";

const url = MainUrl + "/api/Challenge/SetHashtags";

const SetHashtagsApi = async (value) => {
  return await axios.post(url, value);
};

export const UseSetHashtags = () => {
  return useMutation((obj) => SetHashtagsApi(obj), {});
};
