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

  };

  componentWillMount() {

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
