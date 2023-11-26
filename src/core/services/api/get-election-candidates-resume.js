import axios from 'axios';
import { useMutation } from 'react-query';

const sabakUrl = process.env.REACT_APP_Sabak_Path;

const url = sabakUrl + '/UnionCandidate/GetUnionCandidateResumeFiles';

const GetElectionCandidatesResumeApi = async (value) => {
  return await axios.post(url, value);
};

export const UseGetElectionCandidatesResume = () => {
  return useMutation( GetElectionCandidatesResumeApi);
};
