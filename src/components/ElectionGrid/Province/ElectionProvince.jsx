import { Col, Container, Row } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import './ElectionProvince.scss';
import { useEffect, useState } from 'react';
import { UseGetElectionProvince } from '../../../core/services/api/get-election-province';
import ElectionLayout from '../layout/ElectionLayout/ElectionLayout';

const ElectionProvince = () => {
  const history = useHistory();
  const [Province, setProvince] = useState();
  const { data, isLoading, isSuccess } = UseGetElectionProvince();

  useEffect(() => {
    if (data && data.data && data.data.result) {
      const result = data.data?.result;
      setProvince(result);
      
    }
  }, [isSuccess]);

  
  return (
    <>
      <ElectionLayout>
        <Container fluid dir="rtl">
          <Row>
            <Col>
              <h6 className="provinceParagraph">
                استان هایی که درانتخابات حضور دارند:
              </h6>

              <Row>
                {Province?.length > 0 &&
                  Province?.map((election, index) => {
                    return (
                      <div key={index} className=" provinceButton mb-5">
                        <Link
                          className="provinceButtonLink"
                          to={`/Election/Counties/${election.provinceId}`}
                        >
                          <p>{election.provinceTitle}</p>
                        </Link>
                      </div>
                    );
                  })}
              </Row>
            </Col>
          </Row>
        </Container>
      </ElectionLayout>
    </>
  );
};

export default ElectionProvince;
