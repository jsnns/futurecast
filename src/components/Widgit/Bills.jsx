import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Box, Button, DataTable, Text } from "grommet";
import { Download } from "grommet-icons";

import { getInstancesArray } from "../../data/logic";
import { sortAscendingByKey } from "../../data/helpers/array";
import { toCurrency } from "../../data/helpers/format";

import { client } from "../../client";
import { appendCsvFileType, createCsvFromData } from "../../data/helpers";
import _ from "lodash";

const GET_TRANSACTIONS = gql`
    {
        transactions {
            category
            name
            value
            start
            end
            interval_days
            interval_months
        }
    }
`;

const downloadTransactions = () => {
  client
    .query({ query: GET_TRANSACTIONS })
    .then(({ data }) => {
      let { transactions } = data;

      transactions = sortAscendingByKey(
        getInstancesArray(transactions, 60),
        "date"
      );
      const transactionsCsv = appendCsvFileType(
        createCsvFromData(transactions)
      );

      let link = document.createElement("a");
      link.setAttribute("href", transactionsCsv);
      link.setAttribute("download", "transactions.csv");
      link.click();
      link.remove(); // clean up the DOM
    });
};

const BillsTable = () => {
  return (
    <Box>
      <Box
        direction="row"
        style={{ position: "fixed", right: 25, bottom: 25 }}
      >
        <Button
          onClick={downloadTransactions}
          icon={<Download/>}
          primary
          style={{ borderRadius: 1 }}
        />
      </Box>
      <Box fill>
        <Query query={GET_TRANSACTIONS}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            let { transactions } = data;

            transactions = _(getInstancesArray(transactions, 45))
              .sortBy(["date", "value"])
              .value();

            return (
              <Box>
                <DataTable
                  primaryKey={"key"}
                  columns={[
                    {
                      property: "name",
                      header: "Name"
                    },
                    {
                      property: "value",
                      header: "Value",
                      render: datum => (
                        <Text
                          color={datum.value > 0 ? "status-ok" : "status-critical"}
                          style={{ fontFamily: "Roboto Mono" }}
                        >
                          {toCurrency(datum.value)}
                        </Text>
                      )
                    },
                    {
                      property: "date",
                      header: "Date",
                      sortable: true,
                      render: datum => <Text>
                        {new Date(datum.date).toDateString()}
                      </Text>
                    }
                  ]}
                  data={transactions}
                />
              </Box>
            );
          }}
        </Query>
      </Box>
    </Box>
  );
};

export default BillsTable;
