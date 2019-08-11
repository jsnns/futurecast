import gql from "graphql-tag";

export default {
    query: gql`
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
    `,

    columns: [
        {
            header: "Category",
            property: "category"
        },
        {
            header: "Name",
            property: "name"
        },
        {
            header: "Value",
            property: "value"
        },
    ],

    fields: [
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
            property: "start",
            type: "date"
        },
        {
            name: "End Date",
            property: "end",
            type: "date"
        },
        {
            name: "Repeat Every (days)",
            property: "interval_days"
        },
        {
            name: "Repeat Every (months)",
            property: "interval_months"
        },
    ]
};