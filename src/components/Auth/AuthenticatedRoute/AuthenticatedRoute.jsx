import React, { Component } from "react";
import { Box, Button, Heading } from "grommet";

class AuthenticatedRoute extends Component {
	render() {
		const { isAuthenticated } = this.props.auth;

		if (isAuthenticated()) {
			return <div>{this.props.children}</div>;
		}

		return (
			<Box pad={"large"} fill="horizontal">
				<Box direction="row-responsive" fill="horizontal">
					<Heading level={1} margin={{ bottom: "none" }}>
						Futurecast
					</Heading>
					<Box width="small" margin={{left: "auto", bottom: "auto", top: "auto"}}>
						<Button
							primary
							label={"Login"}
							onClick={this.login}
						/>
					</Box>
				</Box>
				<Box fill>
					<Heading level={4}>
						Welcome to Futurecast. Please login to continue.
					</Heading>
				</Box>
			</Box>
		);
	}

	login = () => this.props.auth.login();
}

export default AuthenticatedRoute;
