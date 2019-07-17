import React, {Component} from 'react';
import gql from "graphql-tag";
import {Query} from "react-apollo";
import {Box, DataTable, Meter, Select, Text} from "grommet";
import Currency from "../../_shared_/Currency";
import {valueScore} from "../../../data/logic";
import _ from "lodash";

class Wishes extends Component {
    query = gql`
        {
            wishes {
                id
                name
                price
                usefulness
                category
                durability
            }
        }
    `;

    state = {category: null};

    render() {
        return (
            <Box>
                <Query query={this.query}>
                    {({error, loading, data}) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error! ${error.message}`;

                        let categories = data.wishes.reduce((categories, wish) => {
                            if (categories.indexOf(wish.category) === -1) {
                                categories.push(wish.category)
                            }
                            return categories;
                        }, []);

                        categories = _(categories).sort().value();

                        if (this.state.category) {
                            data.wishes = data.wishes.filter(wish => wish.category === this.state.category);
                        }

                        // score wishes after removing category to normalize against the category
                        let wishes = this.parseWishes(data.wishes);

                        return <Box>
                            <Select options={categories}
                                    onChange={e => this.setState({category: e.value})}
                                    value={this.state.category || ""}
                            />
                            <DataTable
                                primaryKey={"id"}
                                columns={[
                                    {
                                        header: "Name",
                                        property: "name"
                                    },
                                    {
                                        header: "Price",
                                        render: datum => <Currency value={datum.price}/>
                                    },
                                    {
                                        header: "Value",
                                        property: "relative_value",
                                        render: datum => (
                                            <Box pad={{vertical: "xsmall"}} direction={"row"} gap={"small"}>
                                                <Meter
                                                    margin={"xsmall"}
                                                    values={[{value: datum.relative_value * 100}]}
                                                    thickness="small"
                                                    size="small"
                                                />
                                                <Text>
                                                    {datum.relative_value.toFixed(2) * 100}%
                                                </Text>
                                            </Box>
                                        )
                                    }
                                ]}
                                data={wishes}
                            />
                        </Box>
                    }}
                </Query>
            </Box>
        );
    }

    parseWishes(wishes) {
        let scoreWish = wish => valueScore(wish.durability, wish.price, wish.usefulness);

        return _(wishes)
            .setKey("relative_value", scoreWish)
            .normalizeOn("relative_value")
            .sortBy(["relative_value"])
            .reverse()
            .value();
    }
}

export default Wishes;