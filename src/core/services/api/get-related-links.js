import axios from "axios";
import { useMutation } from "react-query";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/GetRelatedLink";

const GetRelatedLinksApi = async (value: any) => {
  return await axios.post(url, value);
};

export const UseGetRelatedLinks = () => {
  // const history = useHistory();
  return useMutation((obj: any) => GetRelatedLinksApi(obj), {});
};
