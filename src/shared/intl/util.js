export default {
  getURLParam(param) {
    if (!window.location.search) {
        return undefined;
    }

    const m = new RegExp(param + '=([^&]*)').exec(window.location.search.substring(1));

    if (!m) {
      return undefined;
    }

    return decodeURIComponent(m[1]);
  },
  getURLHashParam(param) {
    const results = new RegExp('[\?&]' + param + '=([^&#]*)').exec(window.location.hash);

    if (results === null){
      return null;
    }

    return results[1] || 0;
  }
};
