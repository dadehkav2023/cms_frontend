import axios from 'axios';
import { useMutation } from 'react-query';

const electionUrl = process.env.REACT_APP_Election_Path;

const url =
  'https://dev.api.sabakorg.ir/api/UnionCandidate/ServeUnionCandidateProfilePicture';

const GetElectionCandidatesProfileApi = async (candidateNationalCode) => {
  return await axios.get(
    `https://dev.api.sabakorg.ir/api/UnionCandidate/ServeUnionCandidateProfilePicture/?candidateNationalCode=${candidateNationalCode}`
  );
};

export const UseGetElectionCandidatesProfile = () => {
  return useMutation(GetElectionCandidatesProfileApi);
};
