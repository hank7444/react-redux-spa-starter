import {createStore, combineReducers, compose } from 'redux';
//import {reducer as form} from 'redux-form';
//import account from './modules/account';
//import submission from './modules/submission';

import account from './modules/account';


const getCreateStore = () => {
  // const {persistState} = require('redux-devtools');
  return compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f,
    // persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
};

const reducer = combineReducers({
  account
});
const store = getCreateStore()(reducer);

export default store;
