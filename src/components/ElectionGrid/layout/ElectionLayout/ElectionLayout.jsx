import { Container, Row } from 'reactstrap';
import ElectionTemplate from '../../ElectionTemplate/ElectionTemplate';

const ElectionLayout = ({ children }) => {
  return (
    <Container>
      <Row>
        <ElectionTemplate />
      </Row>
      <div>{children}</div>
    </Container>
  );
};

export default ElectionLayout;
