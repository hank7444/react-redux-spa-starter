import { fork, cancel, take, call, put, select, spawn, all } from 'redux-saga/effects';

import { auth, error as errorConstants } from '../constants';
import authSagas from './auth';

const sagas = [
  ...authSagas,
];

const CANCEL_SAGAS_HMR = 'CANCEL_SAGAS_HMR';

function createAbortableSaga(saga) {
  return function* main() {
    const sagaTask = yield fork(saga);
    yield take(CANCEL_SAGAS_HMR);
    yield cancel(sagaTask);
  };
}

/*
  Global error handler for saga
  from: https://github.com/redux-saga/redux-saga/pull/644
*/
function* startAllSagas() {
  let _sagas = sagas;

  if (__DEVELOPMENT__) {
    _sagas = _sagas.map(createAbortableSaga);
  }

  yield all(_sagas.map(saga =>
    spawn(function* () {
      let isSyncError = false;
      while (!isSyncError) {
        isSyncError = true;
        try {
          setTimeout(() => isSyncError = false);

          yield call(saga);

          break;
        } catch (error) {

          if (isSyncError) {
            throw new Error(`[XXX] ${saga.name} was terminated because it threw an exception on startup.`);
          }

          const isErrorContainStatus = Object.prototype.hasOwnProperty.call(error, 'status');
          if (isErrorContainStatus && error.status === 403) {
            yield put({ type: auth.LOGOUT_ALERT });
          } else {
            if (isErrorContainStatus) { // error from backend, convert error to JSON for displaying it on Sentry
              console.error('[XXX] Redux-Saga error has occurred!', JSON.stringify(error));
            } else {
              console.error('[XXX] Redux-Saga error has occurred!', error);
            }

            if (!error.err) {
              yield put({ type: errorConstants.SET_ERROR, error: { err: { msg: 'UNKNOWN' } } });
            } else {
              yield put({ type: errorConstants.SET_ERROR, error });
            }
          }
        }
      }
    }),
  ));
}

/*
目前 redux-saga 官方尚未支援 Hot reload，必須要在專案中做些修改才行
Webpack React/Redux Hot Module Reloading (HMR) example
*/
export default {
  startSagas(sagaMiddleware) {
    sagaMiddleware.run(startAllSagas);
  },
  cancelSagas(store) {
    store.dispatch({ type: CANCEL_SAGAS_HMR });
  },
};
