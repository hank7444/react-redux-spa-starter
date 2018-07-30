import locale from './locale';
import en from './locales/en';

const INTL_DATA = {
  en,
};

async function loadReactIntl(lang) {
  await locale.loadIntlPolyfill(lang);
  await locale.loadIntlLocaleData(lang);
}

export default async function loadLocaleData(lang) {
  const finalLang = INTL_DATA[lang] ? lang : 'en';
  const data = INTL_DATA[finalLang];

  await loadReactIntl(finalLang);

  return [finalLang, data];
}
