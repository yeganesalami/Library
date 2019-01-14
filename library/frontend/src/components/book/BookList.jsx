import React, { Component } from "react";
import { Paper, Typography } from "@material-ui/core";
import BookDataTable from "./BookDataTable";

class BookList extends Component {
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
        <Typography variant="display1" style={{ marginBottom: 40 }}>
          List Of Books
        </Typography>
        <BookDataTable />
      </Paper>
    );
  }
}

export default BookList;
