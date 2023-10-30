import axios from "axios";
import { useMutation } from "react-query";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/ServiceDesk/GetServiceDesk";

const GetServicesApi = async (value) => {
  return await axios.post(url, value);
};

export const UseGetServices = () => {
  return useMutation((obj) => GetServicesApi(obj), {});
};
