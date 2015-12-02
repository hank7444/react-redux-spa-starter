import {auth as cons} from '../constants';

const initialState = {
  loaded: false
};


export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    case cons.LOAD:
      return {
        ...state,
        loading: true
      };
    case cons.LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case cons.LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case cons.LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case cons.LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result
      };
    case cons.LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case cons.LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case cons.LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case cons.LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [cons.LOAD, cons.LOAD_SUCCESS, cons.LOAD_FAIL],
    promises: (client) => client.get('/auth/load')
  };
}

export function login(name) {

  return {
    types: [cons.LOGIN, cons.LOGIN_SUCCESS, cons.LOGIN_FAIL],
    promises: (client) => client.post('/auth/login', {
      data: {
        name: name
      }
    })
  };
}

export function logout() {
  return {
    types: [cons.LOGOUT, cons.LOGOUT_SUCCESS, cons.LOGOUT_FAIL],
    promises: (client) => client.get('/auth/logout')
  };
}
