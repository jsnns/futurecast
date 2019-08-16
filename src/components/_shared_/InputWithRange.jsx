import {Box, RangeInput, Text, TextInput} from "grommet";
import * as PropTypes from "prop-types";
import React, {useState} from "react";

function InputWithRange(props) {
    const [days, setDays] = useState(30);
    const update = e => {
        setDays(e.target.value);
        props.onChange(e.target.value);
    };

    return <Box pad="small">
        <Text>Number of Days</Text>
        <Box pad="small">
            <Box direction="row" align="center" gap={"small"}>
                <Box>
                    <TextInput
                        value={days}
                        onChange={update}
                    />
                </Box>
                <Box flex={"grow"}>
                    <RangeInput
                        min={14}
                        max={356 * 2}
                        step={1}
                        value={days}
                        onChange={update}
                    />
                </Box>
            </Box>
        </Box>
    </Box>;
}

InputWithRange.propTypes = {
    onChange: PropTypes.func
};

export default InputWithRange;