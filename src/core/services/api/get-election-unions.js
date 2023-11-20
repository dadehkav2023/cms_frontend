import axios from 'axios';
import { useMutation } from 'react-query';

const electionUrl = process.env.REACT_APP_Election_Path;

const url =
  'https://api.election.dadehkavdehghan.ir/api/Election/GetUnionsOfCountyWithElection?countyId=18';

const GetElectionUnionsApi = async (value) => {
  return await axios.get(url, value);
};

export const UseGetElectionUnions = () => {
  return useMutation((obj) => GetElectionUnionsApi(obj), {});
};
