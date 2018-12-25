import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from "../redux/store";
import Routes from './Routes';
const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
