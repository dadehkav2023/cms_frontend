import axios from "axios";
import { useMutation } from "react-query";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/News/TextNews/GetNews";

const GetTextNewsApi = async (value) => {
  return await axios.post(url, value);
};

export const UseGetTextNews = () => {
  return useMutation((obj) => GetTextNewsApi(obj), {});
};
