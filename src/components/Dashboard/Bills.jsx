import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Box, DataTable } from "grommet";

import Currency from "../_shared_/Currency";
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

          transactions = instances
            .sort((a, b) => {
              if (a.date > b.date) return 1;
              if (b.date > a.date) return -1;
              if (a.value > b.value) return -1;
              if (b.value > a.value) return 1;
              return 0;
            });

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
                render: datum => <Currency
                  value={datum.value}
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
