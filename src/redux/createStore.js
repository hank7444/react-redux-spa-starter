import {createStore as _createStore, applyMiddleware, compose } from 'redux';
import waterfall from 'promise-waterfall';
import clientMiddleware from './middlewares/clientMiddleware';
import apiClient from 'helpers/apiClient';


export default function createStore(data) {

  const middleware = [clientMiddleware(apiClient, waterfall)];
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
  const store = finalCreateStore(reducer, data);

  return store;
}
