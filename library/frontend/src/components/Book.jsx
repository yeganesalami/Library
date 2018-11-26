import React, { Component } from "react";
import { connect } from "react-redux";
import { books } from "../actions";
import { TextField, Grid, Table, TableHead, TableRow, TableCell, TableBody, Button, Paper, Typography,Dialog ,DialogTitle,DialogContent,DialogContentText,DialogActions} from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

class Book extends Component {
  state = {
    id: "",
    title: "",
    author: "",
    description: "",
    free: "",
    category: "",
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
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
      <Paper
        style={{
          marginLeft: 120,
          marginRight: 120,
          marginTop: 20,
          padding: 50
        }}
      >
        <form onSubmit={this.submitBook}>
          <Grid container sm={12}>
            <Grid item sm>
              <TextField
                label="Title"
                required
                value={this.state.title}
                onChange={e => this.setState({ title: e.target.value })}
              />
            </Grid>
            <Grid item sm>
              <TextField
                label="Author"
                required
                value={this.state.author}
                onChange={e => this.setState({ author: e.target.value })}
              />
            </Grid>
            <Grid item sm>
              <TextField
                label="Category"
                required
                value={this.state.category}
                onChange={e => this.setState({ category: e.target.value })}
              />
            </Grid>
            <Grid item sm>
              <TextField
                label="Free"
                required
                value={this.state.free}
                onChange={e => this.setState({ free: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container sm={12} style={{ marginTop: 50 }}>
            <Grid item sm={4}>
              <TextField
                label="Description"
                required
                multiline
                rows={4}
                fullWidth
                value={this.state.description}
                onChange={e => this.setState({ description: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container sm={12} style={{ marginTop: 50 }}>
            <Grid item>
              <Button variant="contained" color="primary" type="submit">
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>,
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
                    <Button variant="contained" color="secondary"
                      // onClick={() => this.props.deleteBook(id)}
                      onClick ={this.handleClickOpen}
                    >
                      <DeleteForeverIcon />
                    </Button>
                  ) : null}
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
            <Button onClick={this.handleClose} color="primary" autoFocus>
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
    addBook: (id, title, author, description, free, category) => {
      return dispatch(
        books.addBook(id, title, author, description, free, category)
      );
    },
    deleteBook: id => {
      return dispatch(books.deleteBook(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Book);
