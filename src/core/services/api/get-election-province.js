import axios from 'axios';
import { useMutation } from 'react-query';

const electionUrl = process.env.REACT_APP_Election_Path;

const url = electionUrl +'/Election/GetAllProvincesWithElection';

const GetElectionProvinceApi = async (value) => {
  return await axios.get(url, value);
};

export const UseGetElectionProvince = () => {
  return useMutation((obj) => GetElectionProvinceApi(obj), {});
};
