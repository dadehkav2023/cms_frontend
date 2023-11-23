// import axios from 'axios';
// import { useMutation } from 'react-query';
// const url =
//   'https://dev.api.sabakorg.ir/api/UnionCandidate/ServeFileForUnionCandidate';
// const GetElectionDownloadApi = async (value) => {
//   return await axios.get(
//     `https://dev.api.sabakorg.ir/api/UnionCandidate/ServeFileForUnionCandidate/?fileName=${value}`
//   );
// };
// export const UseGetElectionDownload = () => {
//   return useMutation(GetElectionDownloadApi);
// };

import axios from 'axios';
import { useMutation } from 'react-query';

// Function to serve a file
export const useServeFile = () => {
  return useMutation(
    async (fileName) => {
      const response = await axios.get(
        `https://dev.api.sabakorg.ir/api/UnionCandidate/ServeFileForUnionCandidate/?fileName=${fileName}`,
        {
          responseType: 'blob',
        }
      );
      return response.data;
    },
    {
      onSettled: async (value, variables, context) => {
        let data;
        let fileType;

        console.log('context: ', context);
        console.log('value: ', value);
        console.log(' value with data: ', value.data);

        const fileExtension = context.split('.').pop();
        const result = value.data;
        // Determine the file type based on the context or result
        if (fileExtension === 'audio') {
          data = new Blob([result], { type: 'audio/*' });
          fileType = 'audio';
        } else if (fileExtension === 'video') {
          data = new Blob([result], { type: 'video/*' });
          fileType = 'video';
        } else if (fileExtension === 'pdf') {
          data = new Blob([result], { type: 'application/pdf' });
          fileType = 'pdf';
        } else if (fileExtension === 'png') {
          data = new Blob([value], { type: 'image/png' });
          fileType = 'png';
        }
        else if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
          data = new Blob([value], { type: 'image/jpeg' });
          fileType = 'jpg'; // You can set it to 'jpg' or 'jpeg' as desired
        } else {
          // Default to a generic binary file type
          data = new Blob([result]);
          fileType = 'file';
        }

        const fileURL = URL.createObjectURL(data);
        const tempLink = document.createElement('a');
        tempLink.href = fileURL;
        tempLink.setAttribute('download', `file.${fileType}`);
        tempLink.click();
      },
    }
  );
};

// Function to get file download information
const GetElectionDownloadApi = async (value) => {
  return await axios.get(
    `https://dev.api.sabakorg.ir/api/UnionCandidate/ServeFileForUnionCandidate/?fileName=${value}`
  );
};

// Hook using the GetElectionDownloadApi function with React Query
export const UseGetElectionDownload = () => {
  return useMutation(GetElectionDownloadApi);
};
