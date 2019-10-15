import React from "react";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import {Box, ResponsiveContext} from "grommet";

import {getInstancesArray} from "../../data/logic";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from 'moment'

import "../../styles/calendar.scss";

const localizer = momentLocalizer(moment);

const GET_TRANSACTIONS = gql`
query {
	user_reports(where: {id: {_eq: "${window.localStorage.getItem('session:user_report')}"}}) {
		  reportByReport {
				transactions {
					category
            	name
					value
					start
					end
					interval_days
					interval_months
				}
		  }
	 }
}
`;

const Bills = () => {
    return (
        <Box>
            <Query query={GET_TRANSACTIONS}>
                {({loading, error, data}) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;

                    let {transactions} = data.user_reports[0].reportByReport;

						  let instances = getInstancesArray(transactions, 45, 35);

                    transactions = instances
                        .sort((a, b) => {
                            if (a.date > b.date) return 1;
                            if (b.date > a.date) return -1;
                            if (a.value > b.value) return -1;
                            if (b.value > a.value) return 1;
                            return 0;
                        });

                    const events = transactions.map(tx => ({
                        start: tx.date,
                        title: `${tx.name} ${tx.value}`,
                        end: tx.date
                    }));

                    return <ResponsiveContext.Consumer>
                        {(size) => <Calendar
                            style={{minHeight: 800}}
                            localizer={localizer}
                            views={["month", "agenda"]}
                            defaultView={size === "small" ? "agenda" : "month"}
                            defaultDate={new Date()}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                        />}
                    </ResponsiveContext.Consumer>
                }}
            </Query>
        </Box>
    );
};

export default Bills;
