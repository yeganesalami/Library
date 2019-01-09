import React, { Component } from "react";
import { connect } from "react-redux";
import { authors } from "../../actions";

import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

class AuthorList extends Component {
  state = {
    id: "",
    name: "",
    gender: "",
    birthday: "",
    born: "",
    kind: "",
    description: "",
    open: false
  };

  handleClickOpen = data => {
    this.setState({
      open: true,
      id: data.id,
      name: data.name,
      gender: data.gender,
      birthday: data.birthday,
      born: data.born,
      kind: data.kind,
      description: data.description
    });
  };

  handleDelete = () => {
    this.props.deleteAuthor(this.state.id);
    this.setState({ open: false });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return [
      <Paper
        style={{
          marginLeft: 120,
          marginRight: 120,
          marginTop: 20,
          padding: 50
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Birthday</TableCell>
              <TableCell>Born</TableCell>
              <TableCell>Kind</TableCell>
              <TableCell>Description</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.authors.map((author, id) => (
              <TableRow key={`author_${id}`}>
                <TableCell />
                <TableCell>{author.name}</TableCell>
                <TableCell>{author.gender}</TableCell>
                <TableCell>{author.birthday}</TableCell>
                <TableCell>{author.born}</TableCell>
                <TableCell>{author.kind}</TableCell>
                <TableCell>{author.description}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => this.handleClickOpen(author)}
                  >
                    <DeleteForeverIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>,
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
          <Button onClick={this.handleClose} variant="contained" color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleDelete} variant="contained" color="secondary">
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
)(AuthorList);
