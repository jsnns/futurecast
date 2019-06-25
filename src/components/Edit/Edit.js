import React, { Component } from "react";

import { Box } from "grommet";

import DashboardWidget from "../shared/DashboardWidget";
import EditGraphql from "./EditGraphql";
import gql from "graphql-tag";
import Header from "../shared/Header";

const TRANSACTION_SUB = gql`
    subscription {
        transactions {
            id
            value
            name
            start
            end
            category
            interval_days
            interval_months
        }
    }
`;

const SUBSCRIPTIONS_SUB = gql`
    subscription {
        subscriptions {
            id
            name
            price
            category
            yearly
            owner
            usefulness
        }
    }
`;

const ACCOUNTS_SUB = gql`
    subscription {
        accounts {
            id
            name
            balance
        }
    }
`;

const WISHES_SUB = gql`
    subscription {
        wishes {
            id
            name
            price
            category
            owner
            usefulness
        }
    }
`;



class Edit extends Component {
  state = {
    txs: [],
    schedule: {},
    accounts: [],
    edit: 0
  };

  changeSchedule(key, interval) {
    if (interval) {
      return value => {
        const { selected } = this.state;
        if (!selected.schedule.interval) selected.schedule.interval = {};

        selected.schedule.interval[key] = Number(value.target.value);
        this.setState({ selected });
      };
    }
    return value => {
      const { selected } = this.state;
      if (!selected.schedule) selected.schedule = {};
      selected.schedule[key] = value;
      this.setState({ selected });
    };
  }

  render() {
    const { selected } = this.state;

    if (selected) {
      if (!selected.schedule) {
        selected.schedule = {};
      }
      if (!selected.schedule.start) {
        selected.schedule.start = 0;
      }
    }

    return (
      <Box>
        <Header />
        <Box direction="row-responsive">
          <DashboardWidget title="Transactions" basis="1/2">
            <EditGraphql
              subscription={TRANSACTION_SUB}
              table="transactions"
              columns={[
                {
                  header: "Name",
                  property: "name"
                },
                {
                  header: "Value",
                  property: "value"
                },
                {
                  header: "Category",
                  property: "category"
                }
              ]}
              fields={[
                {
                  name: "Name",
                  property: "name"
                },
                {
                  name: "Value",
                  property: "value"
                },
                {
                  name: "Category",
                  property: "category"
                },
                {
                  name: "Start Date",
                  property: "start"
                },
                {
                  name: "End Date",
                  property: "end"
                },
                {
                  name: "Interval Months",
                  property: "interval_months"
                },
                {
                  name: "Interval Days",
                  property: "interval_days"
                }
              ]}/>
          </DashboardWidget>
          <DashboardWidget title="Accounts" basis="1/2">
            <EditGraphql
              subscription={ACCOUNTS_SUB}
              table="accounts"
              columns={[
                {
                  header: "Name",
                  property: "name"
                },
                {
                  header: "Balance",
                  property: "balance"
                }
              ]}
              fields={[
                {
                  name: "Balance",
                  property: "balance"
                }
              ]}
            />
          </DashboardWidget>
        </Box>
        <Box direction="row-responsive">
          <DashboardWidget title="Subscriptions" basis={"1/2"}>
            <EditGraphql
              subscription={SUBSCRIPTIONS_SUB}
              table="subscriptions"
              columns={[
                {
                  header: "Name",
                  property: "name"
                },
                {
                  header: "Price",
                  property: "price"
                },
                {
                  header: "Category",
                  property: "category"
                },
                {
                  header: "Usefulness",
                  property: "usefulness"
                }]}
              fields={[
                {
                  name: "Price",
                  property: "price"
                },
                {
                  name: "Category",
                  property: "category"
                },
                {
                  name: "Usefulness",
                  property: "usefulness"
                }
              ]}
            />
          </DashboardWidget>
          <DashboardWidget title="Wishes" basis={"1/2"}>
            <EditGraphql
              subscription={WISHES_SUB}
              table="wishes"
              columns={[
                {
                  header: "Name",
                  property: "name"
                },
                {
                  header: "Price",
                  property: "price"
                },
                {
                  header: "Category",
                  property: "category"
                },
                {
                  header: "Usefulness",
                  property: "usefulness"
                }]}
              fields={[
                {
                  name: "Price",
                  property: "price"
                },
                {
                  name: "Category",
                  property: "category"
                },
                {
                  name: "Usefulness",
                  property: "usefulness"
                }
              ]}
            />
          </DashboardWidget>
        </Box>
      </Box>
    );
  }
}

export default Edit;
