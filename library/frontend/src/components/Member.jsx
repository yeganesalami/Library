import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { deactiveMember } from "../actions/members";
import { renewMember } from "../actions/members";

import Createmember from "./CreateMember";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  Button,
  IconButton,
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

import { Close, Refresh } from "@material-ui/icons";

class Member extends Component {
  state = {
    id: "",
    memberId: "",
    firstName: "",
    lastName: "",
    memberDate: "",
    expirationDate: "",
    month: "3",
    openDialog: false,
    openRenew: false
  };

  handleClickOpenDeactive = data => {
    this.setState({
      openDialog: true,
      id: data.id,
      memberId: data.memberId,
      firstName: data.firstName,
      lastName: data.lastName,
      memberDate: data.memberDate,
      expirationDate: data.expirationDate
    });
  };

  handleDeactive = () => {
    this.props.deactiveMember(
      this.state.id,
      this.state.memberId,
      this.state.firstName,
      this.state.lastName,
      this.state.memberDate,
      this.state.expirationDate
    );
    this.setState({ openDialog: false });
  };

  handleclickOpenRenew = data => {
    this.setState({
      openRenew: true,
      id: data.id,
      memberId: data.memberId,
      firstName: data.firstName,
      lastName: data.lastName,
      memberDate: data.memberDate,
      expirationDate: data.expirationDate
    });
  };

  handleRenew = () => {
    this.props.renewMember(
      this.state.id,
      this.state.memberId,
      this.state.firstName,
      this.state.lastName,
      this.state.memberDate,
      this.state.expirationDate,
      this.state.month
    );
    this.setState({ openRenew: false });
  };

  handleClose = () => {
    this.setState({ openDialog: false, openRenew: false });
  };

  render() {
    return [
      <Createmember />,
      <Paper
        style={{
          marginLeft: 120,
          marginRight: 120,
          marginTop: 20,
          padding: 50
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="body2" gutterBottom>
                  Member Id
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" gutterBottom>
                  First-Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" gutterBottom>
                  Last Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" gutterBottom>
                  Member Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" gutterBottom>
                  Expiration Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" gutterBottom>
                  Active
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" gutterBottom>
                  Renew
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.members.map((member, id) => (
              <TableRow key={`book_${id}`}>
                <TableCell>{member.memberId}</TableCell>
                <TableCell>{member.firstName}</TableCell>
                <TableCell>{member.lastName}</TableCell>
                <TableCell>{member.memberDate}</TableCell>
                <TableCell>{member.expirationDate}</TableCell>
                <TableCell>
                  {moment(member.expirationDate).isAfter(Date()) ? (
                    <IconButton
                      variant="contained"
                      color="secondary"
                      // onClick={() => this.props.deactiveMember(member)}
                      onClick={() => this.handleClickOpenDeactive(member)}
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  ) : (
                    <Button disabled>deactive</Button>
                  )}
                </TableCell>
                <TableCell>
                  {moment(member.expirationDate).isAfter(Date()) ? (
                    <IconButton disabled>
                      <Refresh fontSize="small" />
                    </IconButton>
                  ) : (
                    <IconButton
                      variant="contained"
                      color="primary"
                      onClick={() => this.handleclickOpenRenew(member)}
                    >
                      <Refresh fontSize="small" />
                    </IconButton>
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
        <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure You Want To <b>Deactive</b> Member?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleDeactive} color="primary" autoFocus>
            Deactive
          </Button>
        </DialogActions>
      </Dialog>,
      <Dialog
        open={this.state.openRenew}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Renew"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please select Membership Date
            <FormControl fullWidth>
              <InputLabel htmlFor="monthId">Month</InputLabel>
              <Select
                required
                value={this.state.month}
                onChange={e => this.setState({ month: e.target.value })}
                inputProps={{
                  name: "month",
                  id: "monthId"
                }}
              >
                <MenuItem value={"3"}>3 Month</MenuItem>
                <MenuItem value={"6"}>6 month</MenuItem>
                <MenuItem value={"12"}>12 Month</MenuItem>
              </Select>
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleRenew} color="primary" autoFocus>
            Active
          </Button>
        </DialogActions>
      </Dialog>
    ];
  }
}

const mapStateToProps = state => {
  return {
    members: state.members
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deactiveMember: (
      id,
      memberId,
      firstName,
      lastName,
      memberDate,
      expirationDate
    ) => {
      return dispatch(
        deactiveMember(
          id,
          memberId,
          firstName,
          lastName,
          memberDate,
          expirationDate
        )
      );
    },
    renewMember: (
      id,
      memberId,
      firstName,
      lastName,
      memberDate,
      expirationDate,
      month
    ) => {
      return dispatch(
        renewMember(
          id,
          memberId,
          firstName,
          lastName,
          memberDate,
          expirationDate,
          month
        )
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Member);
