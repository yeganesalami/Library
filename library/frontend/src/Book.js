import React, { Component } from 'react';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';


class Book extends React.Component {
  render() {
    return (
      <div>
        list of books
      </div>
    );
  }
}
export default class Books extends Component {
    render() {
        return (
            <Book />
        )
    }
}
