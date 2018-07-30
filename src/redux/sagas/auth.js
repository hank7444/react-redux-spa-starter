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

export function* watchLogin() {
  yield takeEvery(authActions.SAGA_LOGIN, function* ({ account, password } = {}) {
    try {
      yield put({ type: authActions.LOGIN });
      yield call(login, account, password);

      yield put({ type: authActions.LOGIN_SUCCESS });
    } catch (error) {
      yield put({ type: authActions.LOGIN_FAIL, error, resendAccount: account });
    }
  });
}

export default [
  watchLogin,
];
