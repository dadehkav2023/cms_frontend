import axios from "axios";
import { useMutation } from "react-query";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/admin/Slider/GetSlider";

const GetSlidesApi = async (value) => {
  return await axios.post(url, value);
};

export const UseGetSlides = () => {
  return useMutation((obj: any) => GetSlidesApi(obj), {
    onSuccess: (value) => {},
  });
};
