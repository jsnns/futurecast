import React from 'react';
import { Route, Router } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';

import AuthenticatedRoute from './components/Auth/AuthenticatedRoute/AuthenticatedRoute';
import Callback from './components/Auth/Callback/Callback';
import Report from './Report';
import history from './history';
import Auth from './components/Auth/Auth';
import Edit from './components/Edit/Edit';

import { GRAPHQL_URL, GRAPHQL_URL_WS } from './constants/constants';

// Create an http link:
const httpLink = new HttpLink({
	uri: GRAPHQL_URL
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
	uri: GRAPHQL_URL_WS,
	options: {
		reconnect: true,
		connectionParams: {
			headers: {
				authorization: `Bearer ${localStorage.getItem('auth0:id_token')}`
			}
		}
	}
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
	// split based on operation type
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
		);
	},
	wsLink,
	httpLink
);

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('auth0:id_token');
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
	};
});

export const client = new ApolloClient({
	link: authLink.concat(link),
	cache: new InMemoryCache({
		addTypename: false
	})
});

export const auth = new Auth();

const authenticatedRoute = component => {
	return <AuthenticatedRoute auth={auth}>{component}</AuthenticatedRoute>;
};

const provideClient = component => {
	return <ApolloProvider client={client}>{component}</ApolloProvider>;
};

const handleAuthentication = ({ location }) => {
	if (/access_token|id_token|error/.test(location.hash)) {
		auth.handleAuthentication();
	}
};

export const makeMainRoutes = () => {
	return (
		<Router history={history}>
			<div className='container'>
				<Route
					path='/'
					exact
					render={props => authenticatedRoute(provideClient(<Report />))}
				/>
				<Route
					path='/edit'
					render={props => authenticatedRoute(provideClient(<Edit />))}
				/>
				<Route
					path='/callback'
					render={props => {
						handleAuthentication(props);
						return <Callback {...props} />;
					}}
				/>
				<Route
					path='/.well-known/acme-challenge/Gz_hCrD-yunbtUIW2rH7uUSx4X7TGp5X7CNsCdrIs_A'
					component={
						<div>
							Gz_hCrD-yunbtUIW2rH7uUSx4X7TGp5X7CNsCdrIs_A.cmV9109GjaSCIVFng4sXKHOdSXRv5KVA1rF8LZ4OGq0
						</div>
					}
				/>
			</div>
		</Router>
	);
};