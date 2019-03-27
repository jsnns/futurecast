import React, { Component } from "react";

import { Box, Button } from "grommet";
import { Home, Add } from "grommet-icons";

import "react-datepicker/dist/react-datepicker.css";
import EditTxs from "./Transactions";
import EditAccounts from "./Accounts";

const style = { display: "block", float: "left", marginRight: 10 };

class Edit extends Component {
  state = {
    txs: [],
    schedule: {},
    accounts: [],
    edit: 0
  };

  constructor(props) {
    super(props);
  }

  changeSchedule(key, interval) {
    if (interval) {
      return value => {
        const { selected } = this.state;
        if (!selected.schedule.interval) selected.schedule.interval = {};

        selected.schedule.interval[key] = Number(value.target.value);
        this.setState({ selected });
      };
    }
    return value => {
      const { selected } = this.state;
      if (!selected.schedule) selected.schedule = {};
      selected.schedule[key] = value;
      this.setState({ selected });
    };
  }

  render() {
    const { txs } = this.state;
    const { selected } = this.state;
    const getData = this.getData;

    if (selected) {
      if (!selected.schedule) {
        selected.schedule = {};
      }
      if (!selected.schedule.start) {
        selected.schedule.start = 0;
      }
    }

    return (
      <Box>
        <Box direction="row-responsive">
          <Button margin="small" icon={<Home />} label="Home" href="/" />
        </Box>
        <EditAccounts />
        <EditTxs />
      </Box>
    );
  }
}

export default Edit;
