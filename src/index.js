import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import ApiClient from './helpers/ApiClient';
import createStore from './redux/store';
import getRoutes from './routes';

const client = new ApiClient();
const store = createStore(client);
const component = getRoutes(store);
const dest = document.getElementById('content');


function initSocket() {

  // 改用polling的方式傳輸
  // const socket = io('http://localhost:3030', {path: '/ws', transports: ['polling']});

  const socket = io('http://localhost:3030', {path: '/ws'});

  console.log('socket connected', socket.connected);
  socket.on('news', (data) => {
    console.log(data);
    socket.emit('my other event', { my: 'data from client' });
  });
  socket.on('msg', (data) => {
    console.log(data);
  });

  return socket;
}

global.socket = initSocket();

ReactDOM.render(
  <Provider store={store}>
    <div>
      {component}
    </div>
  </Provider>,
  dest
);
