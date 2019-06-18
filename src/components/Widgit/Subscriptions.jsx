import React, { Component } from "react";
import {Box, DataTable, Tab, Meter, Text} from "grommet";
import gql from "graphql-tag";
import PieWithTable from "../shared/PieWithTable";
import {colors} from "../../constants";
import {getKey, sortAscendingByKey, sortDecendingByKey, normalizeArray, sumArray, toCurrency} from "../../data/helpers";
import { valueScore } from "../../data/logic";
import {client} from "../../routes";

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
    state = {data: null, valueAnalysisData: null, saved: null, parsedData: null};

    render = () => {
        let { valueAnalysisData, saved, parsedData} = this.state;

        if (!valueAnalysisData || !saved || !parsedData) return <div/>;

        return <Box flex={"grow"}>
            <PieWithTable
                pieData={parsedData.pie}
                tableData={parsedData.table}
                tabs={[
                    <Tab title="Value Analysis">
                        If you remove the bottom 30% you will save {toCurrency(saved.toFixed(2))}
                        /mo.
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
                                    property: 'relative_value',
                                    render: datum => (
                                        <Box pad={{ vertical: 'xsmall' }}>
                                            <Meter
                                                values={[{ value: datum.relative_value * 100 }]}
                                                thickness="small"
                                                size="small"
                                            />
                                        </Box>
                                    ),
                                }
                            ]}
                            data={valueAnalysisData}
                        />
                    </Tab>
                ]}
            />
        </Box>
    };

    componentWillMount = () => {
        client.query({query: GET_SUBSCRIPTIONS})
            .then(({data}) => {
                if (data) {
                    let parsedData = this.buildPieData(data.subscriptions);
                    let valueAnalysisData = data.subscriptions.map(sub => {
                        if (sub.yearly === true) {
                            sub.price /= 12;
                        }
                        sub.relative_value = valueScore(1, sub.price, sub.usefulness);

                        return sub;
                    });

                    valueAnalysisData = sortDecendingByKey(
                        normalizeArray(
                            valueAnalysisData,
                            "relative_value"
                        ),
                        "relative_value"
                    );

                    let saved = sumArray(
                        getKey(
                            valueAnalysisData.filter(sub => {
                                return sub.relative_value <= .30;
                            }),
                            "price"
                        )
                    );
                    this.setState({data, valueAnalysisData, saved, parsedData});
                }
            })
    };

    buildPieData = subscriptions => {
        let labels = [];
        let values = [];
        let table = [];
        let categories = {};

        for (let i in subscriptions) {
            let sub = subscriptions[i];
            if (!categories.hasOwnProperty(sub.category)) {
                categories[sub.category] = 0;
            }

            categories[sub.category] += Number(sub.price)
        }

        categories = Object.keys(categories)
            .map(key => ({value: categories[key], category: key}));
        categories = sortAscendingByKey(categories, "value");

        for (let i in categories) {
            if(categories.hasOwnProperty(i)) {
                let { value, category } = categories[i];
                value = value.toFixed(2);
                labels.push(category);
                values.push(value);
                table.push({category, value})
            }
        }

        return {
            pie: {
                labels,
                datasets: [
                    {
                        data: values,
                        backgroundColor: colors,
                        borderWidth: 0
                    }
                ]
            },
            table
        }
    }
}

export default Subscriptions