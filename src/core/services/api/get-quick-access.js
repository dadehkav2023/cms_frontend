import axios from "axios";
import { useMutation } from "react-query";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/GetQuickAccess";

const GetQuickAccessApi = async (value) => {
  return await axios.post(url, value);
};

export const UseGetQuickAccess = () => {
  // const history = useHistory();
  return useMutation((obj) => GetQuickAccessApi(obj), {});
};
