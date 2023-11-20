import { correctUploadPath } from '../../../core/utils/image-path-correction';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './ElectionLogo.scss';
import { Col, Container, Row } from 'reactstrap';

const ElectionLogo = () => {
  const state = useSelector((state) => state.setting);
  return (
    <Container>
      <Row className="justify-content-start ">
        <Col lg={2}>
       
          {state.logoImageAddress !== '' && (
            <Link className="logo" to="/">
              <img
                alt="logo"
                src={
                  process.env.REACT_APP_PUBLIC_PATH +
                  '/' +
                  correctUploadPath(state.logoImageAddress)
                }
              />
            </Link>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ElectionLogo;
