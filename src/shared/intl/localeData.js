import isIntlLocaleSupported from 'intl-locales-supported';
import { addLocaleData } from 'react-intl';

const localeData = {
  load(locale) {
    require('expose?ReactIntl!react-intl');

    // Returns a promise which is resolved as the required locale-data chunks
    // has been downloaded with webpack's require.ensure. For each language,
    // we make two different chunks: one for browsers supporting `intl` and one
    // for those who don't.
    // The react-intl locale-data is required, for example, by the FormattedRelative
    // component.
    return new Promise(resolve => {
      const hasIntl = isIntlLocaleSupported(locale);

      // Make sure ReactIntl is in the global scope: this is required for adding locale-data
      // Since ReactIntl needs the `Intl` polyfill to be required (sic) we must place
      // this require here, when loadIntlPolyfill is supposed to be present
      switch (locale) {
        case 'zh-cn':
          if (!hasIntl) {
            require.ensure([
              'intl/locale-data/jsonp/zh-Hans-CN',
              'react-intl/locale-data/zh'
            ], require => {
              addLocaleData(require("intl/locale-data/jsonp/zh-Hans-CN"));
              addLocaleData(require("react-intl/locale-data/zh"));
              resolve(locale);
              console.warn('Intl and ReactIntl locale-data for %s has been downloaded', locale);
            }, 'locale-zh-cn');
          } else {
            require.ensure([
              'react-intl/locale-data/zh'
            ], require => {
              addLocaleData(require('react-intl/locale-data/zh'));
              resolve(locale);
              console.warn('ReactIntl locale-data for %s has been downloaded', locale);
            }, 'locale-zh-cn-no-intl');
          }
          break;

        case 'zh-tw':
          if (!hasIntl) {
            require.ensure([
                'intl/locale-data/jsonp/zh-Hant-TW',
                'react-intl/locale-data/zh'
            ], require => {
                addLocaleData(require('intl/locale-data/jsonp/zh-Hant-TW'));
                addLocaleData(require('react-intl/locale-data/zh'));
                resolve(locale);
                console.warn('Intl and ReactIntl locale-data for %s has been downloaded', locale);
            }, 'locale-zh-tw');
          } else {
            require.ensure([
              'react-intl/locale-data/zh'
            ], require => {
              addLocaleData(require('react-intl/locale-data/zh'));
              resolve(locale);
              console.warn('ReactIntl locale-data for %s has been downloaded', locale);
            }, 'locale-zh-tw-no-intl');
          }
          break;

        default: //en
          if (!hasIntl) {
            require.ensure([
              'intl/locale-data/jsonp/en',
              'react-intl/locale-data/en',
            ], require => {
              addLocaleData(require('intl/locale-data/jsonp/en'));
              addLocaleData(require('react-intl/locale-data/en'));
              resolve('en');
              console.warn('Intl and ReactIntl locale-data for %s has been downloaded', 'en');
            }, 'locale-en');
          } else {
            require.ensure([
              'react-intl/locale-data/en',
            ], require => {
              addLocaleData(require('react-intl/locale-data/en'));
              resolve('en');
              console.warn('ReactIntl locale-data for %s has been downloaded', 'en');
            }, 'locale-en-no-intl');
          }
      }
    });
  }
};

export default localeData;
