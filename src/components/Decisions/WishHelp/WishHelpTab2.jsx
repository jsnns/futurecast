import React, { Component } from 'react';
import { DataTable } from 'grommet';
import gql from "graphql-tag";
import { Subscription } from "react-apollo";
import { Dialog } from "../../shared/Dialog";

const GET_SUBSCRIPTIONS = gql`
    subscription {
        wishes_help_item {
            id
            owner
            category
        }
    }
`;

class WishHelpTab2 extends Component {
    render() {
        return (
            <Subscription subscription={GET_SUBSCRIPTIONS}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;

                    return <DataTable
                        primaryKey={"id"}
                        sortable={true}
                        columns={[
                            {
                                header: "category",
                                property: "category"
                            }
                        ]}
                        data={data.wishes_help_item}
                    />;
                }}
            </Subscription>
        )
    }
}

export default WishHelpTab2;