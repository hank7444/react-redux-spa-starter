import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import withI18N from 'shared/intl/withI18N';
import Authorization from 'shared/auth/Authorization';
import { getInfo, logoutAlert, resetLogoutAlert } from 'redux/modules/auth';

@withRouter
@connect(
  state => ({
    auth: state.auth,
  }), {
    getInfo,
    logoutAlert,
    resetLogoutAlert,
  },
)

@withI18N
export default class AuthController extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    history: PropTypes.object.isRequired,
    auth: ImmutablePropTypes.map.isRequired,
    getInfo: PropTypes.func.isRequired,
    logoutAlert: PropTypes.func.isRequired,
    resetLogoutAlert: PropTypes.func.isRequired,
  };

  static contextTypes = {
    globalFromApp: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    /*
      預先產生一組 cookieid,
      避免呼叫 style-me/avatar-logs 產生 403 錯誤,
      導致 session timout popup 跳出
    */
    Authorization.setAuthorization();
  }

  componentDidMount() {
    const { auth } = this.props;

    if (auth.get('loginSuc')) {
      this._initData(true);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      globalFromApp: {
        showConfirmDialog,
        addSnackbar,
      },
    } = this.context;
    const { auth, i18n, history } = this.props;
    const { auth: nextAuth } = nextProps;
    const loginSuc = auth.get('loginSuc');
    const nextLoginSuc = nextAuth.get('loginSuc');

    // login success
    if (!loginSuc && nextLoginSuc) {
      this._initData();

      addSnackbar({
        text: i18n('login.snackbar.suc'),
        type: 'success',
      });
    }

    // logout success, do something
    if (loginSuc && !nextLoginSuc) {
      console.log('history', history);
      history.push('/login');
    }

    if (this._isReqLogout(nextProps)) {
      this.props.logoutAlert();
    }
  }

  _initData() {
    this.props.resetLogoutAlert();
    this.props.getInfo();
  }

  _isReqLogout(props) {
    const { auth } = props;

    return auth.get('loginSuc') && !Authorization.isLogin();
  }

  render() {
    return null;
  }
}
