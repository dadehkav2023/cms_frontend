import axios from 'axios';
import { useMutation } from 'react-query';

const electionUrl = process.env.REACT_APP_Election_Path;

const url =
  'https://api.election.dadehkavdehghan.ir/api/Election/GetCountiesOfProvinceWithElection?provinceId=14';

const GetElectionCountiesApi = async (value) => {
  return await axios.get(url, value);
};

export const UseGetElectionCounties = () => {
  return useMutation((obj) => GetElectionCountiesApi(obj), {});
};
