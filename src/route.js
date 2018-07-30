import React from 'react';

import {
  Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import createHashHistory from 'history/createHashHistory';

import App from './containers/App/App';


import {
  AuthController,
  RequireUnLogin,
} from 'checkers';

// getComponent is a function that returns a promise for a component
// It will not be called until the first mount
function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        })
      }
    }
    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
  };
}

const Home = asyncComponent(() =>
  import( /* webpackChunkName: "Home" */ './containers/Home/Home').then(module => module.default)
);

const Login = asyncComponent(() =>
  import( /* webpackChunkName: "Login" */ './containers/Login/Login').then(module => module.default)
);

const history = createHashHistory();

export default function () {
  return (
    <Router history={history}>
      <App>
        <AuthController />
        <Switch>
          <Route path="/home" component={Home} />
          <RequireUnLogin path="/login" component={Login} />

          <Redirect from="*" to="/home" />
        </Switch>
      </App>
    </Router>
  );
}
