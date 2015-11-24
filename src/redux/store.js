import {createStore, combineReducers, compose } from 'redux';
//import {reducer as form} from 'redux-form';
//import account from './modules/account';
//import submission from './modules/submission';


const getCreateStore = () => {
  const {persistState} = require('redux-devtools');
  const DevTools = require('../containers/DevTools/DevTools');
  return compose(
    window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
};

const reducer = combineReducers({

});
const store = getCreateStore()(reducer);

export default store;
