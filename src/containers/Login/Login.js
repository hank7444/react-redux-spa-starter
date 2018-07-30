import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { login } from 'redux/modules/auth';
import withI18N from 'shared/intl/withI18N';

import LoginForm from './LoginForm';


@connect(
  state => ({
    auth: state.auth,
  }), {
    login,
  },
)

@withI18N
class Login extends Component {

  static propTypes = {
    auth: ImmutablePropTypes.map.isRequired,
    login: PropTypes.func.isRequired,
  };

  static contextTypes = {
    globalFromApp: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this._handleSubmit = this._handleSubmit.bind(this);

    this.handleActived = this.handleActived.bind(this);
    this.handleNeedSignup = this.handleNeedSignup.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { auth } = this.props;
    const { auth: authNext } = nextProps;

    if (!auth.get('loginErr') && authNext.get('loginErr')) {
      this.showErrMsg(authNext.getIn(['loginErr', 'err', 'msg']), 'none');
    } else if (!auth.get('loginSocialErr') && authNext.get('loginSocialErr')) {
      this.showErrMsg(authNext.getIn(['loginSocialErr', 'err', 'msg']), authNext.get('socialType'));
    }
  }

  _handleSubmit(data) {
    console.log('data', data);
    return this.props.login(data);
  }

  handleNeedSignup() {
    this.props.history.replace('/signup');
  }

  handleActived() {
    this.props.history.replace('/resend');
  }

  showErrMsg(type, socialType = 'Facebook') {
    const {
      globalFromApp: {
        showConfirmDialog,
      },
    } = this.context;
    const { i18n } = this.props;
    const socailName = socialType.charAt(0).toUpperCase() + socialType.slice(1);

    let done = () => {};
    let title = i18n('common.popup.error.title');
    let contentText = i18n('common.popup.error.desc');
    let buttonText = i18n('common.btn.ok');

    switch (type) {
      case 'ACCOUNT_NOT_ACTIVED':
        done = this.handleActived;
        title = i18n('common.popup.activate.title');
        contentText = i18n('login.popup.activate.desc');
        buttonText = i18n('common.btn.resend');
        break;

      case 'INVALID_PARAM':
      case 'INVALID_ACCOUNT':
      case 'INVALID_PASSWORD':

        if (socialType === 'none') {
          title = '';
          contentText = '';
        }
        break;

      default:
        break;
    }

    if (!title || !contentText) {
      return false;
    }

    showConfirmDialog({
      title,
      msg: contentText,
      btnOkLabel: buttonText,
      okCallback: done,
    });
  }

  render() {
    const { i18n, auth } = this.props;
    const errMsg = auth.getIn(['loginErr', 'err', 'msg']);
    const isSubmitting = auth.get('login');

    return (
      <div className="account page-login">
        <div className="container flex-container">
          <LoginForm
            onSubmit={this._handleSubmit}
            isSubmitting={isSubmitting}
            errMsg={errMsg}
          />
        </div>
      </div>
    );
  }
}

module.exports = Login;
