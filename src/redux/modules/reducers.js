import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import { CLEAN_DATA_BY_VERSION } from 'redux/constants/app';
import { LOGOUT, LOGOUT_ALERT } from 'redux/constants/auth';

import app from './app';
import auth from './auth';
import error from './error';


// 登出時不需要 reset的 reducer 名稱
const LOGOUT_UNINIT_REDUCER_ARY = ['app'];

// version 改變時需要 reset 的 reducer 名稱
const VERSION_INIT_REDUCER_ARY = [];

export default () => {
  const appReducer = combineReducers({
    form,
    app,
    auth,
    error,
  });

  return (state, action) => {
    let _state = state;

    switch (action.type) {
      case LOGOUT:
      case LOGOUT_ALERT:
        _state = Object.keys(state).reduce((prev, curr) => {

          if (LOGOUT_UNINIT_REDUCER_ARY.indexOf(curr) !== -1) {
            prev[curr] = state[curr];
          }

          return prev;
        }, {});
        break;

      case CLEAN_DATA_BY_VERSION:
        _state = Object.keys(state).reduce((prev, curr) => {

          if (VERSION_INIT_REDUCER_ARY.indexOf(curr) === -1) {
            prev[curr] = state[curr];
          }

          return prev;
        }, {});
        break;

      default:
        break;
    }

    return appReducer(_state, action);
  };
};
