import axios from 'axios';
import { useMutation, useQuery } from 'react-query';

const electionUrl = process.env.REACT_APP_Election_Path;

const url = electionUrl +'/Election/GetAllProvincesWithElection';

const GetElectionProvinceApi = async () => {
  return await axios.get(url);
};

export const UseGetElectionProvince = () => {
  return useQuery(  "GetElectionProvinceApi" , GetElectionProvinceApi, {});
};
