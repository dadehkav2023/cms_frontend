import axios from "axios";
import { useQuery } from "react-query";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/admin/Map/GetProvince";

const GetMapApi = async () => {
  return await axios.get(url);
};

export const UseGetMap = () => {
  return useQuery("GetMapApi", GetMapApi);
};
