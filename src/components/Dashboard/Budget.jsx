import React, { Component } from "react";
import gql from "graphql-tag";

import PieWithTable from "../_shared_/PieWithTable";
import { Box } from "grommet";
import { colors } from "../../constants";
import { client } from "../../client";
import { getBudget } from "../../data/logic";

import _ from "lodash";
import Stat from "../_shared_/Stat";

const GET_TRANSACTIONS = gql`
    {
        transactions {
            id
            category
            value
            interval_days
            interval_months
        }
    }
`;

class Budget extends Component {
  state = { data: {}, table: [], stats: { income: 0, expenses: 0 } };

  render() {
    const { data, table, stats } = this.state;

    return <Box>
      <Box direction={"row"} gap={"medium"}>
        <Stat label={"Total Expenses"} value={stats.expenses} />
        <Stat label={"Total Income"} value={stats.income} />
      </Box>
      <PieWithTable pieData={data} tableData={table}/>
    </Box>;
  }

  chartDataFromBudget = budget => {
    budget = budget
      .sort((a, b) => a.value - b.value)
      .filter(a => a.category !== "once");

    let labels = [];
    let values = [];
    let table = [];
    let sliceColors = [];

    let stats = {
      expenses: _(budget).map('value').filter(a => a < 0).sum(),
      income: _(budget).map('value').filter(a => a > 0).sum()
    };

    for (let i in budget) {
      let { value, category } = budget[i];

      if (category === "income") {
        category = "leftover";
        value = _(budget).map("value").sum();
        sliceColors.push("#f8f8f8");
      } else {
        sliceColors.push(colors[i]);
      }

      labels.push(category);
      values.push(Math.abs(value)); // makes piechart show postive numbers
      table.push({ value, category });
    }

    this.setState({
      stats,
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: sliceColors,
            borderWidth: 0
          }
        ]
      },
      table
    });
  };

  componentWillMount = () => {
    client
      .query({ query: GET_TRANSACTIONS })
      .then(({ data, error, loading }) => {
        if (loading) return "loading...";
        if (error) return `Error! ${error}`;

        this.chartDataFromBudget(getBudget(data.transactions));
      });
  };

}

export default Budget;
