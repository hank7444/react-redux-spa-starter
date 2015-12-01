import {combineReducers} from 'redux';
import {routerStateReducer as router} from 'redux-router';
import auth from './auth';
import info from './info';
import einfo from './einfo';
import counter from './counter';

/*
  redux一個很重要的觀念是reducer，簡單說redux所有的state都在一個store裏面，
  在透過reducer去決定action會被哪個reducer捕獲到，下面的路徑為:

  action -> reducer -> info -> einfo -> account
  如果info沒有對應的action type, 就會接著到einfo..以此類推

  有點像生產流水線一樣

  至於命名方式，如果沒有指定名稱，預設就會用reducer的名稱,

  所以這個redux store的結構為:

  {
    info: {},
    einfoNewName: {},
    account: {}
  }

  combineReducers是redux提供的一個函式，等價的寫法請參考:
  http://camsong.github.io/redux-in-chinese/docs/basics/Reducers.html

*/

export default combineReducers({
  router,
  auth,
  info,
  einfoNewName: einfo,
  counter
});
