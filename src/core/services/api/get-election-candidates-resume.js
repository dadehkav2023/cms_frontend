import axios from 'axios';
import { useMutation } from 'react-query';

const electionUrl = process.env.REACT_APP_Election_Path;

const url =
  'https://dev.api.sabakorg.ir/api/UnionCandidate/GetUnionCandidateResumeFiles';

const GetElectionCandidatesResumeApi = async (value) => {
  return await axios.post(url, value);
};

export const UseGetElectionCandidatesResume = () => {
  return useMutation( GetElectionCandidatesResumeApi);
};
