import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import createHistory from 'history/lib/createHashHistory';
import {
    App,
    Home,
    About,
    Chart
  } from 'containers';


export default (store) => {

  return (
    <Router history={createHistory()}>
      <Route component={App}>
        <Route path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/chart" component={Chart}/>
      </Route>
    </Router>
  );
};
