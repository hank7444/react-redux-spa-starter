import {createStore as _createStore, applyMiddleware, compose } from 'redux';
import clientMiddleware from './middlewares/clientMiddleware';

export default function createStore(client) {

  const middleware = [clientMiddleware(client)];
  let finalCreateStore;

  if (__DEVELOPMENT__) {
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    )(_createStore);

  } else {
    finalCreateStore = compose(
      applyMiddleware(...middleware),
    )(_createStore);
  }

  //finalCreateStore = reduxReactRouter({createHistory })(finalCreateStore);

  const reducer = require('./modules/reducer');
  const store = finalCreateStore(reducer);

  return store;
}
