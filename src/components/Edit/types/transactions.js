import gql from "graphql-tag";

export default {
  query: gql`
      subscription {
          transactions(where: {category: {_neq: "once"}}) {
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

  query_once: gql`
      subscription {
          transactions(where: {category: {_eq: "once"}}) {
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
      header: "Name",
      property: "name"
    },
    {
      header: "Value",
      property: "value"
    },
    {
      header: "Category",
      property: "category"
    }
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
      property: "start"
    },
    {
      name: "End Date",
      property: "end"
    },
    {
      name: "Interval Months",
      property: "interval_months"
    },
    {
      name: "Interval Days",
      property: "interval_days"
    }
  ]
};