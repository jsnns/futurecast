import React from "react";
import PropTypes from "prop-types"
import { Text } from "grommet";

const RedOrGreen = ({ red, value }) => {
  return  <Text
    color={red ? "status-critical" : "status-ok"}
    style={{ fontFamily: "Roboto Mono" }}
  >
    {value}
  </Text>
};

RedOrGreen.propTypes = {
  red: PropTypes.bool,
  value: PropTypes.any
};

export default RedOrGreen;