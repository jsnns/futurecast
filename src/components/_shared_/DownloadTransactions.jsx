import { Box, Button } from "grommet/es6";
import { Download } from "grommet-icons/es6";
import React from "react";
import gql from "graphql-tag";
import { client } from "../../client";
import { getInstancesArray } from "../../data/logic";
import _ from "lodash";
import { appendCsvFileType, createCsvFromData } from "../../data/helpers";

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

      transactions = getInstancesArray(transactions, 60);
      transactions = _(transactions).sortBy("date").value();

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

const DownloadTransactions = () => {
  return <Box
    direction="row"
    style={{ position: "fixed", right: 25, bottom: 25, zIndex: 1000 }}
  >
    <Button
      onClick={downloadTransactions}
      icon={<Download/>}
      primary
      style={{ borderRadius: 1 }}
    />
  </Box>
};

export default DownloadTransactions