import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from './routes';
import NoMatch from './routes/NoMatch';
export default class Manage extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          {routes.map((route, i) => (
            <Route
                key={i}
                exact
                path={route.path}
                component={route.component}
              />
          ))}
          <Route component={NoMatch} />
        </Switch>
      </div>
    )
  }
};
