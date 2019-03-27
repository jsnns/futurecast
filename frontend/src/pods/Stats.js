import React, { Component } from "react";

import { getStats } from "../api";
import { Box, Heading, Text } from "grommet";

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
              <Heading
                style={{ fontFamily: "Abril Fatface", fontSize: "21pt" }}
                level={3}
                margin="none"
              >
                {stat.value}
              </Heading>
              <Text margin="none" style={{ fontFamily: "Lato" }}>
                {stat.label}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }
}

export default StatsTables;
