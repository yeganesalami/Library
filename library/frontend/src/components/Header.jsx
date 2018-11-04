import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Library
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-item nav-link active" to="/books">
              Books <span className="sr-only">(current)</span>
            </Link>
            <Link className="nav-item nav-link" to="/authors">
              Authors
            </Link>
            <a className="nav-item nav-link disabled" href="">
              Search
            </a>
          </div>
        </div>
      </nav>
    );
  }
}
