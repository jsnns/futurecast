import React, { Component } from "react";

import { Box, TextInput } from "grommet";

function toDate(timestamp) {
  timestamp = Number(timestamp) * 1000;

  if (!timestamp) return "";
  var d = new Date(timestamp);
  var dd = d.getDate();
  var mm = d.getMonth() + 1; //January is 0!
  var yyyy = d.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  return mm + "/" + dd + "/" + yyyy;
}

class EditTxSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: this.props.schedule || {}
    };

    this.updateSchedule = this.updateSchedule.bind(this);
  }

  updateSchedule(key) {
    return e => {
      const { schedule } = this.state;
      schedule[key] = e.target.value;
      this.setState({ schedule });
      this.props.updateSchedule({ target: { value: schedule } });
    };
  }

  render() {
    const { schedule } = this.state;
    return (
      <Box pad="small">
        <Box pad="small" direction="row" gap="small">
          <TextInput
            defaultValue={toDate(schedule.start)}
            placeholder="Start"
            onChange={this.updateSchedule("start")}
          />
          <TextInput
            defaultValue={toDate(schedule.end)}
            placeholder="End"
            onChange={this.updateSchedule("end")}
          />
        </Box>
        <Box pad="small" direction="row" gap="small">
          <TextInput
            defaultValue={schedule.days}
            placeholder="Days"
            onChange={this.updateSchedule("days")}
          />
          <TextInput
            defaultValue={schedule.months}
            placeholder="Months"
            onChange={this.updateSchedule("months")}
          />
        </Box>
      </Box>
    );
  }
}

export default EditTxSchedule;
