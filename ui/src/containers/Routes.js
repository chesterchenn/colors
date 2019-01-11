import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { menu } from '../config/menu';

export default class Routes extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          {menu.map((route, i) => (
            <Route
                key={i}
                exact
                path={route.path}
                component={route.component}
              />
          ))}
        </Switch>
      </div>
    )
  }
};
