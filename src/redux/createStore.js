import {createStore as _createStore, applyMiddleware, compose } from 'redux';
import waterfall from 'promise-waterfall';
import clientMiddleware from './middlewares/clientMiddleware';
import ApiClient from 'helpers/ApiClient';


export default function createStore() {

  const middleware = [clientMiddleware(new ApiClient(), waterfall)];
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
