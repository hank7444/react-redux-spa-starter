import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import {
    App,
    Home,
    About
  } from 'containers';


const routes = (

  <Router>
    <Route component={App}>
      <Route path="/" component={Home}/>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
);

export default routes;
