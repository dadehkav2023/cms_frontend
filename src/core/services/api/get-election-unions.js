import axios from 'axios';
import { useMutation } from 'react-query';

const electionUrl = process.env.REACT_APP_Election_Path;

const url = electionUrl+'/Election/GetUnionsOfCountyWithElection?countyId=18';

const GetElectionUnionsApi = async (value) => {
  return await axios.get(url, value);
};

export const UseGetElectionUnions = () => {
  return useMutation((obj) => GetElectionUnionsApi(obj), {});
};
