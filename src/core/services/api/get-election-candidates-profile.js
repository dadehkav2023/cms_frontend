import axios from 'axios';
import { useMutation } from 'react-query';

const sabakUrl = process.env.REACT_APP_Sabak_Path;

const url = sabakUrl + '/UnionCandidate/ServeUnionCandidateProfilePicture';

const GetElectionCandidatesProfileApi = async (candidateNationalCode) => {
  return await axios.get(url);
};

export const UseGetElectionCandidatesProfile = () => {
  return useMutation(GetElectionCandidatesProfileApi);
};

