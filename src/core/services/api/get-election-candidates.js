import axios from 'axios';
import { useMutation } from 'react-query';

const electionUrl = process.env.REACT_APP_Election_Path;

const url = electionUrl+'/Election/GetCandidatesOfUnionElection';

const GetElectionCandidatesApi = async (value) => {
  return await axios.post(url, value);
};

export const UseGetElectionCandidates = () => {
  return useMutation((obj) => GetElectionCandidatesApi(obj), {});
};
