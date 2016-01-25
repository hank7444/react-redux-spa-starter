import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {
    App,
    Home,
    About,
    Chart,
    Login,
    NotFound
} from 'containers';
import {
  RequireLogin,
  RequireTest
} from 'checkers';


export default () => {

  return (

    <Route component={App}>
      <Route path="/" component={Home}/>

      {/*
        higher-order component
        這樣的寫法有點鳥...為了避免onEnter時，store.getState()不存在而發生錯誤..
        測試過makeRouteHookSaft, 在一開始進網站時，onEnter依然拿不到store..因此刪除
      */}


      {/*
        要小心，如果沒登入時點About, 會被replaceState到Login, 導致App的fetchData做了兩次...
      */}
      {/*
      <Route component={RequireTest}>
        <Route component={RequireLogin}>
          <Route path="/about" component={About}/>
        </Route>
      </Route>
      */}
      <Route path="/about" component={About}/>
      <Route path="/chart" component={Chart}/>
      <Route path="/login" component={Login}/>
      <Route path="*" component={NotFound} status={404} />
    </Route>

  );
};
