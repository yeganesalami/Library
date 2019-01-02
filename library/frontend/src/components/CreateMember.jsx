import React, { Component } from "react";
import { TextField, Grid, Button, Paper,  FormControl,InputLabel,Select,MenuItem } from "@material-ui/core";
import { connect } from "react-redux";
import { members } from "../actions";

class Createmember extends Component {
  state = {
    id: "",
    memberId: "",
    firstName: "",
    lastName: "",
    memberDate: "",
    expirationDate: "",
    month:"3"
  };

  submitMember = e => {
    e.preventDefault();
    this.props.addMember(
      this.state.id,
      this.state.memberId,
      this.state.firstName,
      this.state.lastName,
      this.state.memberDate,
      this.state.expirationDate,
      this.state.month
    );

    this.setState({
      id: "",
      memberId: "",
      firstName: "",
      lastName: "",
      memberDate: "",
      expirationDate: ""
    });

  };

  render() {
    return (
      <Paper
        style={{
          marginLeft: 120,
          marginRight: 120,
          marginTop: 20,
          padding: 50
        }}
      >
        <form onSubmit={this.submitMember}>
          <Grid container>
            <Grid item sm={4}>
              <TextField
                label="Member ID"
                required
                value={this.state.memberId}
                onChange={e => this.setState({ memberId: e.target.value })}
              />
            </Grid>
            <Grid item sm={4}>
              <TextField
                label="First Name"
                required
                value={this.state.firstName}
                onChange={e => this.setState({ firstName: e.target.value })}
              />
            </Grid>
            <Grid item sm={4}>
              <TextField
                label="Last Name"
                required
                value={this.state.lastName}
                onChange={e => this.setState({ lastName: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: 10 }}>
            <Grid item sm={4}>
              <TextField
                label="Member Date"
                required
                type="date"
                format={"YYYY-MM-DD"}
                InputLabelProps={{
                  shrink: true
                }}
                value={this.state.memberDate}
                onChange={e => this.setState({ memberDate: e.target.value })}
              />
            </Grid>
            <Grid item sm={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="monthId">Duration</InputLabel>
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
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: 10 }}>
            <Grid item>
              <Button variant="contained" color="primary" type="submit">
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMember: (
      id,
      memberId,
      firstName,
      lastName,
      memberDate,
      expirationDate,
      month
    ) => {
      return dispatch(
        members.addMember(
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
  null,
  mapDispatchToProps
)(Createmember);
