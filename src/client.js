import ApolloClient from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { getMainDefinition } from "apollo-utilities";

import { GRAPHQL_URL, GRAPHQL_URL_WS } from "./constants";

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
        authorization: `Bearer ${localStorage.getItem("auth0:id_token")}`
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
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("auth0:id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

export const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache({
    addTypename: false
  })
});

export default client;