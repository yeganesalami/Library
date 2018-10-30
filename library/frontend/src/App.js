import React, { Component } from 'react';

class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Hello  {this.props.name}
      </div>
    );
  }
}
export default class App extends Component {
    render() {
        return (
            <HelloMessage name="yeganeh" />
        )
    }
}
