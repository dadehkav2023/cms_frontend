import { useQuery } from "react-query";
import axios from "axios";
const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/admin/Setting/GetSetting";

const GetSettingApi = async () => {
  return await axios.get(url);
};

export const UseGetSetting = () => {
  return useQuery("GetSettingApi", GetSettingApi);
};
