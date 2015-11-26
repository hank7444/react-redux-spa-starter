import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import createHistory from 'history/lib/createHashHistory';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import {
    App,
    Home,
    About,
    Chart,
    NotFound
  } from 'containers';


// 將queryKey關閉
const scrollableHistory = useScroll(createHistory)({
  queryKey: false
});

export default (store) => {

  return (
    <Router history={scrollableHistory}>
      <Route component={App}>
        <Route path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/chart" component={Chart}/>

        <Route path="*" component={NotFound} status={404} />
      </Route>
    </Router>
  );
};
