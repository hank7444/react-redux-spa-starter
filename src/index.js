import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import ApiClient from './helpers/ApiClient';
import createStore from './redux/store';
import getRoutes from './routes';

const client = new ApiClient();
const store = createStore(client);
const component = getRoutes(store);
const dest = document.getElementById('content');

ReactDOM.render(
  <Provider store={store}>
    <div>
      {component}
    </div>
  </Provider>,
  dest
);
