import React, { Component } from "react";
import books from "../data/books.json";

export default class Library extends Component {

  handlerClick()  {
      console.log("clicked")
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
            {books.map((bookDetails, index) => {
              return (
                <tr>
                  <td scope="row">{bookDetails.id}</td>
                  <td>{bookDetails.title}</td>
                  <td>{bookDetails.author}</td>
                  <td>{bookDetails.category}</td>
                  <td>{bookDetails.description}</td>
                  <td>
                    {bookDetails.free === "false" ? (
                      <button onClick={this.handlerClick} className="btn btn-outline-success btn-small">
                        Borrow
                      </button>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
