import React, {Component} from "react";
import {Box, Button, Heading} from "grommet";

class AuthenticatedRoute extends Component {
    login() {
        this.props.auth.login();
    }

    render() {
        const {isAuthenticated} = this.props.auth;

        if (isAuthenticated()) {
            return <div>{this.props.children}</div>;
        }

        return (
            <Box pad={"large"}>
                <Box>
                    <Heading level={1} margin={{bottom: "none"}}>
                        Futurecast
                    </Heading>
                </Box>
                <Box fill>
                    <Heading level={4}>
                        Welcome to Futurecast. You are not logged in!
                    </Heading>
                    <Heading level={4}>
                        Please login to continue.
                    </Heading>
                </Box>
                <Box>
                    <Button
                        primary
                        label={"Login \\ Create Account"}
                        onClick={this.login.bind(this)}
                    />
                </Box>
            </Box>
        );
    }
}

export default AuthenticatedRoute;
