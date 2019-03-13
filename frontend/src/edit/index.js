import React, { Component } from "react";
import {
  getTransactions,
  updateTransaction,
  newTransaction,
  deleteTransaction,
  getAccounts,
  updateAccount
} from "../api";

import { Modal, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteRounded";
import TimeIcon from "@material-ui/icons/TimerRounded";

import {
  Box,
  Button,
  Heading,
  TextInput,
  Calendar,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
  Table
} from "grommet";
import { Home, Add, Edit as EditIcon } from "grommet-icons";

import "react-datepicker/dist/react-datepicker.css";

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
    this.changeTx = this.changeTx.bind(this);
    this.getData = this.getData.bind(this);
    this.changeSchedule = this.changeSchedule.bind(this);
    this.changeAc = this.changeAc.bind(this);
  }

  async getData() {
    let data = await getTransactions();
    let acs = await getAccounts();
    let txs = data.sort((a, b) => {
      const aBigger = a.category.toLowerCase() > b.category.toLowerCase();
      if (aBigger) return 1;
      else return -1;
    });
    this.setState({ txs, accounts: acs });
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
          <Button
            margin="small"
            icon={<Add />}
            label={"Transaction"}
            onClick={() => {
              newTransaction({}).then(() => {
                getData();
              });
            }}
          />
          <Button
            margin="small"
            icon={<Add />}
            label={"Account"}
            onClick={() => {
              getData();
            }}
          />
        </Box>
        <Box
          margin={{ top: "small", bottom: "small" }}
          direction="row-responsive"
        >
          <Heading margin="none">Accounts</Heading>
          {this.state.accounts.map((ac, i) => {
            return (
              <Box pad={{ top: "small" }} direction="row">
                <Box pad={{ left: "small", right: "small" }} direction="row">
                  <TextInput
                    value={ac.name}
                    onChange={this.changeAc(i, "name")}
                  />
                </Box>
                <Box pad={{ left: "small", right: "small" }} direction="row">
                  <TextInput
                    value={ac.balance}
                    onChange={this.changeAc(i, "balance")}
                  />
                </Box>
              </Box>
            );
          })}
        </Box>

        <Box>
          <Heading margin="none">Transactions</Heading>
          <Table>
            {this.state.txs.map((tx, i) => {
              tx = txs[i];
              if (this.state.edit !== i) {
                return (
                  <TableRow direction="row-responsive">
                    <TableCell>{tx.name}</TableCell>
                    <TableCell>{tx.value}</TableCell>
                    <TableCell>{tx.category}</TableCell>
                    <TableCell>
                      <Button
                        icon={<EditIcon />}
                        onClick={() => this.setState({ edit: i })}
                      />
                    </TableCell>
                  </TableRow>
                );
              }
              return (
                <TableRow
                  pad="small"
                  className="tx-group"
                  direction="row-responsive"
                >
                  <TableCell>
                    <TextInput
                      value={tx.name}
                      placeholder="Name"
                      onChange={this.changeTx(i, "name")}
                    />
                  </TableCell>
                  <TableCell direction="row">
                    <TextInput
                      placeholder="Value"
                      value={tx.value}
                      onChange={this.changeTx(i, "value")}
                    />
                  </TableCell>
                  <TableCell direction="row">
                    <TextInput
                      placeholder="Monthly Value"
                      value={tx["monthly_value"]}
                      onChange={this.changeTx(i, "monthly_value")}
                    />
                  </TableCell>
                  <TableCell direction="row">
                    <TextInput
                      placeholder="Category"
                      value={tx.category}
                      onChange={this.changeTx(i, "category")}
                    />
                  </TableCell>
                  <TableCell direction="row">
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
                  </TableCell>
                </TableRow>
              );
            })}
          </Table>
        </Box>
        <Modal
          style={{
            position: "fixed",
            left: "12.5vw",
            top: "10vh"
          }}
          onClose={() => this.setState({ selected: false, schedule: {} })}
          open={selected || false}
        >
          <Box
            round
            width="75vw"
            style={{ maxHeight: "80vh" }}
            pad="large"
            background="brand"
            elevation="small"
          >
            {selected && selected.schedule && (
              <Box>
                <Heading margin="none">{selected.name}</Heading>
                <Box direction="row-responsive">
                  <Box direction="row-responsive">
                    <Calendar
                      margin={{ right: "medium" }}
                      size="small"
                      date={
                        selected.schedule.start
                          ? new Date(selected.schedule.start).toISOString() *
                            1000
                          : Date.now()
                      }
                      onChange={e => {
                        debugger;
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
                  </Box>
                  {selected.category !== "once" && (
                    <Box direction="row-responsive">
                      <Calendar
                        size="small"
                        date={
                          selected.schedule.start
                            ? new Date(selected.schedule.start).toISOString() *
                              1000
                            : Date.now()
                        }
                        onChange={e => {
                          debugger;
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
                    </Box>
                  )}
                </Box>
                <Box direction="row-responsive">
                  <Box margin="small">
                    <TextInput
                      placeholder="Days"
                      value={
                        selected.schedule.interval
                          ? selected.schedule.interval.days
                          : ""
                      }
                      onChange={this.changeSchedule("days", true)}
                    />
                  </Box>
                  <Box margin="small">
                    <TextInput
                      placeholder="Months"
                      value={
                        selected.schedule.interval
                          ? selected.schedule.interval.months
                          : ""
                      }
                      onChange={this.changeSchedule("months", true)}
                    />
                  </Box>
                </Box>
              </Box>
            )}

            <Box pad="small">
              <Button
                label="Update Schedule"
                onClick={() => {
                  updateTransaction(selected._id.$oid, {
                    schedule: this.state.selected.schedule
                  });
                  this.setState({ selected: false, schedule: {} });
                }}
              />
            </Box>
          </Box>
        </Modal>
      </Box>
    );
  }
}

export default Edit;
