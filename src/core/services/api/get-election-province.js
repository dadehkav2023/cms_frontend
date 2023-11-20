import axios from 'axios';
import { useMutation } from 'react-query';

const electionUrl = process.env.REACT_APP_Election_Path;

const url =
  'https://api.election.dadehkavdehghan.ir/api/Election/GetAllProvincesWithElection';

console.log('url: ', url);

const GetElectionProvinceApi = async (value) => {
  return await axios.get(url, value);
};

export const UseGetElectionProvince = () => {
  return useMutation((obj) => GetElectionProvinceApi(obj), {});
};
