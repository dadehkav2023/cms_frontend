import axios from "axios";
import { useQuery } from "react-query";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/admin/News/Category/GetCategory";

const GetCategoriesApi = async () => {
  return await axios.get(url);
};

export const UseGetCategories = () => {
  return useQuery("GetCategoriesApi", GetCategoriesApi);
};
