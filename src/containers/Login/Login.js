import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';
import reactMixin from 'react-mixin';
import { Lifecycle } from 'react-router';
import { TickTock } from 'components';

@connect(
  state => ({
    user: state.auth.user
  }),
  {
    ...authActions
  }
)
// WTF, 放在@connect上面就不work了..
@reactMixin.decorate(Lifecycle)

class Login extends Component {

  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.routerWillLeave = this.routerWillLeave.bind(this);
  }

  routerWillLeave(nextLocation) {

    console.log('##routerWillLeave##: ', nextLocation);

    // 同等window.confirm
    //return 'Your work is not saved! Are you sure you want to leave?';

    // 換頁
    //return true;
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
        <TickTock/>

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
