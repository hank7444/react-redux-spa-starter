import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import {
    App,
    Home,
    About,
    Chart,
    NotFound
  } from 'containers';

export default (store) => {

  return (
    <Route component={App}>
      <Route path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/chart" component={Chart}/>

      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
