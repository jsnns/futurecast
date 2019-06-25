import gql from "graphql-tag";

export default{
  query: gql`
    subscription {
      wishes {
        id
        name
        price
        category
        owner
        usefulness
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
}