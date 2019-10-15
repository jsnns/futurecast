import React, {useState} from "react";
import gql from "graphql-tag";
import {auth} from "../../routes";
import { Subscription } from "react-apollo";
import {NavDropdown} from "react-bootstrap";
import createUserReport from "../../data/helpers/createUserReport";
import { Add } from "@material-ui/icons"
import { Box } from "grommet";


const DropdownUserReports = () => {
	const getUserReportsQuery = gql`
	subscription {
		users(where:{id: {_eq:"${auth.user_id}"}}) {
			user_reports {
				id
				reportByReport {
					name
				}
			}
		}
	}
	`;

	const [selectedReport, setSelectedReport] = useState(null);

	const selectReport = report => {
		if (report === "new") {
			const newReportName = prompt("New Report Name:");
			createUserReport(newReportName);
		} else {
			window.localStorage.setItem("session:user_report", report);
			window.location.reload();
		}
	}

	return (
		<Subscription subscription={getUserReportsQuery}>
			{({data, error, loading}) => {
				if (loading) return <div />
				if (error) {
					console.error(error);
					return <div />
				}

				if (data.users.length !== 1) {
					return <div />
				}

				const reports = data.users[0].user_reports;

				if (reports.length < 1) {
					createUserReport("Default");
					return <div />
				}

				if (!selectedReport) {
					const savedReportId = window.localStorage.getItem("session:user_report");
					const savedReport = reports.filter(report => report.id === savedReportId)

					if (savedReport.length === 1) {
						setSelectedReport(savedReportId)
					} else {
						setSelectedReport(data.users[0].user_reports[0].id)
					}

					return <div />
				}

				const selectedReportDetails = reports.filter(report => report.id === selectedReport)[0];

				return (
					<NavDropdown selected={selectedReport} title={`Report: ${selectedReportDetails.reportByReport.name || ""}`} id="nav-dropdown" onSelect={selectReport}>

						{reports.map(report =>
							<NavDropdown.Item eventKey={report.id}>
								{report.reportByReport.name}
							</NavDropdown.Item>
						)}

						<NavDropdown.Divider />

						<NavDropdown.Item eventKey="new">
							<Box direction="row">
								<Add fontSize="small" style={{marginTop: "auto", marginBottom: "auto", marginLeft: "-5px", paddingLeft: 0}} />
								<p style={{marginTop: "auto", marginBottom: "auto"}}>New Report</p>
							</Box>
						</NavDropdown.Item>

					</NavDropdown>
				)
			}}
		</Subscription>
	);
}

export default DropdownUserReports;
