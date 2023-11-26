import { Container, Row } from 'reactstrap';
import ElectionTemplate from '../ElectionTemplate/ElectionTemplate';
import Style from './ElectionLayout.module.scss';

const ElectionLayout = ({ children, title }) => {
  return (
    <Container>
      <Row>
        <ElectionTemplate />
      </Row>
      {title && (
        <h6 className={`text-right ${Style.title}`}>
          {title} هایی که در انتخابات حضور دارند
        </h6>
      )}
      <div dir='rtl'>{children}</div>
    </Container>
  );
};

export default ElectionLayout;
