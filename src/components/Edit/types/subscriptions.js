import gql from "graphql-tag";

export default {
  query: gql`
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
      header: "Price",
      property: "price"
    },
    {
      header: "Usefulness",
      property: "usefulness"
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
      name: "Usefulness",
      property: "usefulness"
    }
  ]
};