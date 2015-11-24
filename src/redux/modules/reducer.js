import { combineReducers } from 'redux';
import info from './info';
import account from './account';

export default combineReducers({
  info,
  account
});
