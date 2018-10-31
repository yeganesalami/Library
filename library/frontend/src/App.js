import React, { Component } from 'react';
import Header from './components/Header.jsx'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Content />
      </div>
    );
  }
}


class Content extends Component {
  state = {
    title: 'title1',
    author: 'author1',
    category: 'cat1',
    free: 'True'
  }

  freeBookClasses() {
    if (this.state.free === 'False') {
      return 'table-danger'
    }
    if (this.state.free === 'True') {
      return 'table-success'
    }
  }

  render() {
    return (
      <div class="container">
        <table class="table m-5">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Free</th>
            </tr>
          </thead>
          <tbody>
            <tr className={this.freeBookClasses()}>
              <td scope="row">{this.state.title}</td>
              <td>{this.state.author}</td>
              <td>{this.state.category}</td>
              <td>{this.state.free}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}


export default App;

