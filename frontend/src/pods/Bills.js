import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import {
  Box,
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
  Text,
  RangeInput
} from "grommet";

const GET_TRANSACTIONS = gql`
  {
    sansbury_money_transactions {
      id
      category
      value
      start
      end
      interval_days
      interval_months
    }
  }
`;

function numberWithCommas(x) {
  const isNegative = x < 0;
  const sign = isNegative ? "$ -" : "$ ";
  x = Math.abs(x);
  return sign + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getInstances(days) {
  return transaction => {
    const endDate = new Date();
    const today = new Date();
    endDate.setDate(endDate.getDate() + days);
    const instances = [];

    let date = new Date(transaction.start);
    while (true) {
      if (date > endDate) break;
      if (date > new Date(transaction.end) && transaction.end) break;

      if (date > today) {
        // make sure we don't include instances from before today
        instances.push({ ...transaction, date: new Date(date) });
      }

      date.setDate(date.getDate() + transaction.interval_days);
      date.setMonth(date.getMonth() + transaction.interval_months);
    }

    return instances;
  };
}

const BillsTable = () => {
  return (
    <Box>
      <Box pad="small">
        <Text>Number of Days</Text>
        <Box pad="small">
          <RangeInput
            min={14}
            max={50}
            value={14}
            onChange={e => this.getData(e.target.value)}
          />
        </Box>
      </Box>
      <Box pad="small" fill>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <Query query={GET_TRANSACTIONS}>
              {({ loading, error, data }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;

                return data.sansbury_money_transactions
                  .flatMap(getInstances(10))
                  .map(transaction => {
                    return (
                      <TableRow key={transaction.name + transaction.date}>
                        <TableCell component="th" scope="row">
                          {transaction.name}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ fontFamily: "monospace", fontSize: 16 }}
                        >
                          <Text
                            color={
                              transaction.value < 0
                                ? "status-critical"
                                : "status-ok"
                            }
                          >
                            {numberWithCommas(transaction.value)}
                          </Text>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {transaction.date.toDateString()}
                        </TableCell>
                      </TableRow>
                    );
                  });
              }}
            </Query>
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default BillsTable;
