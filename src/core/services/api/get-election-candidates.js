import axios from 'axios';
import { useMutation } from 'react-query';

const electionUrl = process.env.REACT_APP_Election_Path;

const url =
  'https://api.election.dadehkavdehghan.ir/api/Election/GetCandidatesOfUnionElection';

const GetElectionCandidatesApi = async (value) => {
  return await axios.post(url, value);
};

export const UseGetElectionCandidates = () => {
  return useMutation((obj) => GetElectionCandidatesApi(obj), {});
};
