import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";

import Header from "../src/components/Header";
import Library from "../src/components/Library";
import Book from "../src/components/Book";
import Author from "../src/components/Author";

import { connect } from "react-redux";
import { books } from "./actions";


const Layout = () => ({
  render() {
    return [<Header />, <main>{this.props.children}</main>];
  }
});

class App extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Library} />
            <Route exact path="/books" component={Book} />
            <Route exact path="/authors" component={Author} />
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
    }
  };
};

export default connect(null,mapDispatchToProps)(App);
