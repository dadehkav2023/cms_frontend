import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  FormControl,
  InputGroup,
  Card,
  Button,
} from "react-bootstrap";
import "./SiteRulesPage.scss";

const SiteRulesPage = () => {
  const rules = [
    {
      title: "قانون تشکیل وزارت جهاد کشاورزی",
      link: "http://www.sabak.org/terms/eyJpdiI6Ikl2N1BlN3ppNGpCZUR6ckhWRFhIcnc9PSIsInZhbHVlIjoiUHV5SVJvNmZTMFRnVExGQjA2UTludz09IiwibWFjIjoiNDIxYmM0MDM0NGE0MDg1MDRiMDgzNGQxNmFjM2FmMGU2MzVmYWIwMDE1NWY1MDZkMzhkZmE2NDM2NmMyNDhhZiJ9",
    },
    {
      title: "قانون مستمر بهبود محیط کسب و کار",
      link: "http://www.sabak.org/terms/eyJpdiI6ImI2UXFsZHpJNGlSclwvU0szUGVFa0p3PT0iLCJ2YWx1ZSI6IlhRUlcrb2lzdXZlVWlzNk5LaFZ3OEE9PSIsIm1hYyI6Ijg0ZjcxMmQwYTRhNDMzNTg4MjNlNDUzMGIxNGJhMDkzNTAwZWIxZGNhZjM3YTQ1YzE4YWMyZDMwOGE5YzQ0ODIifQ==",
    },
    {
      title: "آیین نامه اجرایی بهبود محیط کسب و کار",
      link: "http://www.sabak.org/terms/eyJpdiI6IjlhSnpUZmJTQzFRQW54OFV3eWp0MUE9PSIsInZhbHVlIjoiQnJnZVhoNms4VWd6SktKa1dYY0ZOdz09IiwibWFjIjoiOWFmY2QzYzA3Yjk2MDc5ZmJhYzYwNmI0ZTdjNzQ5OWVjZGMzYjhmNTJlOWNiMDlkMDQ4MTA4ZjE5NGZiYTM3NiJ9",
    },
    {
      title: "قانون تشکیل وزارت جهاد کشاورزی",
      link: "http://www.sabak.org/terms/eyJpdiI6Ikl2N1BlN3ppNGpCZUR6ckhWRFhIcnc9PSIsInZhbHVlIjoiUHV5SVJvNmZTMFRnVExGQjA2UTludz09IiwibWFjIjoiNDIxYmM0MDM0NGE0MDg1MDRiMDgzNGQxNmFjM2FmMGU2MzVmYWIwMDE1NWY1MDZkMzhkZmE2NDM2NmMyNDhhZiJ9",
    },
    {
      title: "قانون مستمر بهبود محیط کسب و کار",
      link: "http://www.sabak.org/terms/eyJpdiI6ImI2UXFsZHpJNGlSclwvU0szUGVFa0p3PT0iLCJ2YWx1ZSI6IlhRUlcrb2lzdXZlVWlzNk5LaFZ3OEE9PSIsIm1hYyI6Ijg0ZjcxMmQwYTRhNDMzNTg4MjNlNDUzMGIxNGJhMDkzNTAwZWIxZGNhZjM3YTQ1YzE4YWMyZDMwOGE5YzQ0ODIifQ==",
    },
    {
      title: "آیین نامه اجرایی بهبود محیط کسب و کار",
      link: "http://www.sabak.org/terms/eyJpdiI6IjlhSnpUZmJTQzFRQW54OFV3eWp0MUE9PSIsInZhbHVlIjoiQnJnZVhoNms4VWd6SktKa1dYY0ZOdz09IiwibWFjIjoiOWFmY2QzYzA3Yjk2MDc5ZmJhYzYwNmI0ZTdjNzQ5OWVjZGMzYjhmNTJlOWNiMDlkMDQ4MTA4ZjE5NGZiYTM3NiJ9",
    },
    {
      title: "قانون تشکیل وزارت جهاد کشاورزی",
      link: "http://www.sabak.org/terms/eyJpdiI6Ikl2N1BlN3ppNGpCZUR6ckhWRFhIcnc9PSIsInZhbHVlIjoiUHV5SVJvNmZTMFRnVExGQjA2UTludz09IiwibWFjIjoiNDIxYmM0MDM0NGE0MDg1MDRiMDgzNGQxNmFjM2FmMGU2MzVmYWIwMDE1NWY1MDZkMzhkZmE2NDM2NmMyNDhhZiJ9",
    },
    {
      title: "قانون مستمر بهبود محیط کسب و کار",
      link: "http://www.sabak.org/terms/eyJpdiI6ImI2UXFsZHpJNGlSclwvU0szUGVFa0p3PT0iLCJ2YWx1ZSI6IlhRUlcrb2lzdXZlVWlzNk5LaFZ3OEE9PSIsIm1hYyI6Ijg0ZjcxMmQwYTRhNDMzNTg4MjNlNDUzMGIxNGJhMDkzNTAwZWIxZGNhZjM3YTQ1YzE4YWMyZDMwOGE5YzQ0ODIifQ==",
    },
    {
      title: "آیین نامه اجرایی بهبود محیط کسب و کار",
      link: "http://www.sabak.org/terms/eyJpdiI6IjlhSnpUZmJTQzFRQW54OFV3eWp0MUE9PSIsInZhbHVlIjoiQnJnZVhoNms4VWd6SktKa1dYY0ZOdz09IiwibWFjIjoiOWFmY2QzYzA3Yjk2MDc5ZmJhYzYwNmI0ZTdjNzQ5OWVjZGMzYjhmNTJlOWNiMDlkMDQ4MTA4ZjE5NGZiYTM3NiJ9",
    },
  ];
  return (
    <>
      <section className="site-rules-section">
        <h3 className="mt-5">قوانین و مقررات</h3>
        <hr />
        <Container className="site-rules-container" fluid>
          <Row>
            {rules.map((rule, index) => {
              return (
                <Col md={4}>
                  <Card key={index} className="rule-box">
                    <Card.Body>
                      <Card.Title> {rule.title}</Card.Title>

                      <Card.Text style={{ marginTop: "30px" }}>
                        جهت دریافت فایل از دکمه زیر استفاده کنید
                      </Card.Text>
                      <Card.Link href={rule.link} download>
                        <button className="downloadFile">دریافت فایل</button>
                      </Card.Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
    </>
  );
};
export default SiteRulesPage;
