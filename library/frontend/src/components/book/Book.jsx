import React, { Component } from "react";

import CreateBook from "./CreateBook";
import BookList from "./BookList";

class Book extends Component {


  render() {
    return [
      <CreateBook />,
      <BookList/>
    ];
  }
}

export default Book;