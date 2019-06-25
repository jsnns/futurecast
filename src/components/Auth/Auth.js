import history from "../../history";
import auth0 from "auth0-js";
import { AUTH_CONFIG } from "./auth0-variables";
import { client } from "../../client";
import gql from "graphql-tag";

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: "token id_token",
    scope: "openid"
  });

  constructor() {
    this.user_id = localStorage.getItem("auth0:id_token:sub");
    if (this.user_id) {
      client
      .query({
        query: gql`
        {
          users(where: {id: {_eq: "${this.user_id}"}}) {
             id
          }
        }
      `
      })
      .then(({ data }) => {
        if (data.users.length === 0) { // if the user exists
          return client.mutate({
            mutation: gql`
            mutation {
              insert_users(objects: {id: "${this.user_id}"}) {
                returning {
                  id
                }
              }
            }
          `
          });
        }
      })
      .catch(error => console.log(error));
    }
  }

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace("/");
      } else if (err) {
        history.replace("/");
        console.error(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  };

  setSession = authResult => {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    this.accessToken = authResult.accessToken;
    localStorage.setItem("auth0:access_token", authResult.accessToken);
    localStorage.setItem("auth0:id_token", authResult.idToken);
    localStorage.setItem("auth0:expires_at", expiresAt);
    localStorage.setItem("auth0:id_token:sub", authResult.idTokenPayload.sub);
    // navigate to the home route
    window.location.replace("/");
  };

  logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem("auth0:access_token");
    localStorage.removeItem("auth0:id_token");
    localStorage.removeItem("auth0:expires_at");
    localStorage.removeItem("auth0:id_token:sub");
    // navigate to the home route
    history.replace("/");
  };

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem("auth0:expires_at"));
    return new Date().getTime() < expiresAt;
  }
}
