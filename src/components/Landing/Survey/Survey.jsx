import React from "react";
import "./Survey.scss";
import SurverySubmit from "../../common/Buttons/SurveySubmit/SurveySubmit";
import { Card } from "react-bootstrap";

const Survey = () => {
  const questionAndAnswers = {
    question:
      "اینجا یک سوال کاملا طبیعی و غیر ساختگی قرار میگیرد اینجا یک سوال کاملا طبیعی و غیر ساختگی قرار میگیرد اینجا یک سوال کاملا طبیعی و غیر ساختگی قرار میگیرد اینجا یک سوال کاملا طبیعی و غیر ساختگی قرار میگیرد اینجا یک سوال کاملا طبیعی و غیر ساختگی قرار میگیرد اینجا یک سوال کاملا طبیعی و غیر ساختگی قرار میگیرد",
    answers: [
      "سوالی را از شما پرسیدیم و این یک گزینه است",
      "سوالی را از شما پرسیدیم و این یک گزینه است",
      "سوالی را از شما پرسیدیم و این یک گزینه است",
      "سوالی را از شما پرسیدیم و این یک گزینه است",
    ],
  };
  return (
    <section className="Survey-container">
      <Card className="survey-card">
        <span className="survey-title">نظر سنجی</span>
        <Card.Body className="survey-card-body">
          <p className="survey-question">{questionAndAnswers.question}</p>
          <ul className="survey-items">
            {questionAndAnswers.answers.map((answer, key) => {
              return (
                <li key={key} className="survey-item">
                  <label for={`answer${key}`}>{answer}</label>
                  <input id={`answer${key}`} type="checkbox" />
                </li>
              );
            })}
          </ul>
        </Card.Body>
        <SurverySubmit />
      </Card>
    </section>
  );
};
export default Survey;
