import React, { Component } from "react";
import { connect } from "react-redux";
import { books } from "../actions";
import { Button, TextField, Paper, Grid } from "@material-ui/core";

class Book extends Component {
  state = {
    id: "",
    title: "",
    author: "",
    description: "",
    free: "",
    category: ""
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
      <Paper
        style={{
          marginLeft: 120,
          marginRight: 120,
          marginTop: 20,
          marginBottom: 20,
          padding: 50
        }}
      >
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Description</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.books.map((book, id) => (
              <tr key={book.id}>
                <td />
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.description}</td>
                <td>
                  {book.free === "true" ? (
                    <button
                      onClick={() => this.props.deleteBook(id)}
                      className="btn btn-outline-danger btn-small"
                    >
                      <i className="fa fa-trash-o" aria-hidden="true" />
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>
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
