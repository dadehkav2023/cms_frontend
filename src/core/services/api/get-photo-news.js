import axios from "axios";
import { useMutation } from "react-query";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/News/PhotoNews/GetNews";

const GetPhotoNewsApi = async (value) => {
  return await axios.post(url, value);
};

export const UseGetPhotoNews = () => {
  return useMutation((obj) => GetPhotoNewsApi(obj), {});
};
