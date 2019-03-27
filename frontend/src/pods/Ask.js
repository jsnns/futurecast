import React, { Component } from "react";
import { Box, Heading, Select, TextInput, Text } from "grommet";
import { ask } from "../api";

class Ask extends Component {
  constructor(props) {
    super(props);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.updateParameter = this.updateParameter.bind(this);
  }

  updateQuestion(e) {
    this.setState({ question: e.target.value });
  }

  updateParameter(e) {
    const { question, parameter } = this.state;
    this.setState({ parameter: e.target.value });
    ask(this.questionsToSlugs[question], e.target.value).then(result => {
      this.setState({ result: result.message });
    });
  }

  state = {
    question: "When can we spend?",
    parameter: null,
    result: null
  };

  questionsToSlugs = {
    "When can we spend?": "can_spend"
  };

  render() {
    const questions = Object.keys(this.questionsToSlugs);

    return (
      <Box pad="small" height="medium">
        <Box gap="small">
          <Select
            value={this.state.question || questions[0]}
            options={questions}
            onChange={this.updateQuestion}
          />
          <TextInput placeholder="Parameter" onChange={this.updateParameter} />
        </Box>
        <Box width="medium" direction="row" pad="small">
          <Text style={{ fontFamily: "Lato" }}>{this.state.result}</Text>
        </Box>
      </Box>
    );
  }
}

export default Ask;
