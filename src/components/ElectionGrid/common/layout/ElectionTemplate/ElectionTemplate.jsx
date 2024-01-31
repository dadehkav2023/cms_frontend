import { correctUploadPath } from '../../../../../core/utils/image-path-correction';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import Style from './ElectionTemplate.module.scss';

const ElectionTemplate = () => {
  const state = useSelector((state) => state.setting);
  return (
    <Container>
      <Row className="mt-5 justify-content-around ">
        <Col lg={2} md={1}>
          {state.logoImageAddress !== '' && (
            <Link className={Style.logo} to="/">
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

        <Col lg={8} md={9} className="justify-content-center  pt-lg-5 ">
          <Link className={Style.title} to="/Election/Province">
            <h4>برگذاری انتخابات اتحادیه های اتاق اصناف کشاورزی ایران</h4>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ElectionTemplate;
