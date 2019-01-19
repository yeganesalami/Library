import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import MemberDataTable from "./MemberDataTable";

class MemberList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Paper
        style={{
          marginLeft: 70,
          marginRight: 70,
          marginTop: 20,
          padding: 50
        }}
      >
        <MemberDataTable/>
      </Paper>
    );
  }
}

export default MemberList;
