import React, { Component } from 'react';
import 'whatwg-fetch';

class App extends Component {
  state = {
    name: ''
  }

  getName = () => {
    return window.fetch('api/name')
      .then(res => {
        return res.text()
      })
  }

  componentDidMount() {
    this.getName().then(text => {
      this.setState({
        name: text 
      })
    });
  }

  render() {
    return (
      <div>
        Hello, This is {this.state.name}
      </div>
    );
  }
}

export default App;
