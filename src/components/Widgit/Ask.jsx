import React, { Component } from "react";
import { Box, Select, Text, TextInput } from "grommet";

class Ask extends Component {
  state = {
    question: "When can we spend?",
    parameter: null,
    result: null
  };
  questionsToSlugs = {
    "When can we spend?": "can_spend",
    "How much would this runway cost?": "run_length"
  };

  constructor(props) {
    super(props);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.updateParameter = this.updateParameter.bind(this);
  }

  updateQuestion(e) {
    this.setState({ question: e.value });
  }

  updateParameter(e) {
    this.setState({ parameter: e.target.value });
    // ask(this.questionsToSlugs[question], e.target.value).then(result => {
    // 	this.setState({ result: result.message });
    // });
  }

  render() {
    const questions = Object.keys(this.questionsToSlugs);

    return (
      <Box pad='small'>
        <Box gap='small'>
          <Select
            value={this.state.question || questions[0]}
            options={questions}
            onChange={this.updateQuestion}
          />
          <TextInput placeholder='Parameter' onChange={this.updateParameter}/>
        </Box>
        <Box width='medium' direction='row' pad='small'>
          <Text style={{ fontFamily: "Lato" }}>{this.state.result}</Text>
        </Box>
      </Box>
    );
  }
}

export default Ask;
