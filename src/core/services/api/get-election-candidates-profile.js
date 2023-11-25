import axios from 'axios';
import { useMutation } from 'react-query';

const ProfileUrl = process.env.REACT_APP_Profile_Path;

const url = ProfileUrl + '/api/UnionCandidate/ServeUnionCandidateProfilePicture';

const GetElectionCandidatesProfileApi = async (candidateNationalCode) => {
  return await axios.get(url);
};

export const UseGetElectionCandidatesProfile = () => {
  return useMutation(GetElectionCandidatesProfileApi);
};

