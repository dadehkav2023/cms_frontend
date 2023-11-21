import { Col, Container, Row } from 'reactstrap';
import './ElectionBanner.scss';
import { Link } from 'react-router-dom';

const ElectionBanner = () => {
  return (
    <Container>
      <Row  className="mt-5 banerContainer">
        <Col>
          <Link className="title" to="/Election/Province">
            <h4>برگذاری انتخابات اتحادیه های اتاق اصناف کشاورزی ایران</h4>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ElectionBanner;
