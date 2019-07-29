import { Heading, TextInput } from "grommet/es6";
import React from "react";
import PropTypes from "prop-types";

function Input({name, value, onChange}) {
  return <div>
    <Heading level={4} margin={"none"} style={{fontFamily: "Lato"}}>
      {name}
    </Heading>
    <TextInput
      value={value}
      placeholder={name}
      onChange={onChange}
    />
  </div>;
}

Input.propTypes = {
  name: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.any
};

export default Input;