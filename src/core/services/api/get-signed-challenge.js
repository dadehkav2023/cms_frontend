import axios from "axios";
import { useQuery } from "react-query";

const MainUrl = "https://api.farmervoice.agroom.org";

const url = MainUrl + "/api/Cms/Signature/GetMySignature";

const GetSignedChallenge = async () => {
  return await axios.get(url);
};

export const UseGetSignedChallenge = () => {
  return useQuery("GetSignedChallenge", GetSignedChallenge);
};
