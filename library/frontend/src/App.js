import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";

import Header from "../src/components/Header";
import Library from "../src/components/Library";
import Book from "../src/components/Book";
import Author from "../src/components/Author";

import { Provider } from "react-redux";
import { createStore,applyMiddleware  } from "redux";
import library from "./reducers";
import thunk from 'redux-thunk';


let store = createStore(library,applyMiddleware(thunk));

const Layout = props => ({
  render() {
    return [<Header />, <main>{this.props.children}</main>];
  }
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path="/" component={Library} />
              <Route exact path="/books" component={Book} />
              <Route exact path="/authors" component={Author} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
