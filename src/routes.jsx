import React from "react";
import {Route, Router} from "react-router-dom";
import {ApolloProvider} from "react-apollo";
import {Grommet, Box} from "grommet";

import AuthenticatedRoute from "./components/Auth/AuthenticatedRoute/AuthenticatedRoute";
import Callback from "./components/Auth/Callback/Callback";
import Report from "./Report";
import history from "./history";
import Auth from "./components/Auth/Auth";
import Edit from "./components/Edit/Edit";
import Profile from "./components/Profile/Profile";
import Decisions from "./components/Decisions/Decisions";
import client from "./client";

export const auth = new Auth();

const authenticatedRoute = component => {
    return <AuthenticatedRoute auth={auth}>{component}</AuthenticatedRoute>;
};

const provideClient = component => {
    return <ApolloProvider client={client}>{component}</ApolloProvider>;
};

const handleAuthentication = ({location}) => {
    if (/access_token|id_token|error/.test(location.hash)) {
        auth.handleAuthentication();
    }
};

export const makeMainRoutes = () => {
    return (
        <Router history={history}>
            <Grommet
                theme={{
                    global: {colors: {brand: "#000"}, font: {family: "Lato"}}
                }}
            >
                <Box background={"dark-1"} style={{minHeight: "100vh"}}>
                    <Route
                        exact
                        path="/"
                        render={() => authenticatedRoute(provideClient(<Report/>))}
                    />
                    <Route
                        path="/edit"
                        render={() => authenticatedRoute(provideClient(<Edit/>))}
                    />
                    <Route
                        path="/profile"
                        render={() => authenticatedRoute(provideClient(<Profile/>))}
                    />
                    <Route
                        path="/decisions"
                        render={() => authenticatedRoute(provideClient(<Decisions/>))}
                    />
                    <Route
                        path="/callback"
                        render={props => {
                            handleAuthentication(props);
                            return <Callback {...props} />;
                        }}
                    />
                </Box>
            </Grommet>
        </Router>
    );
};
