import React, { Component } from 'react';
import 'whatwg-fetch';
import Page from './pages';
import Manage from './manage';
class App extends Component {
  render() {
    return (
      <div>
        Hello, This is App.
        <Page />
        <Manage />
      </div>
    );
  }
}

export default App;
