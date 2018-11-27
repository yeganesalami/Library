import React, { Component } from "react";
import { connect } from "react-redux";
import { books } from "../actions";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CreateBook from "./CreateBook";

class Book extends Component {
  state = {
    id: "",
    title: "",
    author: "",
    description: "",
    free: "",
    category: "",
    open: false
  };

  handleClickOpen = id => {
    this.setState({ open: true });
    let ID = id;
    console.log("opened", ID);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  submitBook = e => {
    e.preventDefault();
    this.props.addBook(
      this.state.id,
      this.state.title,
      this.state.author,
      this.state.description,
      this.state.free,
      this.state.category
    );

    this.setState({
      id: "",
      title: "",
      author: "",
      description: "",
      free: "",
      category: ""
    });
  };

  render() {
    return [
      <CreateBook />,
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
              <TableCell>
                <Typography variant="title" gutterBottom>
                  Title
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="title" gutterBottom>
                  Author
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="title" gutterBottom>
                  Category
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="title" gutterBottom>
                  Description
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="caption" gutterBottom>
                  Delete Book
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.books.map((book, id) => (
              <TableRow key={`book_${id}`}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>{book.description}</TableCell>
                <TableCell>
                  {book.free === "true" ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      // onClick={() => this.props.deleteBook(id)}
                      onClick={() => this.handleClickOpen(id)}
                    >
                      <DeleteForeverIcon />
                    </Button>
                  ) : (
                    <Button variant="contained" color="secondary" disabled>
                      <DeleteForeverIcon />
                    </Button>
                  )}
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
            Are you Sure You Want To Delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button
            // onClick={() => this.props.deleteBook(ID)}
            color="primary"
            autoFocus
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
    books: state.books,
    authors: state.authors
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
)(Book);
