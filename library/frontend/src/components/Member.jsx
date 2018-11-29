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
  IconButton
} from "@material-ui/core";

import { Close, Refresh } from "@material-ui/icons";

class Member extends Component {
  state = {
    id: "",
    memberId: "",
    firstName: "",
    lastName: "",
    memberDate: "",
    expirationDate: ""
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
                      onClick={() => this.props.deactiveMember(member)}
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
                      onClick={() => this.props.renewMember(member)}
                    >
                      <Refresh fontSize="small" />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
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
    deactiveMember: member => {
      return dispatch(
        deactiveMember(
          member.id,
          member.memberId,
          member.firstName,
          member.lastName,
          member.memberDate,
          member.expirationDate
        )
      );
    },
    renewMember: member => {
      return dispatch(
        renewMember(
          member.id,
          member.memberId,
          member.firstName,
          member.lastName,
          member.memberDate,
          member.expirationDate
        )
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Member);
