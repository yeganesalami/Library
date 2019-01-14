import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  Toolbar,
  TableEditColumn,
  SearchPanel,
  PagingPanel
} from "@devexpress/dx-react-grid-material-ui";
import {
  EditingState,
  SearchState,
  IntegratedFiltering,
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging
} from "@devexpress/dx-react-grid";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";

import { authors } from "../../actions";

class AuthorDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      open: "",
      columns: [
        { name: "name", title: "Name" },
        { name: "gender", title: "Gender" },
        { name: "birthday", title: "Birthday" },
        { name: "born", title: "Born" },
        { name: "kind", title: "Kind" },
        { name: "description", title: "Description" }
      ]
    };

    this.commitChanges = this.commitChanges.bind(this);
  }

  commitChanges({ deleted }) {
    let rows = this.props.authors;

    if (deleted) {
      const deletedSet = new Set(deleted);
      rows = rows.filter(row => deletedSet.has(row.id));
      let rowId = rows[0].id;
      this.setState({ id: rowId });
      this.handleClickOpen();
    }
  }

  handleDelete = () => {
    this.props.deleteAuthor(this.state.id);
    this.setState({ open: false });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { columns } = this.state;
    return [
      <Grid columns={columns} rows={this.props.authors}>
        <SearchState />
        <IntegratedFiltering />
        <SortingState />
        <IntegratedSorting />
        <PagingState defaultCurrentPage={0} pageSize={5} />
        <IntegratedPaging />
        <EditingState onCommitChanges={this.commitChanges} />
        <Table />
        <TableHeaderRow showSortingControls />
        <TableEditRow />
        <TableEditColumn showDeleteCommand />
        <PagingPanel />
        <Toolbar />
        <SearchPanel />
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
