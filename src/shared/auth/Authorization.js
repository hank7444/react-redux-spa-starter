import localStorage from 'shared/storage/localStorage';

export default class Authorization {
  static getMemberId() {
    let mid = Authorization.getAuthorization() || Authorization.getCookieId();

    if (!mid) {
      Authorization.setAuthorization();
      mid = Authorization.getCookieId();
    }
    return mid;
  }
  static getCookieId() {
    return localStorage.getItem('cookieid') || '';
  }
  static getAuthorization() {
    return localStorage.getItem('fittingroom.authorization') || '';
  }
  static setAuthorization(token = '') {
    if (!token) {
      const cookieId = localStorage.getItem('cookieid') || Authorization.getCookieRandomKey();
      localStorage.setItem('cookieid', cookieId);

      if (parent) {
        parent.postMessage({
          styleMeAction: 'setCookieId',
          cookieId,
        }, '*');
      }

      return false;
    }

    localStorage.setItem('fittingroom.authorization', token);
  }
  static removeAuthorization() {
    localStorage.removeItem('fittingroom.authorization');
  }
  static getCookieRandomKey() {
    const charArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let randomKey = '';
    for (let i = 1; i <= 10; i += 1) {
      const randomIndex = Math.floor(Math.random() * charArray.length);
      randomKey += charArray[randomIndex];
    }

    return randomKey;
  }
  static isLogin() {
    return Authorization.getAuthorization() !== '';
  }
  static getRequestAuthHeaders() {
    let token = Authorization.getAuthorization();
    let cookieId = Authorization.getCookieId();

    if (!token && !cookieId) {
      Authorization.setAuthorization('');
      token = Authorization.getAuthorization();
      cookieId = Authorization.getCookieId();
    }

    return {
      Authorization: token,
      cookieid: cookieId,
    };
  }
}
