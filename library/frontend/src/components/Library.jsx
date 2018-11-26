import React, { Component } from "react";
import { connect } from "react-redux";
import { borrowBook } from "../actions/books";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Paper, Typography } from "@material-ui/core";
import NavigationIcon from '@material-ui/icons/Navigation';


class Library extends Component {
  state = {
    title: "",
    author: "",
    description: "",
    free: "",
    category: ""
  };

  render() {
    return (
      <Paper style={{
        marginLeft: 120,
        marginRight: 120,
        marginTop: 20,
        padding: 50
      }}>
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
                  {book.free === "true" ? (
                    <Button color="primary" onClick={() => this.props.borrowBook(book)}>
                      <NavigationIcon />
                    </Button>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.books
  };
};

const mapDispatchToProps = dispatch => {
  return {
    borrowBook: book => {
      return dispatch(
        borrowBook(
          book.id,
          book.title,
          book.author,
          book.description,
          book.free,
          book.category
        )
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library);
