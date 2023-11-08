import axios from "axios";
import { useMutation } from "react-query";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/admin/Statement/GetStatement";

const GetStatementApi = async (value) => {
  return await axios.post(url, value);
};

export const UseGetStatement = () => {
  // const history = useHistory();
  return useMutation((obj) => GetStatementApi(obj), {});
};










