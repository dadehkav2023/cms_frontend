import axios from 'axios';
import { useMutation } from 'react-query';

const electionUrl = process.env.REACT_APP_Election_Path;

const url = electionUrl+'/Election/GetUnionsOfCountyWithElection';

const GetElectionUnionsApi = async (countyId) => {
  return await axios.get(`${url}/?countyId=${countyId}`);
};

export const UseGetElectionUnions = () => {
  return useMutation((obj) => GetElectionUnionsApi(obj), {});
};
