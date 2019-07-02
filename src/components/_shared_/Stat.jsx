import React from "react";
import PropTypes from "prop-types";
import { Box, Heading, Text } from "grommet/es6";
import Currency from "./Currency";

const Stat = ({ label, value }) => {
  return <Box key={`stat+${label}`} direction="column">
    <Heading
      style={{ fontFamily: "Roboto Mono", fontSize: "21pt" }}
      margin="none"
      level={3}
    >
      <Currency value={value} />
    </Heading>

    <Text margin="none" style={{ fontFamily: "Lato" }}>
      {label}
    </Text>
  </Box>;
};

Stat.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any
};

export default Stat;

