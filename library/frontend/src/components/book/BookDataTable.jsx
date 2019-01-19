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

import { books } from "../../actions";
import { styleConfig } from "../layout/DataTableStyles";

class BookDataTable extends Component {
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
    let book = this.props.books[index];
    this.props.deleteBook(book.id);
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
    const getCellAction = array => {
      let index = array.griddleKey;
      let book = this.props.books[index];
      console.log(book);
      let btn =
        book.free === "free" ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.handleClickOpen(array)}
          >
            <DeleteForeverIcon />
          </Button>
        ) : (
          <Button variant="contained" color="secondary" disabled>
            <DeleteForeverIcon />
          </Button>
        );
      return btn;
    };

    const { currentPage, pageSize } = this.state;

    const data = this.props.books;

    return [
      <Griddle
        data={data}
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
          <ColumnDefinition id="title" title="Title" />
          <ColumnDefinition id="author" title="Author" />
          <ColumnDefinition id="category" title="Category" />
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
    books: state.books
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteBook: id => {
      return dispatch(books.deleteBook(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookDataTable);
