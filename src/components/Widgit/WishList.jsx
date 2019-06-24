import React, { Component } from "react";
import { Box, DataTable, Meter } from "grommet";
import gql from "graphql-tag";
import PieWithTable from "../shared/PieWithTable";
import { colors } from "../../constants";
import { valueScore } from "../../data/logic";
import { client } from "../../apollo";
import _ from "lodash";
const GET_WISHS = gql`
    {
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

class Wishlist extends Component {
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
                    <DataTable
                        primaryKey={"id"}
                        columns={[
                            {
                                property: "relative_value",
                                render: datum => (
                                    <Box pad={{ vertical: "xsmall" }}>
                                        <Meter
                                            values={[{ value: datum.relative_value * 100 }]}
                                            thickness="small"
                                            size="small"
                                        />
                                    </Box>
                                )
                            }
                        ]}
                        data={valueTableData}
                    />

                ]}
            />
        </Box>;
    };

    componentWillMount = () => {
        client.query({ query: GET_WISHS }).then(({ data }) => {
            if (data) {
                this.setState(this.parseData(data.wishes));
            }
        });
    };

    parseData = wishes => {

        // key is a category name, value is the sum of transactions with that category
        let data = _.chain(wishes)
            .reduce((result, wishes) => {
                if (!result[wishes.category]) result[wishes.category] = 0;

                result[wishes.category] += wishes.price;
                return result;
            }, {})
            .mapValues(value => value.toFixed(2))
            .toPairs()
            .map(([key, value]) => ({ value: Number(value), category: key }))
            .sortBy(["value"])
            .value();

        let scoreWishes = s => valueScore(s.yearly ? 12 : 1, s.price, s.usefulness);

        let valueTableData = _(wishes)
            .setKey("relative_value", scoreWishes)
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

export default Wishlist; 