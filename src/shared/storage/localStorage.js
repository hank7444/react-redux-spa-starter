let localStorage = null;

function createBaseStorage() {
  let dataStorage = {};

  return {
    init: function init(data = {}) {
      dataStorage = Object.assign({}, dataStorage, data);
    },
    getItem: function getItem(key) {
      return dataStorage[key];
    },
    setItem: function setItem(key, value) {
      dataStorage[key] = value;
    },
    removeItem: function removeItem(key) {
      Reflect.deleteProperty(dataStorage, key);
    },
    clear: function clear() {
      dataStorage = {};
    },
    key: function key(pKey = 0) {
      return dataStorage[pKey] || null;
    },
  };
}


function getLocalStorage() {
  try {
    if (window.localStorage) {
      /*
        if you use local storage in Safari 10 private mode,
        it will occur QuotaExceededError.
        this bug has been fixed in Safari 11.

        refs:
        1. https://stackoverflow.com/questions/21159301
        2. https://bugs.webkit.org/show_bug.cgi?id=157010
      */
      window.localStorage.setItem('test', 'test');
      window.localStorage.removeItem('test', 'test');

      localStorage = window.localStorage;
    } else if (!localStorage) {
      localStorage = createBaseStorage();
    }
  } catch (e) {
    console.warn('[XXX] Client doesn\'t support localStorage', e);
    localStorage = createBaseStorage();
  }

  return localStorage;
}

export default getLocalStorage();
