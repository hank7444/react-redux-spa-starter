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
    promises: (client) => client.get('/loadInfo'),
    'test': {
      data1: 1,
      data2: 2
    }
  };
}


// all promises resolve, then succues
export function loadAll() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promiseType: 'all',
    promises: [(client) => client.get('/loadInfo'), (client) => client.get('/loadEinfo')],
    'test': {
      data1: 1,
      data2: 2
    }
  };
}

// one of promises resolve, then succuess
export function loadRace() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promiseType: 'race',
    promises: [(client) => client.get('/loadInfo'), (client) => client.get('/loadEinfo')]
  };
}

export function loadWaterfall() {

  /*
  // superagent直接暴露寫法參考
  const func1 = () => {

    return new Promise((resolve, reject) => {
      superagent
      .get('http://localhost:3030/loadInfo')
      .end((err, res) => {

        if (err) {
          reject(err);
        } else {
          resolve(res.body);
        }
      });
    });

  };
  const func2 = (res1) => {

    return new Promise((resolve, reject) => {
      superagent
      .get('http://localhost:3030/loadEinfo')
      .query({
        time: res1.time
      })
      .end((err, res) => {

        if (err) {
          reject(err);
        } else {
          res.body.message += ` ### ${res1.message}`;
          resolve(res.body);
        }
      });
    });
  };
  */

  const step2Option = (bodyPrev) => {
    return {
      params: {
        time: bodyPrev.time
      },
      output: (body, resolve) => {

        body.message += ` ### ${bodyPrev.message}`;
        resolve(body);
      }
    };
  };

  const step3Option = (bodyPrev) => {
    return {
      params: {
        message: bodyPrev.message
      },
      output: (body, resolve) => {

        body.message += ` ### ${bodyPrev.message}`;
        resolve(body);
      }
    };
  };

  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promiseType: 'waterfall',
    promises: [(client) => client.get('/loadInfo'),
              (client, bodyPrev) => client.get('/loadEinfo', step2Option(bodyPrev)),
              (client, bodyPrev) => client.get('/loadInfo', step3Option(bodyPrev))]
  };
}
