import { Container, Row } from 'reactstrap';
import ElectionBanner from '../../ElectionBanner/ElectionBanner';
import ElectionLogo from '../../ElectionLogo/ElectionLogo';

const ElectionLayout = ({ children }) => {
  return (
    <Container>
      <Row >
        <ElectionBanner />
         <ElectionLogo />
      </Row>
      <Row>
    
      </Row>

      <div>{children}</div>
    </Container>
  );
};

export default ElectionLayout;
