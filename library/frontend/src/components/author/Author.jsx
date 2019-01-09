import React, { Component } from "react";
import CreateAuthor from "./CreateAuthor";
import AuthorList from "./AuthorList";

class Author extends Component {
  render() {
    return [<CreateAuthor />, <AuthorList />];
  }
}

export default Author;
