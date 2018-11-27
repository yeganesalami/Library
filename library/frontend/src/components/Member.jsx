import React, { Component } from "react";
import { connect } from "react-redux";
import Createmember from "./CreateMember";
import { member } from "../actions";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  Button
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

class Member extends Component {
  state = {
    id: "",
    memberId: "",
    firstName: "",
    lastName: "",
    membarDate: "",
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
                  Membar Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" gutterBottom>
                  Expiration Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" gutterBottom>
                  Delete
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
                <TableCell>{member.membarDate}</TableCell>
                <TableCell>{member.expirationDate}</TableCell>
                <TableCell>
                  {member.membarDate === Date.now() ? (
                    <Button variant="contained" color="secondary">
                      <DeleteForeverIcon />
                    </Button>
                  ) : (
                    <Button variant="contained" color="secondary" disabled>
                      <DeleteForeverIcon />
                    </Button>
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

export default connect(
  mapStateToProps,
  null
)(Member);
