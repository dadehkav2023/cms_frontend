import { Col, Container, Row, Table } from 'reactstrap';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UseGetElectionUnions } from '../../../core/services/api/get-election-unions';
import ElectionLayout from '../layout/ElectionLayout/ElectionLayout';
import { useParams } from 'react-router-dom';
import Loading from '../../common/Loading/Loading';
import Style from './ElectionUnions.module.scss';

const ElectionUnions = () => {
  const { id } = useParams();
  const { data, isLoading, isSuccess, mutate } = UseGetElectionUnions();
  const unions = data && data.data && data.data.result;
  useEffect(() => {
    mutate(id);
  }, []);

  return (
    <>
      <ElectionLayout title={':اتحادیه'}>
        {isLoading && <Loading />}

        <Table>
          <thead>
            <tr>
              <th>ردیف</th>
              <th>نام اتحادیه</th>
            </tr>
          </thead>
          {unions?.length > 0 &&
            unions?.map((election, index) => {
              return (
                <>
                  <tbody>
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <Link
                        className={Style.unionsButtonLink}
                        to={`/Election/Candidates/${election.unionElectionId}`}
                      >
                        <td>{election.unionTitle}</td>
                      </Link>
                    </tr>
                  </tbody>
                </>
              );
            })}
        </Table>
      </ElectionLayout>
    </>
  );
};

export default ElectionUnions;
