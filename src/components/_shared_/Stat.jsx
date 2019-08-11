import React from "react";
import PropTypes from "prop-types";
import { Box, Heading, Text } from "grommet/es6";
import Currency from "./Currency";

const Stat = ({ label, value, notCurrency }) => {
  return <Box key={`stat+${label}`} direction="column">
    <Heading
      style={{ fontFamily: "Roboto Mono", fontSize: "21pt" }}
      margin="none"
      level={3}
    >
      {notCurrency &&
        <Text style={{ fontFamily: "Roboto Mono" }}>{value}</Text>
      }

      {!notCurrency && <Currency value={value}/> }
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

