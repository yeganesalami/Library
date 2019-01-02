import React, { Component } from "react";
import { connect } from "react-redux";
import { borrowBook } from "../actions/books";
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
import NavigationIcon from "@material-ui/icons/Navigation";

class Library extends Component {
  state = {
    title: "",
    author: "",
    description: "",
    free: "",
    category: "",
    openDialog:false
  };

  handleClickOpenDialog = data =>{
    this.setState({
      openDialog:true,
      id: data.id,
      title: data.title,
      author: data.author,
      description:data.description,
      free: data.free,
      category:data.category
    })
  };

  handleBorrow = () =>{
    this.props.borrowBook(
      this.state.id,
      this.state.title,
      this.state.author,
      this.state.description,
      this.state.free,
      this.state.category
    );
    this.setState({openDialog:false});
  }

  handleClose = () => {
    this.setState({ openDialog: false });
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
                  Borrow Book
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
                  {book.free === "free" ? (
                    <Button
                      color="primary"
                      onClick={()=>this.handleClickOpenDialog(book)}
                    >
                      <NavigationIcon />
                    </Button>
                  ) : (
                    <Button color="primary" disabled>
                      <NavigationIcon />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>,
      <Dialog
        open={this.state.openDialog}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Borrow This Book For 15 Days?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleBorrow} color="primary" autoFocus>
            Borrow
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
    borrowBook: (id,title,author,description,free,category) => {
      return dispatch(
        borrowBook(
          id,
          title,
          author,
          description,
          free,
          category
        )
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library);
