import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

@connect(
  state => ({
    user: state.auth.user
  }),
  {}
)

export default class RequireLogin extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]),
    dispatch: PropTypes.func

  }

  componentWillMount() {

    /*
    const requireLogin = (nextState, replaceState, cb) => {

      function checkAuth() {

        const { auth: { user }} = store.getState();
        if (!user) {
          // oops, not logged in, so can't be here!
          replaceState(null, '/login');
        }
        cb();
      }

      if (!isAuthLoaded(store.getState())) {
        store.dispatch(loadAuth()).then(checkAuth);
      } else {
        checkAuth();
      }

    };
    */

    console.log('this.props from checkers', this.props);
    const {user, history} = this.props;

    if (!user) {
      history.replaceState(null, '/login');
    }
  }

  render() {
    return this.props.children;
  }
}
