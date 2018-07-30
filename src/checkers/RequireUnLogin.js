import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Authorization from 'shared/auth/Authorization';

export default ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !Authorization.isLogin() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{
            pathname: '/fittingroom',
            state: { from: props.location }
          }}
          />
        )
    }
  />
);
