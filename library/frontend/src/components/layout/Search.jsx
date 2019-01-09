import React, { Component } from "react";

import {TextField} from "@material-ui/core";

class Search extends Component {
  render() {
    return (
      <TextField
        onChange={() => console.log("onchange")}
        placeholder="Search"
        label="Search"
        className="mb-5 float-right"
        variant="filled"
      />
    );
  }
}

export default Search;