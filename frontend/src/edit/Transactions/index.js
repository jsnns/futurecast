import React, { Component } from "react";

import { getTransactions, updateTransaction, newTransaction } from "../../api";

import { Box, Button, TextInput } from "grommet";
import SingleTx from "./ViewSingleTx";
import { Add } from "grommet-icons";
import EditTransactionModal from "./EditTransactionModal";

function toTimeStamp(date) {
  if (date && date.split) {
    let vals = date.split("/").map(Number);
    let ts = new Date(vals[2], vals[0] - 1, vals[1]);
    return ts.getTime() / 1000;
  }
  return date;
}

class EditTxs extends Component {
  state = {
    income: [],
    expenses: [],
    allIncome: [],
    allExpenses: [],
    selectedTx: null
  };

  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.pushTx = this.pushTx.bind(this);
    this.filterTxs = this.filterTxs.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateTx = this.updateTx.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  async getData() {
    let data = await getTransactions();
    let income = data.filter(tx => tx.value > 0).sort((a, b) => a.value - b.value);
    let expenses = data.filter(tx => tx.value <= 0).sort((a, b) => a.value - b.value);
    this.setState({ income, expenses, allIncome: income, allExpenses: expenses });
  }

  openEditModal(tx) {
    this.setState({ selectedTx: tx });
  }

  closeModal() {
    this.setState({ selectedTx: null });
  }

  pushTx(tx) {
    if (tx.schedule) {
      tx.schedule.start = toTimeStamp(tx.schedule.start);
      tx.schedule.end = toTimeStamp(tx.schedule.end);

      tx.schedule.days = Number(tx.schedule.days);
      tx.schedule.months = Number(tx.schedule.months);
    }

    tx.value = Number(tx.value);
    tx.monthly_value = Number(tx.monthly_value);

    updateTransaction(tx._id.$oid, tx).then(() =>
      this.setState({ selectedTx: null })
    );
  }

  filterTxs(e) {
    const { allIncome, allExpenses } = this.state;
    if (e.target.value !== "") this.setState({ income: allIncome, expenses: allExpenses });
    const search = e.target.value.toLowerCase();
    let income = allIncome.filter(tx => tx.name && tx.name.toLowerCase().indexOf(search) > -1);
    let expenses = allExpenses.filter(tx => tx.name && tx.name.toLowerCase().indexOf(search) > -1);
    this.setState({ income, expenses });
  }

  updateTx(key) {
    return e => {
      const { selectedTx } = this.state;
      selectedTx[key] = e.target.value;
      this.setState({ selectedTx });
    };
  }

  render() {
    const { selectedTx } = this.state;

    return (
      <Box pad="medium">
        <EditTransactionModal
          onClose={this.closeModal}
          onSubmit={this.pushTx}
          onEdit={this.updateTx}
          transaction={selectedTx}
        />
        <Box>
          <Box direction="row-responsive">
            <Box margin="small">
              <Button
                icon={<Add />}
                style={{ width: 50 }}
                primary
                onClick={() => {
                  newTransaction({})
                    .then(() => {
                      this.getData();
                    })
                    .catch(() => console.log("Error getting new Txs"));
                }}
              />
            </Box>
            <Box margin="small" fill>
              <TextInput placeholder="Search" onChange={this.filterTxs} />
            </Box>
          </Box>
          <Box direction="row-responsive" wrap margin={{bottom: "medium"}}>
            {this.state.income.map(tx => (
              <SingleTx
                tx={tx}
                key={tx.name}
                openEditModal={this.openEditModal}
                refresh={this.getData}
              />
            ))}
          </Box>
          <Box direction="row-responsive" wrap>
            {this.state.expenses.map(tx => (
              <SingleTx
                tx={tx}
                key={tx.name}
                openEditModal={this.openEditModal}
                refresh={this.getData}
              />
            ))}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default EditTxs;
