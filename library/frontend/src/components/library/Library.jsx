import React, { Component } from "react";
import { connect } from "react-redux";
import { borrowBook } from "../../actions/books";
import {
  Paper,
} from "@material-ui/core";
import LibraryDataTable from "./LibraryDataTable";

class Library extends Component {
  state = {
    title: "",
    author: "",
    description: "",
    free: "",
    category: "",
    book: "",
    member: "",
    members: "",
    openDialog: false
  };

  constructor() {
    super();
    this.state = { members: [] };
  }

  componentDidMount() {
    let initialMembers = [];
    fetch("/api/members/")
      .then(res => {
        return res.json();
      })
      .then(data => {
        initialMembers = data.map(member => {
          return member;
        });
        this.setState({
          members: initialMembers
        });
      });
  }

  handleClickOpenDialog = data => {
    this.setState({
      openDialog: true,
      book: data
    });
  };

  handleBorrow = () => {
    this.props.borrowBook(this.state.book, this.state.member);
    this.setState({ openDialog: false });
  };

  handleClose = () => {
    this.setState({ openDialog: false });
  };

  render() {
    // let optionMember = this.state.members.map(member => {
    //   member.expirationDate > moment().format("YYYY-MM-DD") ? (
    //     <MenuItem value={member.id}>{member.memberId}</MenuItem>
    //   ) : null;
    // });
    return (
      <Paper
        style={{
          marginLeft: 120,
          marginRight: 120,
          marginTop: 20,
          padding: 50
        }}
      >
        <LibraryDataTable />
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.books
  };
};

const mapDispatchToProps = dispatch => {
  return {
    borrowBook: (book, member) => {
      return dispatch(borrowBook(book, member));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library);
