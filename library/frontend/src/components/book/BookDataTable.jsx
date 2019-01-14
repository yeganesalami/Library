import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn
} from "@devexpress/dx-react-grid-material-ui";
import { EditingState } from "@devexpress/dx-react-grid";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";

import { books } from "../../actions";

const getRowId = row => row.id;

class BookDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      open: "",
      columns: [
        { name: "title", title: "Title" },
        { name: "author", title: "Author" },
        { name: "category", title: "Category" },
        { name: "description", title: "Description" }
      ]
    };

    this.commitChanges = this.commitChanges.bind(this);
  }

  commitChanges({ deleted }) {
    let rows = this.props.books;

    if (deleted) {
      const deletedSet = new Set(deleted);
      rows = rows.filter(row => deletedSet.has(row.id));
      let rowId = rows[0].id;
      this.setState({ id: rowId });
      this.handleClickOpen();
    }
  }

  handleDelete = () => {
    this.props.deleteBook(this.state.id);
    this.setState({ open: false });
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { columns } = this.state;
    return [
      <Grid columns={columns} rows={this.props.books} getRowId={getRowId}>
        <EditingState onCommitChanges={this.commitChanges} />
        <Table />
        <TableHeaderRow />
        <TableEditRow />
        <TableEditColumn showDeleteCommand />
      </Grid>,
      <Dialog open={this.state.open} onClose={this.handleClose}>
        <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure You Want To Delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.handleClose}
            color="secondary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={this.handleDelete}
            color="primary"
            variant="contained"
          >
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
