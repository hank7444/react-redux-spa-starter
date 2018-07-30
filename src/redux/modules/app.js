import { fromJS } from 'immutable';

import { app as cons } from '../constants';
import ApiClient from 'shared/request/ApiClient';
import API_PATH_HASH from 'shared/request/ApiPathHash';
import localStorage from 'shared/storage/localStorage';

export const initialState = fromJS({
  getVersion: false,
  getVersionSuc: false,
  getVersionErr: false,
  version: localStorage.getItem('version') || '',
  countryCode: 'TW',
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case cons.GET_VERSION:
      return state.merge({
        getVersion: true,
        getVersionSuc: false,
        getVersionErr: false,
      });

    case cons.GET_VERSION_SUCCESS: {
      const version = action.result.result;

      localStorage.setItem('version', version);

      return state.merge({
        getVersion: false,
        getVersionSuc: true,
        getVersionErr: false,
        version,
      });
    }

    case cons.GET_VERSION_FAIL:
      return state.merge({
        getVersion: false,
        getVersionSuc: false,
        getVersionErr: action.error,
      });


    case cons.CLEAN_DATA_BY_VERSION: {
      // 版號變更時, 清除必要的 localStorage
      console.log('clean something!!');

      return state;
    }

    default:
      return state;
  }
}

export function getVersion() {
  return {
    types: [cons.GET_VERSION, cons.GET_VERSION_SUCCESS, cons.GET_VERSION_FAIL],
    promises: client => client.get(API_PATH_HASH.version, { isExternal: true }),
  };
}

export function cleanDataByVersion() {
  return {
    type: cons.CLEAN_DATA_BY_VERSION,
  };
}

export function getCountryCode() {
  return ApiClient.getInstance().get(API_PATH_HASH.countries, {
    isExternal: true,
    endCallback: (err, res, resolve, reject) => {

      if (err) {
        reject(err);
      }

      resolve(res.result);
    },
  });
}
