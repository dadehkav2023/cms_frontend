import React from 'react';
import { Button } from 'reactstrap';
import { useServeFile } from '../../../../core/services/api/get-election-candidates-downloads';

const ModalLocation = ({ index, fileName }) => {
  const useServeFileMutation = useServeFile();

  const handleDownloadClick = (fileName) => {
    useServeFileMutation.mutate(fileName);
  };

  return (
    <tbody>
      <tr>
        <th >{index}</th>
        <td dir="ltr">{fileName?.slice(0, 30) + '...'}</td>
        <td>
          <Button onClick={() => handleDownloadClick(fileName)}>دانلود</Button>
        </td>
      </tr>
    </tbody>
  );
};

export default ModalLocation;
