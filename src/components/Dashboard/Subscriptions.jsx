import React, {Component} from "react";
import {Box, DataTable, Meter, Tab, Text} from "grommet";
import gql from "graphql-tag";
import PieWithTable from "../_shared_/PieWithTable";
import {colors} from "../../constants";
import {valueScore} from "../../data/logic";
import {client} from "../../client";
import {toCurrency} from "../../data/helpers";
import _ from "lodash";

const GET_SUBSCRIPTIONS = gql`
    {
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

class Subscriptions extends Component {
    state = {
        totalSaved: 0,
        valueTableData: [],
        table: [],
        pie: {}
    };

    render = () => {
        let {
            totalSaved,
            valueTableData,
            table,
            pie
        } = this.state;

        return <Box>
            <PieWithTable
                pieData={pie}
                tableData={table}
                tabs={[
                    <Tab key={"value-analysis-tab-subs"} title="Value Analysis">
                        <Text margin={{top: "medium", bottom: "medium"}}>
                            If you remove the bottom 30% you will save {toCurrency(totalSaved)}/mo.
                        </Text>
                        <DataTable
                            primaryKey={"id"}
                            columns={[
                                {
                                    header: "Name",
                                    property: "name"
                                },
                                {
                                    header: "Value",
                                    render: datum => <Text>
                                        {(datum.relative_value * 100).toFixed(2)}%
                                    </Text>
                                },
                                {
                                    header: "Value",
                                    property: "relative_value",
                                    render: datum => (
                                        <Box pad={{vertical: "xsmall"}}>
                                            <Meter
                                                values={[{value: datum.relative_value * 100}]}
                                                thickness="small"
                                                size="small"
                                            />
                                        </Box>
                                    )
                                }
                            ]}
                            data={valueTableData}
                        />
                    </Tab>
                ]}
            />
        </Box>;
    };

    componentWillMount = () => {
        client.query({query: GET_SUBSCRIPTIONS}).then(({data}) => {
            if (data) {
                this.setState(this.parseData(data.subscriptions));
            }
        });
    };

    parseData = subscriptions => {

        // key is a category name, value is the sum of transactions with that category
        const reduceByCategory = (result, subscription) => {
            if (!result[subscription.category]) result[subscription.category] = 0;

            result[subscription.category] += subscription.price;
            return result;
        };

        let data = _.chain(subscriptions)
            .reduce(reduceByCategory, {})
            .mapValues(value => value.toFixed(2))
            .toPairs()
            .map(([key, value]) => ({value: Number(value), category: key}))
            .sortBy(["value"])
            .value();

        let scoreSubscription = s => valueScore(s.yearly ? 12 : 1, s.price, s.usefulness);

        let valueTableData = _(subscriptions)
            .setKey("relative_value", scoreSubscription)
            .normalizeOn("relative_value")
            .sortBy(["relative_value"])
            .reverse()
            .value();

        let totalSaved = _(valueTableData)
            .filter(sub => sub.relative_value <= .30)
            .sumBy("price");

        return {
            totalSaved,
            valueTableData,
            table: data,
            pie: {
                labels: _(data).map("category").value(),
                datasets: [
                    {
                        data: _(data).map("value").value(),
                        backgroundColor: colors,
                        borderWidth: 0
                    }
                ]
            }
        };
    };
}

export default Subscriptions;