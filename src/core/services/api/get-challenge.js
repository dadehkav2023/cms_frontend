import axios from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";

const url = "https://api.farmervoice.agroom.org/api/Challenge/GetChallenge";

const GetChallengeApi = async (value) => {
  return await axios.post(url, value);
};

export const UseGetChallenge = () => {
  // const history = useHistory();
  return useMutation((obj) => GetChallengeApi(obj), {});
};
