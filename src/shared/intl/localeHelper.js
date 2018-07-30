import request from 'superagent';
import { addLocaleData } from 'react-intl';

const defaultLocale = 'en';
let resourcePath = 'globalResources/{0}/{1}.translation.json';

const localeHelper = {
  getDefaultLocale(locale = '') {
    const userLang = locale || Util.getURLParam('lang') || navigator.language || navigator.userLanguage || defaultLocale;
    return userLang.toLowerCase();
  },
  loadDefaultResourceData(locale, resourceName) {
    return new Promise((resolve, reject) => {
      if (!resourceName) {
        resolve([locale, {}]);
        return;
      }

      LocaleHelper.getResourceData(resourceName, locale).then((resourceData) => {
        resolve([locale, resourceData]);;
      });
    });
  },
  getResourceData(resName, lang) {
    return new Promise((resolve, reject) => {
      const path = LocaleHelper.getResourcePath(resName, lang);

      request.get(path)
        .set('Accept', 'application/json')
        .send()
        .end(function (err, res) {
          if (err) {
            console.log(`[XXX] Getting resource file fails: ${resName} ${lang}`);
            resolve({});
            return false;
          }

          resolve(res.body);
        });
    });
  },
  setResourcePathPattern(pathPattern) {
    resourcePath = pathPattern;
  },
  getResourcePath(resName, lang) {
    return resourcePath.replace('{0}', resName).replace('{1}', lang);
  },
  addLocaleData(lang, messages) {
    const data = {
      locales: [lang],
      messages,
    };

    addLocaleData(data);
    return data;
  },
};

export default localeHelper;
