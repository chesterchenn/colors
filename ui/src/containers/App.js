import React, { Component } from 'react';
import Page from '../pages';
import Manage from '../manage';
import NoMatch from '../manage/routes/NoMatch';
import { Route, Switch } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Page} />
          <Route path='/manage' component={Manage} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default App;
