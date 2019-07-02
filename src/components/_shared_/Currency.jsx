import React from "react";
import PropTypes from "prop-types"
import { Text } from "grommet";
import { toCurrency } from "../../data/helpers";

const Currency = ({ value }) => {
  return  <Text
    color={value < 0 ? "status-critical" : "status-ok"}
    style={{ fontFamily: "Roboto Mono" }}
  >
    {toCurrency(value)}
  </Text>
};

Currency.propTypes = {
  value: PropTypes.any
};

export default Currency;