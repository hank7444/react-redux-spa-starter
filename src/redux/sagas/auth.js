import { takeEvery, call, put } from 'redux-saga/effects';
import sha1 from 'sha1';

import Authorization from 'shared/auth/Authorization';
import ApiClient from 'shared/request/ApiClient';
import API_PATH_HASH from 'shared/request/ApiPathHash';
import { auth as authActions } from '../constants';

const client = ApiClient.getInstance();

export function* login(account, password) {
  const resp = yield call(client.post, API_PATH_HASH.auth, {
    isExternal: true,
    data: {
      account,
      password: sha1(password),
    },
  });
  const token = resp.result;
  Authorization.setAuthorization(token);
}

export function* getInfo() {
  try {
    yield put({ type: authActions.GET_INFO });
    const info = yield call(client.get, API_PATH_HASH.profileMe, {
      isExternal: true,
    });
    yield put({ type: authActions.GET_INFO_SUCCESS, result: info });
  } catch (error) {
    yield put({ type: authActions.GET_INFO_FAIL, error });
    throw error;
  }
}

export function* watchGetInfo() {
  yield takeEvery(authActions.SAGA_GET_INFO, function* () {
    try {
      yield call(getInfo);
    } catch (error) {
      throw error;
    }
  });
}

export function* watchLogin() {
  yield takeEvery(authActions.SAGA_LOGIN, function* ({ account, password } = {}) {
    try {
      yield put({ type: authActions.LOGIN });
      yield call(login, account, password);
      //yield call(getInfo);
      yield put({ type: authActions.LOGIN_SUCCESS });
    } catch (error) {
      yield put({ type: authActions.LOGIN_FAIL, error, resendAccount: account });
    }
  });
}

export default [
  watchLogin,
  watchGetInfo,
];
