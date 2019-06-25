import React, { Component } from "react";
import Header from "../_shared_/Header";
import { Box } from "grommet";
import gql from "graphql-tag";
import { auth } from "../../routes";
import { Query } from "react-apollo";

class Profile extends Component {
  QUERY = gql`{
      users(where: {id: {_eq: "${auth.user_id}"}}) {
          email
          id
      }
  }`;

  render() {
    return (
      <Box>
        <Header/>
        <Box>
          <Query query={this.QUERY}>
            {({ data, loading }) => {
              if (loading) return "Loading...";

              let user = data.users[0];

              return <Box>{user.id}</Box>;
            }}
          </Query>
        </Box>
      </Box>
    );
  }
}

export default Profile;
