import React, { Component } from 'react';
import { Select, Box, DataTable } from 'grommet';
import gql from "graphql-tag";
import { Subscription } from "react-apollo";
import _ from "lodash";

const GET_SUBSCRIPTIONS = gql`
    subscription {
        wishes_help_category {
            name
        }
    }
`;

const getData = categoryName => gql`
{
    wishes_help_category(where:{name:{_eq:"${categoryName}"}}) {
      name
      items{
        name
        price
        usefulness 
        durability
      }
    }
  }`


class WishHelpTab2 extends Component {
    state = {
        selectedCatagory: null
    }
    render() {
        return (
            <Box>
                <Subscription subscription={GET_SUBSCRIPTIONS}>
                    {({ loading, error, data }) => {
                        if (loading) return "Loading...";
                        if (error) return `Error! ${error.message}`;

                        const categories = _(data.wishes_help_category)
                            .map('name')
                            .value()

                        return <Select
                            options={categories}
                            value={this.state.selectedCatagory}
                            onChange={({ option }) => this.setState({ selectedCatagory: option })}
                        />;
                    }}
                </Subscription>
                selectedCatagory is {this.state.selectedCatagory}
                {this.state.selectedCatagory &&
                    <Subscription subscription={getData(this.state.selectedCatagory)}>
                        {({ loading, error, data }) => {
                            if (loading) return "Loading...";
                            if (error) return `Error! ${error.message}`;

                            return <DataTable
                                primaryKey={"id"}
                                sortable={true}
                                columns={[
                                    {
                                        header: 'Names',
                                        property: 'name'
                                    },
                                    {
                                        header: 'Price',
                                        property: 'price'
                                    },
                                    {
                                        header: 'usefulness',
                                        property: 'usefulness'
                                    },
                                    {
                                        header: 'durability',
                                        property: 'durability'
                                    }
                                ]}
                                data={data.wishes_help_category[0].items}
                            />
                        }}
                    </Subscription>
                }
            </Box>
        )
    }
}

export default WishHelpTab2;