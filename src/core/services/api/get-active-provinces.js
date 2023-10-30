import axios from "axios";
import { useQuery } from "react-query";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/Map/GetProvince";

const GetActiveProvincesApi = async () => {
  return await axios.get(url);
};

export const UseGetActiveProvinces = () => {
  return useQuery("GetActiveProvincesApi", GetActiveProvincesApi);
};
