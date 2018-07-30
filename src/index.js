import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import localStorage from 'shared/storage/localStorage'; // init localStorage
import './ga';
import './whyDidYouUpdate';

import route from './route';
import createStore from './redux/storeCreator';
import loadLocaleData from './shared/intl/loadLocaleData';
import requestAnimationFramePolyfill from 'shared/polyfill/requestAnimationFramePolyfill';

import { initialState as appInitialState, getCountryCode } from 'redux/modules/app';

// css normalize
import 'style/css/normalize.css';

// 套件的css
import 'rc-tooltip/assets/bootstrap.css';

// 切板完成後的css放在這
import 'style/css/bundle.css';

requestAnimationFramePolyfill();

async function initApp() {
  const lang = 'en';
  const localeData = await loadLocaleData(lang);
  let countryCode;
  try {
    countryCode = await getCountryCode();
  } catch (error) {
    countryCode = '';
  }

  const store = createStore({
    app: appInitialState.merge({
      countryCode,
    }),
  });

  return [...localeData, store];
}

initApp().then((values) => {
  const lang = values[0];
  const localeData = values[1];
  const store = values[2];
  const routes = route();
  const appRoot = document.getElementById('root');

  ReactDOM.render(
    <IntlProvider locale={lang} messages={localeData}>
      <Provider store={store}>
        {routes}
      </Provider>
    </IntlProvider>,
    appRoot,
  );
});
