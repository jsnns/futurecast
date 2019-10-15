import gql from "graphql-tag";
import { auth } from "../../routes";
import client from "../../client";

async function createUserReport(name) {
	if (!name) return;

	const createDefaultReportMutation = gql`
		mutation MyMutation {
			__typename
			insert_user_reports(objects: {reportByReport: {data: {name: "${name}"}}, user: "${auth.user_id}"}) {
				returning {
					id
				}
			}
		}
	`;

	const result = await client.mutate({
		mutation: createDefaultReportMutation
	});

	return result;
}

export default createUserReport;
