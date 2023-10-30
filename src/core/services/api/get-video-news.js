import axios from "axios";
import { useMutation } from "react-query";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/News/VideoNews/GetNews";

const GetVideoNewsApi = async (value) => {
  return await axios.post(url, value);
};

export const UseGetVideoNews = () => {
  return useMutation((obj) => GetVideoNewsApi(obj), {});
};
