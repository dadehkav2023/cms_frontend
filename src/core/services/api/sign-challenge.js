import axios from "axios";
import { useMutation } from "react-query";
import { showToast } from "../../utils/show-toast";

const MainUrl = "https://api.farmervoice.agroom.org";

const url = MainUrl + "/api/Cms/Signature/New";

const SignChallenge = async (value) => {
  return await axios.post(url, value);
};

export const UseSignChallenge = () => {
  return useMutation((obj) => SignChallenge(obj), {
    onSuccess: (value) => {
      value.data
        ? showToast([" چالش با موفقیت امضا شد"], "success")
        : showToast(["امضا چالش ممکن نیست"], "error");
    },
  });
};
