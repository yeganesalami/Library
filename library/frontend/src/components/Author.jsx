import React, { Component } from "react";
import { connect } from "react-redux";
import { authors } from "../actions";

class Author extends Component {
  state = {
    name: "",
    gender: "",
    birthday: "",
    born: "",
    kind: "",
    description: ""
  };

  submitAuthor = (e) => {
    
    e.preventDefault();
    this.props.addAuthor(
      this.state.name,
      this.state.gender,
      this.state.birthday,
      this.state.born,
      this.state.kind,
      this.state.description
    );

    this.setState({
      name: "",
      gender: "",
      birthday: "",
      born: "",
      kind: "",
      description: ""
    });

  };

  render() {
    return [
      <div className="container mt-5">
        <form onSubmit={this.submitAuthor}>
          <div className="form-row">
            <div className="form-group col-3">
              <label>Name</label>
              <input
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group col-3">
              <label>Gender</label>
              <input
                value={this.state.gender}
                onChange={e => this.setState({ gender: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group col-3">
              <label>Birthday</label>
              <input
                value={this.state.birthday}
                onChange={e => this.setState({ birthday: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group col-3">
              <label>Born</label>
              <input
                value={this.state.born}
                onChange={e => this.setState({ born: e.target.value })}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-2">
              <label>Kind</label>
              <input
                value={this.state.kind}
                onChange={e => this.setState({ kind: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group col-10">
              <label>Description</label>
              <input
                value={this.state.description}
                onChange={e => this.setState({ description: e.target.value })}
                type="textarea"
                row="4"
                className="form-control"
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
              <th>Name</th>
              <th>Gender</th>
              <th>Birthday</th>
              <th>Born</th>
              <th>Kind</th>
              <th>Description</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.authors.map((author, id) => (
              <tr key={`author_${id}`}>
                <td />
                <td>{author.name}</td>
                <td>{author.gender}</td>
                <td>{author.birthday}</td>
                <td>{author.born}</td>
                <td>{author.kind}</td>
                <td>{author.description}</td>
                <td>
                  <button
                    onClick={() => this.props.deleteAuthor(id)}
                    className="btn btn-outline-danger btn-small"
                  >
                    <i className="fa fa-trash-o" aria-hidden="true" />
                  </button>
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
    authors: state.authors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addAuthor: (name, gender, birthday, born, kind, description) => {
      dispatch(
        authors.addAuthor(name, gender, birthday, born, kind, description)
      );
    },
    deleteAuthor: id => {
      dispatch(authors.deleteAuthor(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Author);
