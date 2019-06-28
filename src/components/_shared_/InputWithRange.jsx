import { Box, RangeInput, Text, TextInput } from "grommet";
import * as PropTypes from "prop-types";
import React, { useState } from "react";

function InputWithRange(props) {
  const [ days, setDays ] = useState(30);
  const update = e => {
    setDays(e.target.value);
    props.onChange(e.target.value);
  };

  return <Box pad="small">
    <Text>Number of Days</Text>
    <Box pad="small">
      <TextInput
        value={days}
        onChange={update}
      />
      <RangeInput
        min={14}
        max={356 * 2}
        step={1}
        value={days}
        onChange={update}
      />
    </Box>
  </Box>;
}

InputWithRange.propTypes = {
  onChange: PropTypes.func
};

export default InputWithRange;