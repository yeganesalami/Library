import React, { Component } from "react";
import { connect } from "react-redux";
import Griddle, {
  RowDefinition,
  ColumnDefinition,
  plugins
} from "griddle-react";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { styleConfig } from "../layout/DataTableStyles";
import { authors } from "../../actions";

class AuthorDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pageSize: 5,
      index: "",
      open: ""
    };
  }

  handleDelete = () => {
    this.setState({ open: false });
    let index = this.state.index;
    let author = this.props.authors[index];
    this.props.deleteAuthor(author.id);
  };

  handleClickOpen = array => {
    this.setState({
      open: true,
      index: array.griddleKey
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { currentPage, pageSize } = this.state;

    const getCellAction = array => {
      let index = array.griddleKey;
      let author = this.props.authors[index];
      let btn = (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => this.handleClickOpen(array)}
        >
          <DeleteForeverIcon />
        </Button>
      );
      return btn;
    };

    return [
      <Griddle
        data={this.props.authors}
        plugins={[plugins.LocalPlugin]}
        components={{
          SettingsToggle: () => <span />
        }}
        styleConfig={styleConfig}
        pageProperties={{
          currentPage,
          pageSize
        }}
      >
        <RowDefinition>
          <ColumnDefinition id="name" title="Name" />
          <ColumnDefinition id="gender" title="Gender" />
          <ColumnDefinition id="birthday" title="Birthday" />
          <ColumnDefinition id="born" title="Born" />
          <ColumnDefinition id="kind" title="Kind" />
          <ColumnDefinition id="description" title="Description" />
          <ColumnDefinition
            id="action"
            title=" "
            customComponent={getCellAction}
          />
        </RowDefinition>
      </Griddle>,
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure You Want To Delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    ];
  }
}

const mapStateToProps = state => {
  return {
    authors: state.authors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteAuthor: id => {
      return dispatch(authors.deleteAuthor(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorDataTable);
