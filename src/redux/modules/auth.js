import { fromJS, Map } from 'immutable';

import { auth as cons } from '../constants';
import Authorization from 'shared/auth/Authorization';
import API_PATH_HASH from 'shared/request/ApiPathHash';

const initialState = fromJS({
  login: false,
  loginSuc: Authorization.isLogin(),
  loginErr: false,
  loginSocial: false,
  loginSocialSuc: false,
  loginSocialErr: false,
  logoutAlert: false,
  getInfo: false,
  getInfoSuc: false,
  getInfoErr: false,
  resendAccount: '',
  info: Map(),
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case cons.LOGIN:
      return state.merge({
        login: true,
        loginSuc: false,
        loginErr: false,
        getSocialDataErr: false,
      });

    case cons.LOGIN_SUCCESS: {
      return state.merge({
        login: false,
        loginSuc: true,
        loginErr: false,
      });
    }

    case cons.LOGIN_FAIL:
      Authorization.removeAuthorization();

      return state.merge({
        login: false,
        loginSuc: false,
        loginErr: action.error,
        resendAccount: action.resendAccount,
      });

    case cons.LOGOUT:
      Authorization.removeAuthorization();

      return state.merge({
        login: false,
        loginSuc: false,
        loginErr: false,
        resendAccount: '',
      });

    case cons.LOGOUT_ALERT:
      Authorization.removeAuthorization();

      return state.merge({
        login: false,
        loginSuc: false,
        loginErr: false,
        logoutAlert: true,
        resendAccount: '',
      });

    case cons.RESET_LOGOUT_ALERT:
      return state.merge({
        logoutAlert: false,
      });

    case cons.GET_INFO:
      return state.merge({
        getInfo: true,
        getInfoSuc: false,
        getInfoErr: false,
      });

    case cons.GET_INFO_SUCCESS:
      return state.merge({
        getInfo: false,
        getInfoSuc: true,
        getInfoErr: false,
        info: action.result.result,
      });

    case cons.GET_INFO_FAIL:
      return state.merge({
        getInfo: false,
        getInfoSuc: false,
        getInfoErr: action.error,
      });

    default:
      return state;
  }
}

export function login(data) {
  return {
    type: cons.SAGA_LOGIN,
    account: data.account,
    password: data.password,
  };
}

export function logout() {
  return {
    type: cons.LOGOUT,
  };
}

export function logoutAlert() {
  return {
    type: cons.LOGOUT_ALERT,
  };
}

export function resetLogoutAlert() {
  return {
    type: cons.RESET_LOGOUT_ALERT,
  };
}

export function getInfo() {
  return {
    type: cons.SAGA_GET_INFO,
  };
}

