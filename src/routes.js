import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import {
    App,
    Home,
    About,
    Chart,
    Login,
    NotFound
} from 'containers';
import {isLoaded as isAuthLoaded, load as loadAuth} from 'redux/modules/auth';
import {
  RequireLogin,
  RequireTest
} from 'checkers';


export default (store) => {

  return (
    <Route component={App}>
      <Route path="/" component={Home}/>

      {/*
        higher-order component
        這樣的寫法有點鳥...為了避免onEnter時，store.getState()不存在而發生錯誤..
      */}

      <Route component={RequireTest}>
        <Route component={RequireLogin}>
          <Route path="/about" component={About}/>
        </Route>
      </Route>

      <Route path="/chart" component={Chart}/>
      <Route path="/Login" component={Login}/>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
