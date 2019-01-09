import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { borrowBook } from "../../actions/books";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  Typography,
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
    let optionMember = this.state.members.map(member => {
      member.expirationDate > moment().format("YYYY-MM-DD") ? (
        <MenuItem value={member.id}>{member.memberId}</MenuItem>
      ) :
      null
    });
    return [
      <Paper
        style={{
          marginLeft: 120,
          marginRight: 120,
          marginTop: 20,
          padding: 50
        }}
      >
        {/* <SearchBar
          onChange={() => console.log("onChange")}
          onRequestSearch={() => console.log("onRequestSearch")}
          style={{
            margin: "0 auto",
            maxWidth: 800
          }}
        /> */}
        
        {/* <Search/> */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="title" gutterBottom>
                  Title
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="title" gutterBottom>
                  Author
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="title" gutterBottom>
                  Category
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="title" gutterBottom>
                  Description
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="caption" gutterBottom>
                  Borrow Book
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.books.map((book, id) => (
              <TableRow key={`book_${id}`}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>{book.description}</TableCell>
                <TableCell>
                  {book.free === "free" ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => this.handleClickOpenDialog(book)}
                    >
                      <NavigationIcon />
                    </Button>
                  ) : (
                    <Button variant="contained" color="primary" disabled>
                      <NavigationIcon />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>,
      <Dialog
        open={this.state.openDialog}
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
)(Library);
