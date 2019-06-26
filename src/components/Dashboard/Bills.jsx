import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Box, DataTable } from "grommet";
import _ from "lodash";

import RedOrGreen from "../_shared_/RedOrGreen";
import { getInstancesArray } from "../../data/logic";
import { toCurrency } from "../../data/helpers";

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

const Bills = () => {
  return (
    <Box fill>
      <Query query={GET_TRANSACTIONS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          let { transactions } = data;
          let instances = getInstancesArray(transactions, 45);

          transactions = _(instances)
            .sortBy(["date", "value"])
            .value();

          return <DataTable
            data={transactions}
            primaryKey={"key"}
            columns={[
              {
                property: "name",
                header: "Name"
              },
              {
                property: "value",
                header: "Value",
                render: datum => <RedOrGreen
                  red={datum.value < 0}
                  value={toCurrency(datum.value)}
                />
              },
              {
                property: "date",
                header: "Date",
                sortable: true,
                render: datum => new Date(datum.date).toDateString()
              }
            ]}
          />;
        }}
      </Query>
    </Box>
  );
};

export default Bills;
