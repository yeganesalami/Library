import React, { Component } from "react";
import { connect } from "react-redux";
import { books } from "../actions";

class Book extends Component {
  state = {
    title: "",
    author: "",
    description: "",
    free: "",
    category: ""
  };

  submitBook = e => {
    e.preventDefault();
    this.props.addBook(
      this.state.title,
      this.state.author,
      this.state.description,
      this.state.free,
      this.state.category,
      console.log(
        "submitBook() | title: ",
        this.state.title,
        "author: ",
        this.state.author,
        "description: ",
        this.state.description,
        "free: ",
        this.state.free,
        "category: ",
        this.state.category
      )
    );

    this.setState({
      title: "",
      author: "",
      description: "",
      free: "",
      category: ""
    });
  };

  handlerClick() {
    console.log("clicked");
  }

  render() {
    return [
      <div className="container mt-5">
        <form onSubmit={this.submitBook}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Title</label>
              <input
                className="form-control"
                value={this.state.title}
                onChange={e => this.setState({ title: e.target.value })}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Author</label>
              <input
                className="form-control"
                value={this.state.author}
                onChange={e => this.setState({ author: e.target.value })}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label>Description</label>
              <input
                className="form-control"
                value={this.state.description}
                onChange={e => this.setState({ description: e.target.value })}
              />
            </div>
            <div className="form-group col-md-4">
              <label>Free</label>
              <input
                className="form-control"
                value={this.state.free}
                onChange={e => this.setState({ free: e.target.value })}
              />
            </div>
            <div className="form-group col-md-4">
              <label>Category</label>
              <input
                className="form-control"
                value={this.state.category}
                onChange={e => this.setState({ category: e.target.value })}
              />
            </div>
          </div>
          <div className="form-row">
            <button type="submit" className="btn btn-success btn-small">
              <i className="fa fa-plus" aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>,
      <div className="container mt-5">
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
      </div>
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
    addBook: (title, author, description, free, category) => {
      return dispatch(
        books.addBook(title, author, description, free, category)
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
