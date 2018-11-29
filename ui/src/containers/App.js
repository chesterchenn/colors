import React, { Component } from 'react';
import Page from '../pages';
import Manage from '../manage';
import NoMatch from '../manage/routes/NoMatch';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from "../store";
const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route exact path='/' component={Page} />
          <Route path='/manage' component={Manage} />
          <Route component={NoMatch} />
        </Switch>
      </Provider>
    );
  }
}

export default App;
