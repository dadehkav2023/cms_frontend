import axios from "axios";
import { useMutation } from "react-query";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/GetSocialMedia";

const GetSocialMediaApi = async (value) => {
  return await axios.post(url, value);
};

export const UseGetSocialMedia = () => {
  // const history = useHistory();
  return useMutation((obj) => GetSocialMediaApi(obj), {});
};
