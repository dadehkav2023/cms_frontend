import axios from 'axios';
import { useMutation } from 'react-query';

const electionUrl = process.env.REACT_APP_Election_Path;

const url = electionUrl+'/Election/GetCandidatesOfUnionElection';

const GetElectionCandidatesApi = async (unionElectionId) => {
  return await axios.post(`${url}/?unionElectionId=${unionElectionId}`);
};

export const UseGetElectionCandidates = () => {
  return useMutation((obj) => GetElectionCandidatesApi(obj), {});
};
