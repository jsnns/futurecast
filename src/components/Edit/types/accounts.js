import gql from "graphql-tag";

export default {
	query: gql`
      subscription {
			user_reports(where: {id: {_eq: "${window.localStorage.getItem('session:user_report')}"}}) {
				reportByReport {
					accounts {
						id
						name
						balance
					}
				}
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
};