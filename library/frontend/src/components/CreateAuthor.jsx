import React, { Component } from "react";
import { connect } from "react-redux";
import { authors } from "../actions";
import {
  Button,
  TextField,
  Paper,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@material-ui/core";

class CreateAuthor extends Component {
  state = {
    id: "",
    name: "",
    gender: "",
    birthday: "",
    born: "",
    kind: "",
    description: ""
  };

  submitAuthor = e => {
    e.preventDefault();
    this.props.addAuthor(
      this.state.id,
      this.state.name,
      this.state.gender,
      this.state.birthday,
      this.state.born,
      this.state.kind,
      this.state.description
    );

    this.setState({
      id: "",
      name: "",
      gender: "",
      birthday: "",
      born: "",
      kind: "",
      description: ""
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
        <form onSubmit={this.submitAuthor}>
          <Grid container>
            <Grid item sm>
              <TextField
                label="Name"
                required
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
              />
            </Grid>
            <Grid item sm>
              <FormControl style={{ width: 200 }}>
                <InputLabel htmlFor="gender">Gender</InputLabel>
                <Select
                  label="Gender"
                  required
                  value={this.state.gender}
                  onChange={e => this.setState({ gender: e.target.value })}
                  inputProps={{
                    name: "gender",
                    id: "ganderId"
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Male"}>Male</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm>
              <TextField
                label="Birthday"
                required
                type="date"
                format={"YYYY-MM-DD"}
                InputLabelProps={{
                  shrink: true
                }}
                value={this.state.birthday}
                onChange={e => this.setState({ birthday: e.target.value })}
              />
            </Grid>
            <Grid item sm>
              <TextField
                label="Born"
                required
                value={this.state.born}
                onChange={e => this.setState({ born: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container sm={12} style={{ marginTop: 20 }}>
            <Grid item sm={3}>
              <TextField
                label="Kind"
                required
                value={this.state.kind}
                onChange={e => this.setState({ kind: e.target.value })}
              />
            </Grid>
            <Grid item sm={3}>
              <TextField
                label="Description"
                required
                value={this.state.description}
                onChange={e => this.setState({ description: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container sm={12} style={{ marginTop: 20 }}>
            <Grid item sm>
              <Button variant="contained" color="primary" type="submit">
                ADD
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    authors: state.authors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addAuthor: (id, name, gender, birthday, born, kind, description) => {
      return dispatch(
        authors.addAuthor(id, name, gender, birthday, born, kind, description)
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAuthor);
