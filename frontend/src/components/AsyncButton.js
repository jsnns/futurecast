import React, { Component } from "react";
import { Box, Text, Button } from "grommet";
import PropTypes from "prop-types";

class AsyncButton extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.click = this.click.bind(this);
    this.done = this.done.bind(this);
  }

  click() {
    const { onClick } = this.props;
    this.setState({ loading: true });
    onClick().then(() => this.done());
  }

  done() {
    this.props.done();
    this.setState({ loading: false });
  }

  render() {
    const { icon, top, left, shown } = this.props;

    if (!shown) return <div />;

    return (
      <Button
        onClick={this.click}
        icon={icon}
        margin="xsmall"
        primary={true}
        color={this.state.loading ? "light-1" : "brand"}
        style={{
          position: "absolute",
          width: 50,
          height: 50,
          right: -30,
          top: -30,
          marginBottom: -10
        }}
      />
    );
  }
}

AsyncButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  done: PropTypes.func.isRequired,
  shown: PropTypes.bool.isRequired,
  icon: PropTypes.element,
  top: PropTypes.number,
  left: PropTypes.number
};

export default AsyncButton;
