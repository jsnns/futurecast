import React, { Component } from "react";
import gql from "graphql-tag";

import PieWithTable from "../shared/PieWithTable";
import { Box } from "grommet";
import { colors } from "../../constants";
import { client } from "../../routes";
import { getBudget } from "../../data/logic";
import { getKey, sumArray } from "../../data/helpers";

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
  state = {
    data: {},
    table: []
  };

  render() {
    const { data, table } = this.state;
    return <Box>
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

    for (let i in budget) {
      let { value, category } = budget[i];

      if (category === "income") {
        category = "leftover";
        value = Math.abs(sumArray(getKey(budget, "value")));
        sliceColors.push("#f8f8f8");
      } else {
        sliceColors.push(colors[i]);
      }

      labels.push(category);
      values.push(Math.abs(value)); // makes piechart show postive numbers
      table.push({ value, category });
    }

    this.setState({
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
