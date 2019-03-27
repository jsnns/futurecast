import React, { Component } from "react";

import { getTransactions, updateTransaction, newTransaction } from "../../api";

import { Box, Button, Heading, TextInput } from "grommet";
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
    txs: [],
    allTxs: [],
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
    let txs = data.sort((a, b) => b.value - a.value);
    this.setState({ txs, allTxs: txs });
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

    console.log(tx.schedule);

    updateTransaction(tx._id.$oid, tx).then(() =>
      this.setState({ selectedTx: null })
    );
  }

  filterTxs(e) {
    const { allTxs } = this.state;
    if (e.target.value !== "") this.setState({ txs: allTxs });
    const search = e.target.value;
    let txs = allTxs.filter(tx => tx.name && tx.name.indexOf(search) > -1);
    this.setState({ txs });
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
          <Heading style={{ fontFamily: "Alegreya" }} margin="none">
            Transactions
          </Heading>
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
          <Box direction="row-responsive" wrap>
            {this.state.txs.map(tx => (
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
