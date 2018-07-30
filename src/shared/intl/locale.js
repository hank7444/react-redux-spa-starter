import isIntlLocaleSupported from 'intl-locales-supported';

import localeHelper from './localeHelper';
import localeData from './localeData';

const locale = {
  init(locale, defaultResource ) {
    return new Promise((resolve, reject) => {
      locale.loadIntlPolyfill(locale)
            .then(locale.loadIntlLocaleData.bind(null, locale))
            .then((finalLocale) => {
                locale.loadDefaultResourceData(finalLocale, defaultResource)
                      .then(function(pLocaleData) {
                        resolve(pLocaleData);
                      });
            });
    });
  },
  loadIntlPolyfill(locale) {
    if (window.Intl && isIntlLocaleSupported(locale)) {
      // all fine: Intl is in the global scope and the locale data is available
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      console.log('[XXX] Intl or locale data for %s not available, downloading the polyfill...', locale);
      require.ensure(['intl'], require => {
          require('intl'); // apply the polyfill
          resolve();
      }, 'intl');
    });
  },
  loadIntlLocaleData(locale){
    return localeData.load(locale);
  },
  loadDefaultResourceData(locale, resourceName) {
    return localeHelper.loadDefaultResourceData(locale, resourceName);
  },
  getDefaultLocale(locale) {
    return localeHelper.getDefaultLocale(locale);
  },
  setResourcePathPattern(path){
    localeHelper.setResourcePathPattern(path);
  }
};

export default locale;
