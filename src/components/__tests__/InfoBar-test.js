import React from 'react';
import ReactDOM from 'react-dom';
import {renderIntoDocument} from 'react-addons-test-utils';

import {InfoBar } from 'components';
import {Provider} from 'react-redux';
import createStore from 'redux/createStore';
//import ApiClient from 'helpers/ApiClient';
//const client = new ApiClient();


describe('InfoBar', () => {
  const mockStore = {
    info: {
      load: () => {},
      loaded: true,
      loading: false,
      data: {
        message: 'This came from the api server',
        time: Date.now()
      }
    }
  };

  const store = createStore(mockStore);
  const renderer = renderIntoDocument(
    <Provider store={store} key="provider">
      <InfoBar/>
    </Provider>
  );
  const dom = ReactDOM.findDOMNode(renderer);

  it('should render correctly', () => {
    return expect(renderer).toBeTruthy();
  });

  it('should render with correct value', () => {
    const text = dom.getElementsByTagName('strong')[0].textContent;
    return expect(text).toEqual(mockStore.info.data.message);
  });

  it('should render with a reload button', () => {
    const text = dom.getElementsByTagName('button')[0].textContent;
    return expect(text).toEqual(jasmine.any(String));
  });

  it('should render the correct className', () => {
    const styles = require('components/InfoBar/InfoBar.scss');
    expect(styles.infoBar).toEqual(jasmine.any(String));
    expect(dom.className).toMatch(new RegExp(styles.infoBar));
  });

});
