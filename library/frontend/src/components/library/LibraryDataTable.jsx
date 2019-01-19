import React, { Component } from "react";
import moment from "moment";
import Griddle, {
  RowDefinition,
  ColumnDefinition,
  plugins
} from "griddle-react";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import NavigationIcon from "@material-ui/icons/Navigation";

import { borrowBook } from "../../actions/books";

import { styleConfig } from "../layout/DataTableStyles";

class LibraryDataTable extends Component {
  state = {
    members: ""
  };

  constructor() {
    super();
    this.state = {
      currentPage: 1,
      pageSize: 5,
      open: "",
      members: [],
      member: ""
    };
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
        console.log("initialMembers", initialMembers);
        console.log("this.state.members", this.state.members);
        console.log("this.state.memeber", this.state.member);
        console.log("this.optionMember", this.optionMember);
      });
  }

  handleBorrow = () => {
    this.setState({ open: false });
    let index = this.state.index;
    let book = this.props.books[index];
    this.props.borrowBook(book, this.state.member);
  };

  handleClickOpen = array => {
    this.setState({
      open: true,
      index: array.griddleKey
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    let optionMember = this.state.members.map(member => {
      member.expirationDate > moment().format("YYYY-MM-DD") ? (
        <MenuItem value={member.id}>{member.memberId}</MenuItem>
      ) : null;
    })

    const getCellAction = array => {
      let index = array.griddleKey;
      let book = this.props.books[index];
      let btn =
        book.free === "free" ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.handleClickOpen(array)}
          >
            <NavigationIcon />
          </Button>
        ) : (
          <Button variant="contained" color="primary" disabled>
            <NavigationIcon />
          </Button>
        );
      return btn;
    };

    const { currentPage, pageSize } = this.state;

    let data = this.props.books;

    return [
      <Griddle
        data={data}
        plugins={[plugins.LocalPlugin]}
        components={{
          SettingsToggle: () => <span />
        }}
        styleConfig={styleConfig}
        pageProperties={{
          currentPage,
          pageSize
        }}
      >
        <RowDefinition>
          <ColumnDefinition id="title" title="Title" />
          <ColumnDefinition id="author" title="Author" />
          <ColumnDefinition id="category" title="Category" />
          <ColumnDefinition id="description" title="Description" />
          <ColumnDefinition
            id="action"
            title="Action"
            customComponent={getCellAction}
          />
        </RowDefinition>
      </Griddle>,
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" />
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Who You Want To Borrow This Book For 15 Days?
            <FormControl fullWidth>
              <InputLabel htmlFor="Member">Member</InputLabel>
              <Select
                label="Member"
                required
                value={this.state.member}
                onChange={e => this.setState({ member: e.target.value })}
                inputProps={{
                  name: "member",
                  id: "memberId"
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {optionMember}
              </Select>
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.handleClose}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={this.handleBorrow}
            variant="contained"
            color="primary"
          >
            Borrow
          </Button>
        </DialogActions>
      </Dialog>
    ];
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
)(LibraryDataTable);
