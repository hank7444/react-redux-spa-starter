const LOAD = 'redux-example/einfo/LOAD';
const LOAD_SUCCESS = 'redux-example/einfo/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/einfo/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isEinfoLoaded(globalState) {
  return globalState.info && globalState.info.loaded;
}

export function loadEinfo() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadEinfo')
  };
}
