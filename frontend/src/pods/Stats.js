import React, { Component } from "react";

import { getStats } from "../api";
import { Box, Meter, Heading, Text } from "grommet";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class StatsTables extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  componentWillMount() {
    const { report } = this.props;
    getStats(report)
      .then(data => {
        this.setState({ data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const { data } = this.state;
    const stats = Object.keys(data).map(key => ({
      label: key,
      value: data[key]
    }));

    return (
      <Box className="table">
        <Box direction="row" background="brand" pad="medium">
          {stats.map(stat => (
            <Box direction="column" basis="small">
              <Heading level={3} margin="none">
                {stat.value}
              </Heading>
              <Text margin="none">{stat.label}</Text>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }
}

export default StatsTables;
