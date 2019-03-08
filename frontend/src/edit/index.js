import React, { Component } from "react";
import {
  getTransactions,
  updateTransaction,
  newTransaction,
  deleteTransaction,
  getAccounts,
  updateAccount
} from "../api";
import {
  Modal,
  Paper,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Input
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddRounded";
import HomeIcon from "@material-ui/icons/HomeRounded";
import DeleteIcon from "@material-ui/icons/DeleteRounded";
import TimeIcon from "@material-ui/icons/TimerRounded";

import "react-datepicker/dist/react-datepicker.css";

const style = { display: "block", float: "left", marginRight: 10 };

class Edit extends Component {
  state = {
    txs: [],
    schedule: {},
    accounts: []
  };

  constructor(props) {
    super(props);
    this.changeTx = this.changeTx.bind(this);
    this.getData = this.getData.bind(this);
    this.changeSchedule = this.changeSchedule.bind(this);
    this.changeAc = this.changeAc.bind(this);
  }

  async getData() {
    let data = await getTransactions();
    let acs = await getAccounts();
    this.setState({ txs: data, accounts: acs });
  }

  async componentDidMount() {
    this.getData();
  }

  changeAc(i, key) {
    return e => {
      let value = e.target.value;
      if (["balance"].includes(key)) value = Number(value);
      const { accounts } = this.state;
      accounts[i][key] = value;
      this.setState({ acs: accounts });
      if (accounts[i]._id) updateAccount(accounts[i]._id.$oid, accounts[i]);
    };
  }

  changeTx(i, key) {
    return e => {
      let value = e.target.value;
      if (["value", "monthly_value"].includes(key)) value = Number(value);
      const { txs } = this.state;
      txs[i][key] = value;
      this.setState({ txs });
      if (txs[i]._id) updateTransaction(txs[i]._id.$oid, txs[i]);
    };
  }

  changeSchedule(key, interval) {
    if (interval) {
      return value => {
        const { selected } = this.state;
        selected.schedule["interval"][key] = Number(value.target.value);
        this.setState({ selected });
      };
    }
    return value => {
      const { selected } = this.state;
      selected.schedule[key] = value;
      this.setState({ selected });
    };
  }

  render() {
    const { txs } = this.state;
    const { selected } = this.state;
    if (selected) {
      if (!selected.schedule) {
        selected.schedule = {};
      }
      if (!selected.schedule.start) {
        selected.schedule.start = 0;
      }
    }

    const mobile = window.innerWidth < 500;

    return (
      <div>
        <Button
          variant="fab"
          color="primary"
          href="/"
          style={{ zIndex: 10000, position: "fixed", right: 20, bottom: 20 }}
        >
          <HomeIcon />
        </Button>
        <IconButton
          variant="fab"
          color="primary"
          style={{ zIndex: 10000, position: "fixed", right: 25, bottom: 85 }}
          onClick={() => {
            newTransaction({}).then(this.getData);
          }}
        >
          <AddIcon />
        </IconButton>
        <h1>Accounts</h1>
        <div style={{ marginTop: 10 }}>
          {this.state.accounts.map((ac, i) => {
            return (
              <div style={{ padding: 10, clear: "both" }}>
                <Input
                  style={style}
                  label="Name"
                  value={ac.name}
                  onChange={this.changeAc(i, "name")}
                />
                <Input
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Balance"
                  value={ac.balance}
                  onChange={this.changeAc(i, "balance")}
                />
              </div>
            );
          })}
        </div>

        <h1>Transactions</h1>
        <div style={{ marginTop: 10, paddingBottom: 125 }}>
          {this.state.txs.map((tx, i) => {
            tx = txs[i];
            return (
              <div
                style={{
                  padding: "0px 10px",
                  clear: "both",
                  marginTop: 25
                }}
                className="tx-group"
              >
                <TextField
                  style={style}
                  label="Name"
                  defaultValue={tx.name}
                  onChange={this.changeTx(i, "name")}
                />
                <Input
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  style={{
                    float: "left",
                    marginRight: 10,
                    marginTop: 16,
                    width: mobile ? "25vw" : undefined
                  }}
                  label="Value"
                  defaultValue={tx.value}
                  onChange={this.changeTx(i, "value")}
                />
                {!mobile && (
                  <div>
                    <Input
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      style={{ float: "left", marginRight: 10, marginTop: 16 }}
                      label="Monthly Value"
                      defaultValue={tx["monthly_value"]}
                      onChange={this.changeTx(i, "monthly_value")}
                    />
                    <TextField
                      style={style}
                      label={mobile ? "" : "Category"}
                      defaultValue={tx.category}
                      onChange={this.changeTx(i, "category")}
                    />
                  </div>
                )}
                <div style={{ paddingTop: 6 }}>
                  <IconButton onClick={() => this.setState({ selected: tx })}>
                    <TimeIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    style={{ margin: 0 }}
                    onClick={() => {
                      if (window.confirm("Are you sure?"))
                        deleteTransaction(tx._id.$oid).then(this.getData);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            );
          })}
        </div>
        <Modal
          style={{
            width: mobile ? "80vw" : "50vw",
            postiion: "fixed",
            left: mobile ? "10vw" : "25vw",
            top: 150
          }}
          onClose={() => this.setState({ selected: false, schedule: {} })}
          open={selected || false}
        >
          <Paper style={{ padding: 25 }}>
            {selected && selected.schedule && (
              <div>
                <h1>{selected.name}</h1>
                <div style={{ clear: "both" }}>
                  <TextField
                    style={{ marginRight: 10 }}
                    type="date"
                    label="Start Date"
                    defaultValue={
                      new Date(selected.schedule.start * 1000)
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={e => {
                      const dateArr = e.target.value.split("-").map(Number);
                      this.changeSchedule("start")(
                        Math.round(
                          new Date(
                            dateArr[0],
                            dateArr[1] - 1,
                            dateArr[2]
                          ).getTime() / 1000
                        )
                      );
                    }}
                  />
                  {selected.category !== "once" && (
                    <TextField
                      style={{ marginRight: 10 }}
                      type="date"
                      label="End Date"
                      defaultValue={
                        new Date(selected.schedule.end * 1000)
                          .toISOString()
                          .split("T")[0]
                      }
                      onChange={e => {
                        const dateArr = e.target.value.split("-");
                        this.changeSchedule("end")(
                          Math.round(
                            new Date(
                              dateArr[0],
                              dateArr[1] - 1,
                              dateArr[2]
                            ).getTime() / 1000
                          )
                        );
                      }}
                    />
                  )}
                </div>
                {selected.category !== "once" && (
                  <div style={{ clear: "both", marginTop: 15 }}>
                    <TextField
                      style={{ marginRight: 10 }}
                      label="Days"
                      value={selected.schedule.interval.days}
                      onChange={this.changeSchedule("days", true)}
                    />
                    <TextField
                      style={{ marginRight: 10 }}
                      label="Months"
                      value={selected.schedule.interval.months}
                      onChange={this.changeSchedule("months", true)}
                    />
                  </div>
                )}
              </div>
            )}

            <div style={{ marginTop: 20 }}>
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  updateTransaction(selected._id.$oid, {
                    schedule: this.state.selected.schedule
                  });
                  this.setState({ selected: false, schedule: {} });
                }}
              >
                Update
              </Button>
            </div>
          </Paper>
        </Modal>
      </div>
    );
  }
}

export default Edit;
