import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";

import Header from "../src/components/Header";
import Library from "../src/components/Library";
import Book from "../src/components/Book";
import Author from "../src/components/Author";
import Member from "../src/components/Member";

import { connect } from "react-redux";
import { books, authors,members } from "./actions";
// import members from "./reducers/members";

const Layout = () => ({
  render() {
    return [
      <Header />,
      <main style={{ marginTop: 100 }}>{this.props.children}</main>
    ];
  }
});

class App extends Component {
  componentDidMount() {
    this.props.fetchBooks();
    this.props.fetchAuthors();
    this.props.fetchMembers();
  }
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Library} />
            <Route exact path="/books" component={Book} />
            <Route exact path="/authors" component={Author} />
            <Route exact path="/members" component={Member} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBooks: () => {
      dispatch(books.fetchBooks());
    },
    fetchAuthors: () => {
      dispatch(authors.fetchAuthors());
    },
    fetchMembers: () => {
      dispatch(members.fetchMembers());
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
