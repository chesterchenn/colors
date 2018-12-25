import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from '../config/menuRouter';
import NoMatch from '../pages/routes/NoMatch';
export default class Routes extends React.Component {
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
