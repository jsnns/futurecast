import React, { Component } from "react";
import gql from "graphql-tag";

import { client } from "../../client";
import { getBalances } from "../../data/logic";
import InteractiveLineChart from "../_shared_/InteractiveLineChart";
import * as colors from "../../constants/colors";
import _ from "lodash";

const GET_TRANSACTIONS = gql`
    {
        users {
            transactions {
                id
                value
                start
                end
                interval_days
                interval_months
            }
            accounts {
                balance
            }
        }
    }
`;

class Balance extends Component {
  state = {
    data: {},
    transactions: [],
    accounts: [],
    days: 30
  };

  componentDidMount = async () => {
    client
      .query({ query: GET_TRANSACTIONS })
      .then(({ data, loading, error }) => {
        if (loading) console.log("Loading...");
        if (error) console.log(`Error! ${error}`);

        if (data) {
          // get the first user since it will be the only user
          const { accounts, transactions } = data.users[0];
          this.setState({ accounts, transactions }, this.getData);
        }
      });
  };

  updateData = e => {
    this.setState({ days: Number(e.target.value) }, this.getData);
  };

  getData = () => {
    const { transactions, accounts, days } = this.state;

    const startingBalance = _(accounts).map("balance").sum();

    const data = getBalances(transactions, startingBalance, days);

    const balances = _(data).map("balance").value();
    const mins = _(data).map("minimum").value();
    const labels = _(data).map("date").map(date => new Date(date)).value();

    this.setState({
      data: {
        labels: labels,
        datasets: [
          {
            label: "Min Balance",
            backgroundColor: "rgba(1,1,1,0)",
            borderColor: colors.minimumBalance,
            lineTension: 0,
            pointRadius: 1,
            pointHitRadius: 5,
            data: mins
          },
          {
            label: "Balance",
            backgroundColor: "rgba(1,1,1,0)",
            borderColor: colors.balance,
            pointRadius: 1,
            lineTension: 0,
            pointHitRadius: 5,
            data: balances
          }
        ]
      }
    });
  };

  render() {
    const { data, days } = this.state;

    return (
      <InteractiveLineChart
        data={data}
        value={days}
        updateValue={this.updateData}
      />
    );
  }
}

export default Balance;