import gql from "graphql-tag";

export default{
  query: gql`
    subscription {
      accounts {
        id
        name
        balance
      }
    }
  `,

  columns: [
    {
      header: "Name",
      property: "name"
    },
    {
      header: "Balance",
      property: "balance"
    }
  ],

  fields: [
    {
      name: "Balance",
      property: "balance"
    }
  ]
}