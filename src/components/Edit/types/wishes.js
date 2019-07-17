import gql from "graphql-tag";

export default {
    query: gql`
        subscription {
            wishes {
                id
                name
                price
                category
                owner
                usefulness
                durability
            }
        }
    `,

    columns: [
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
            header: "Impact",
            property: "usefulness"
        },
        {
            header: "Durability",
            property: "durability"
        }
    ],

    fields: [
        {
            name: "Price",
            property: "price"
        },
        {
            name: "Category",
            property: "category"
        },
        {
            name: "Impact",
            property: "usefulness"
        },
        {
            name: "Durability",
            property: "durability"
        }
    ]
};