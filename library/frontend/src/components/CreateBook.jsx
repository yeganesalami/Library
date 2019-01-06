import React, { Component } from "react";
import { connect } from "react-redux";
import { books } from "../actions";
import {
  TextField,
  Grid,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";

class CreateBook extends Component {
  state = {
    id: "",
    title: "",
    author: "",
    description: "",
    free: "",
    category: "",
    authors:[]
  };

  constructor(){
    super();
    this.state={authors:[]}
  }

  componentDidMount(){
    let initialAuthor = [];
    fetch('/api/authors/').then(res=>{
      return res.json()
    }).then(data =>{
      initialAuthor = data.map((author)=>{
        return author;
      });
      this.setState({
        authors:initialAuthor,
      });
      console.log(this.state.authors)
    })
  }

  submitBook = e => {
    e.preventDefault();
    this.props.addBook(
      this.state.id,
      this.state.title,
      this.state.author,
      this.state.description,
      this.state.free,
      this.state.category
    );

    this.setState({
      id: "",
      title: "",
      author: "",
      description: "",
      free: "",
      category: ""
    });
  };

  render() {
    let optionAuthor = this.state.authors.map(author => 
      <MenuItem value={author.id}>{author.name}</MenuItem>
    )

    return (
      <Paper
        style={{
          marginLeft: 120,
          marginRight: 120,
          marginTop: 20,
          padding: 50
        }}
      >
        <form onSubmit={this.submitBook}>
          <Grid container>
            <Grid item sm>
              <TextField
                label="Title"
                required
                value={this.state.title}
                onChange={e => this.setState({ title: e.target.value })}
              />
            </Grid>
            <Grid item sm>
              <FormControl style={{ width: 200 }}>
                <InputLabel htmlFor="Author">Author</InputLabel>
                <Select
                  label="Author"
                  required
                  value={this.state.author}
                  onChange={e => this.setState({ author: e.target.value })}
                  inputProps={{
                    name: "author",
                    id: "authorId"
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {optionAuthor}  
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm>
              <TextField
                label="Category"
                required
                value={this.state.category}
                onChange={e => this.setState({ category: e.target.value })}
              />
            </Grid>
            <Grid item sm>
              <FormControl style={{ width: 200 }}>
                <InputLabel htmlFor="status">Status</InputLabel>
                <Select
                  label="status"
                  required
                  value={this.state.free}
                  onChange={e => this.setState({ free: e.target.value })}
                  inputProps={{
                    name: "status",
                    id: "statusId"
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"reserved"}>reserved</MenuItem>
                  <MenuItem value={"borrowed"}>borrowed</MenuItem>
                  <MenuItem value={"free"}>free</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: 50 }}>
            <Grid item sm={4}>
              <TextField
                label="Description"
                required
                multiline
                rows={4}
                fullWidth
                value={this.state.description}
                onChange={e => this.setState({ description: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: 50 }}>
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
    addBook: (id, title, author, description, free, category) => {
      return dispatch(
        books.addBook(id, title, author, description, free, category)
      );
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreateBook);
