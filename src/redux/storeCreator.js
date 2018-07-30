import { createStore, applyMiddleware, compose } from 'redux';
import waterfall from 'promise-waterfall';
import createSagaMiddleware, { END } from 'redux-saga';

import ApiClient from 'shared/request/ApiClient';
import reducers from './modules/reducers';
import clientMiddleware from './middleware/clientMiddleware';
import rootSaga from './sagas/rootSaga';

export default function (initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [
    clientMiddleware(new ApiClient(), waterfall),
    sagaMiddleware,
  ];
  let store;

  if (__DEVELOPMENT__) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    store = createStore(reducers(), initialState, composeEnhancers(
      applyMiddleware(...middleware),
    ));

    if (module.hot) {
      module.hot.accept('./sagas/rootSaga', () => {
        rootSaga.cancelSagas(store);
        require('./sagas/rootSaga').default.startSagas(sagaMiddleware);
      });
    }
  } else {
    store = createStore(reducers(), initialState, compose(
      applyMiddleware(...middleware),
    ));
  }

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  rootSaga.startSagas(sagaMiddleware);

  return store;
}
