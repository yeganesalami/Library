import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@material-ui/core";

export default class Header extends Component {
  state = {};
  render() {
    return (
      <AppBar>
        <Toolbar>
          <Button color="primary">
            <Link to="/" style={{ color: "white" }}>
              Library
            </Link>
          </Button>
          <Button color="primary">
            <Link to="/books" style={{ color: "white" }}>
              Books
            </Link>
          </Button>
          <Button color="primary">
            <Link to="/authors" style={{ color: "white" }}>
              Authors
            </Link>
          </Button>
          {/* <Typography variant="title" color="inherit">
            <a href="" style={{color:"white"}}>Search </a>
          </Typography> */}
        </Toolbar>
      </AppBar>
    );
  }
}
