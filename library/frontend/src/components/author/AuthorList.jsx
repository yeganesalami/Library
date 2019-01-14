import React, { Component } from "react";
import AuthorDataTable from "./AuthorDataTable";
import { Paper } from "@material-ui/core";

class AuthorList extends Component {
  state = {};
  render() {
    return (
      <Paper
        style={{
          marginLeft: 120,
          marginRight: 120,
          marginTop: 20,
          padding: 50
        }}
      >
        <AuthorDataTable />
      </Paper>
    );
  }
}

export default AuthorList;
