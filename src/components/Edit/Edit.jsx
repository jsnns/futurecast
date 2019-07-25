import React from "react";

import { Box } from "grommet";

import DashboardWidget from "../_shared_/DashboardWidget";
import EditGraphql from "./EditGraphql";
import Header from "../_shared_/Header";

import accounts from "./types/accounts";
import transactions from "./types/transactions";
import subscriptions from "./types/subscriptions";


const Edit = () => (
  <Box>
    <Header />
    <Box direction="row-responsive">
      <DashboardWidget title="Transactions" basis="1/2">
          <EditGraphql
              table="transactions"
              subscription={transactions.query}
              columns={transactions.columns}
              fields={transactions.fields}
          />
          <EditGraphql
              table="transactions"
              subscription={transactions.query_once}
              columns={transactions.columns}
              fields={transactions.fields}
          />
      </DashboardWidget>
        <DashboardWidget title="Accounts" basis="1/2">
        <EditGraphql
          table="accounts"
          subscription={accounts.query}
          columns={accounts.columns}
          fields={accounts.fields}
        />
      </DashboardWidget>
    </Box>
    <Box direction="row-responsive">
      <DashboardWidget title="Subscriptions" basis={"1/2"}>
        <EditGraphql
          table="subscriptions"
          subscription={subscriptions.query}
          columns={subscriptions.columns}
          fields={subscriptions.fields}
        />
      </DashboardWidget>
    </Box>
  </Box>
);

export default Edit;
