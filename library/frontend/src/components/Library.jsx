import React, { Component } from "react";
import { connect } from "react-redux";

class Library extends Component {
  state = {
    title: "",
    author: "",
    description: "",
    free: "",
    category: ""
  };

  handlerClick() {
    console.log("clicked");
  }

  render() {
    return (
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
              <tr key={`book_${id}`}>
                <td />
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.description}</td>
                <td>
                  {book.free === "true" ? (
                    <button
                      onClick={this.handlerClick}
                      className="btn btn-outline-success btn-small"
                    >
                      <i className="fa fa-hand-o-up" tooltip="borrow"/>
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.books
  };
};

export default connect(mapStateToProps)(Library);