import React, { Component } from "react";
import { Box } from "grommet";

import { client } from "../../client";
import { getBalances } from "../../data/logic";
import gql from "graphql-tag";
import _ from "lodash";
import Stat from "../_shared_/Stat";

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

class StatsTables extends Component {
  state = { stats: [] };

  render() {
    const { stats } = this.state;

    return (
      <Box gap={"small"}>
        <Box direction="row" gap={"medium"}>
          {stats.map(stat => <Stat label={stat.label} value={stat.value}/>)}
        </Box>
      </Box>
    );
  }

  componentWillMount = async () => {
    client
      .query({ query: GET_TRANSACTIONS })
      .then(({ data, loading, error }) => {
        if (loading) console.log("Loading...");
        if (error) console.log(`Error! ${error}`);
        if (data) {

          const { transactions, accounts } = data.users[0];
          const currentBalance = _(accounts).map("balance").sum();
          const balances = getBalances(transactions, currentBalance, 365);

          this.setState({
            stats: [
              {
                label: "Minimum Balance",
                value: _(balances).minBy("balance").balance
              },
              {
                label: "Current Balance",
                value: currentBalance
              }
            ]
          });
        }
      });
  };
}

export default StatsTables;
