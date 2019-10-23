import React, { Component } from "react";
import axios from "axios";
import Answers from "./Answers.jsx";

export default class QASet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: []
    };
    this.getAnswers = this.getAnswers.bind(this);
  }
  componentDidMount() {
    this.getAnswers(this.props.question.question_id);
  }
  getAnswers() {
    axios
      .get(`http://18.223.1.30/qa/${this.props.question.question_id}/answers`)
      .then(({ data }) => {
        this.setState({ answers: data.results });
      });
  }

  render() {
    return (
      <div>
        <li>Q: {this.props.question.question_body}</li>
        <li>
          A:{" "}
          {this.state.answers.map(answer => {
            return <Answers key={answer.answer_id} answer={answer} />;
          })}
        </li>
      </div>
    );
  }
}