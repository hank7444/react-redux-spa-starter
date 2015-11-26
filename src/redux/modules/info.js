const LOAD = 'redux-example/LOAD';
const LOAD_SUCCESS = 'redux-example/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/LOAD_FAIL';

const initialState = {
  loaded: false,
  loading: false
};

/*
  這邊就是負責修改redux store的地方，
  記得如果要觸發react rerender，就要回傳新物件,
  例如: return {}, 如果回傳原本的state, 例如default所做的,
  就不會rerender.
*/
export default function reducer(state = initialState, action = {}) {

  console.log('action from info reducer', action);

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

export function isLoaded(globalState) {
  return globalState.info && globalState.info.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadInfo'),
    'test': {
      data1: 1,
      data2: 2
    }
  };
}
