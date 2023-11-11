import axios from "axios";
import { useQuery } from "react-query";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/admin/Menu/GetMenu";

const GetMenuApi = async () => {
  return await axios.get(url);
};

export const UseGetMenu = () => {
  return useQuery("GetMenuApi", GetMenuApi);
};
