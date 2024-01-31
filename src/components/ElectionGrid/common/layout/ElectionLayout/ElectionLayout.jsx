import { Container, Row } from "reactstrap";
import Style from "./ElectionLayout.module.scss";
import ElectionTemplate from "../ElectionTemplate/ElectionTemplate";

const ElectionLayout = ({ children, title }) => {
  return (
    <Container style={{ minHeight: "50vh" }}>
      <Row>
        <ElectionTemplate />
      </Row>
      {title && (
        <h6 className={`text-right ${Style.title}`}>
          {title} هایی که در انتخابات حضور دارند
        </h6>
      )}
      <div dir="rtl">{children}</div>
    </Container>
  );
};

export default ElectionLayout;
