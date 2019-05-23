import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import Report from "../Report";

class AuthenticatedRoute extends Component {
  login() {
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    if (isAuthenticated()) {
      return <div>{this.props.children}</div>;
    }

    return (
      <div className="container">
        <h4>
          You are not logged in! Please Log In to continue.
          <button style={{ cursor: "pointer" }} onClick={this.login.bind(this)}>
            Log In
          </button>
        </h4>
      </div>
    );
  }
}

export default AuthenticatedRoute;
