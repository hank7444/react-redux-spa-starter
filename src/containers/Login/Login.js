import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';

console.log('authActions', authActions);


@connect(
  state => ({
    user: state.auth.user
  }),
  {
    ...authActions
  }
)

class Login extends Component {

  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  handleSubmit(event) {

    console.log('submit trigger!!!');
    event.preventDefault();
    const input = this.refs.username;
    this.props.login(input.value);
    input.value = '';
  }

  render() {

    console.log('this.props Login', this.props);

    return (
      <div>
        <h1>Login</h1>

        <div>
          <form className="login-form">
            <input type="text" ref="username" placeholder="Enter a username"/>
            <button className="btn btn-success" onClick={::this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
            </button>
          </form>
          <p>This will "log you in" as this user, storing the username in the session of the API server.</p>
        </div>
      </div>
    );
  }
}

export default Login;
