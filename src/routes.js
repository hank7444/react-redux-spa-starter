import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import createHistory from 'history/lib/createHashHistory';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import {
    App,
    Home,
    About,
    Chart
  } from 'containers';

const scrollableHistory = useScroll(createHistory);

export default (store) => {

  return (
    <Router history={scrollableHistory()}>
      <Route component={App}>
        <Route path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/chart" component={Chart}/>
      </Route>
    </Router>
  );
};
