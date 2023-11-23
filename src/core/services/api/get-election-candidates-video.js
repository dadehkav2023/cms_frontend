import axios from 'axios';
import { useMutation } from 'react-query';

const electionUrl = process.env.REACT_APP_Election_Path;

const url =
  'https://dev.api.sabakorg.ir/api/UnionCandidate/GetUnionCandidateVideoFiles';

const GetElectionCandidatesVideoApi = async (value) => {
  return await axios.post(url, value);
};

export const UseGetElectionCandidatesVideo = () => {
  return useMutation( GetElectionCandidatesVideoApi);
};
