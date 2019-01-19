import React, { Component } from "react";
import { Button } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

class DeleteBtn extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log(this.handleClick.bind(this));
    console.log();
  }

  render() {
    return (
      <Button
        variant="contained"
        color="secondary"
        onClick={e => this.handleClick( e)}
      >
        <DeleteForeverIcon />
      </Button>
    );
  }
}

export default DeleteBtn;
