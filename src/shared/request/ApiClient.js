import superagent from 'superagent';

import API_PATH_HASH from 'shared/request/ApiPathHash';
import { DEFAULT_ERR_MSG_HASH, DEFAULT_ERR_EXCEPTION_MSG_HASH, DEFAULT_ERR_HTTP_STATUS_MSG_HASH } from './ApiErrorCode';
import Authorization from './../auth/Authorization';

const SERVER_URL = API_PATH_HASH.server;
const METHODS = ['get', 'post', 'put', 'patch', 'del'];

const CONTENT_TYPE_HASH = {
  text: 'text/plain',
  html: 'text/html',
  json: 'application/json',
  xml: 'application/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  form: 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded',
};

const TIMEOUT_MS = 10000;

export function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;

  if (__ENV__ === 'test') {
    return adjustedPath;
  }

  if (__MOCK_API_IS_USE__) {
    return `${__MOCK_API_HOST__}:${__MOCK_API_PORT__}${adjustedPath}`;
  }

  return `${SERVER_URL}${adjustedPath}`;
}

function formartResult(body, text) {
  let result;

  if (body) {
    result = body;
  } else {
    result = text;
  }

  return {
    status: 200,
    result,
  };
}


function getErrorObj(errObj) {
  const unknownError = DEFAULT_ERR_EXCEPTION_MSG_HASH.UNKNOWN;
  const errOutput = {
    status: unknownError.status,
    err: {
      status: unknownError.status,
      code: unknownError.errorCode,
      msg: unknownError.message,
    },
  };


  if (errObj) {
    errOutput.status = errObj.status;

    Object.assign(errOutput.err, {
      status: errObj.status,
      code: errObj.errorCode,
      msg: errObj.message,
    });
  }

  return errOutput;
}

function errorFormatter(agentErr, body, bodyText, httpStatus) {
  if (!agentErr) {
    return null;
  }

  let errOutput = getErrorObj();

  // superagent error
  if (agentErr.message.indexOf('Request has been terminated') !== -1) {
    errOutput = getErrorObj(DEFAULT_ERR_EXCEPTION_MSG_HASH.DISCONNECTED);
  }

  // superagent timeout error
  if (agentErr.message.indexOf('Timeout of') !== -1 && agentErr.message.indexOf('exceeded') !== -1) {
    errOutput = getErrorObj(DEFAULT_ERR_EXCEPTION_MSG_HASH.TIMEOUT);
  }

  // server return error
  if (body) {
    try {
      const errorResult = body;
      const message = errorResult.message;
      let errObj;

      if (DEFAULT_ERR_MSG_HASH[message]) {
        errObj = DEFAULT_ERR_MSG_HASH[message];
      } else if (DEFAULT_ERR_HTTP_STATUS_MSG_HASH[httpStatus]) {
        errObj = DEFAULT_ERR_HTTP_STATUS_MSG_HASH[httpStatus];
      }

      errOutput = getErrorObj(errObj);

    } catch (error) {
      errOutput.err.msg = bodyText;
    }
  }

  return errOutput;
}

class Request {
  static getRequest(path, method, { params = {}, isExternal = false, requestType = 'form', responseType = '', responseTimeout = { deadline: TIMEOUT_MS } } = {}) {
    const request = Request.getHttpClient(path, method, isExternal);

    Request.setQueryParams(request, method, params);
    Request.setDefaultHeaders(request, method, requestType);
    Request.setResponseType(request, responseType);
    Request.setResponseTimeout(request, responseTimeout);

    /*
    if (!__MOCK_API_IS_USE__) {
      // 沒有這行，cross domain拿到的cookie不會set, 只有不使用useMockApi才加上
      request.withCredentials();
    }
    */

    return request;
  }
  static getHttpClient(path, method, isExternal) {

    // 如果是外部第三方API就不需透過formatUrl, 避免自己的API路徑被加上
    const _path = isExternal ? path : formatUrl(path);

    return superagent[method](_path);
  }
  static setQueryParams(request, method, params) {
    if (method === 'get') {
      params.t = new Date().getTime();
    }

    request.query(params);
  }
  static setDefaultHeaders(request, method, requestType) {
    const headers = {};
    /* CORS 規範
      只用GET, HEAD, POST方法
      標頭必須為下列類型：Accept, Accept-Language, Content-Language(不區分大小寫),
      或者是Content-Type必須為下列application/x-www-form-urlencoded, multipart/form-data,
      或text/plain其中一種。
      沒有自訂義的標頭，例如X-Modified等等。
    */
    headers['Content-Type'] = 'text/plain';

    if (method !== 'get') {
      headers['Content-Type'] = `${CONTENT_TYPE_HASH[requestType]};`;
    }

    Object.assign(headers, Authorization.getRequestAuthHeaders());

    request.set(headers);
  }

  static setResponseType(request, responseType) {

    if (responseType) {
      request.responseType(responseType);
    }
  }

  static setResponseTimeout(request, responseTimeout) {

    if (responseTimeout) {
      request.timeout(responseTimeout);
    }
  }

  static setEndCallback(request, { resolveFunc, endCallback, resolve, reject } = {}) {
    let endFunc;

    if (resolveFunc && resolveFunc instanceof Function) {
      endFunc = (body) => {
        resolve(resolveFunc(body));
      };
    } else {
      endFunc = (body) => resolve(body);
    }

    request.end((err, resp) => {
      const _resp = resp || {};
      const { body, text, status } = _resp;
      const _err = errorFormatter(err, body, text, status);

      if (endCallback && typeof endCallback === 'function') {
        return endCallback(_err, formartResult(body, text), resolve, reject);
      }

      return _err ? reject(_err) : endFunc(formartResult(body, text));
    });
  }
}

class ApiClient {
  static postByForm(path, params, method = 'get') {
    const _path = formatUrl(path);
    const form = document.createElement('form');
    form.setAttribute('method', method);
    form.setAttribute('action', _path);
    form.setAttribute('target', '_blank');

    const data = JSON.stringify(params);

    const hiddenField = document.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', 'data');
    hiddenField.setAttribute('value', data);
    form.appendChild(hiddenField);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  }
  static getInstance() {
    if (!ApiClient._instance) {
      ApiClient._instance = new ApiClient();
    }

    return ApiClient._instance;
  }

  constructor() {
    METHODS.forEach((method) => {
      this[method] = (path, { headers = {}, isExternal = false, requestType = 'form', responseType, responseTimeout = { deadline: TIMEOUT_MS }, params = {}, data = {}, resolveFunc, endCallback } = {}) => {

        return new Promise((resolve, reject) => {

          const request = Request.getRequest(path, method, { isExternal, requestType, responseType, responseTimeout, params });

          Object.assign(request.header, headers);

          request.set(headers);

          request.send(data);

          Request.setEndCallback(request, { resolveFunc, endCallback, resolve, reject });
        });
      };
    });
  }
  uploadFiles(path, { files = [], isExternal = false, requestType = 'form', responseType, params = {}, data = {}, progressCallback, resolveFunc, endCallback } = {}) {
    return new Promise((resolve, reject) => {
      const request = Request.getRequest(path, 'post', { isExternal, requestType, responseType, params });
      const _progressCallback = typeof progressCallback === 'function' ? progressCallback : () => { };

      files.forEach((file) => {
        request.attach(file.name, file);
      });

      request.on('progress', (e) => {
        _progressCallback(e.percent);
      });

      if (data && typeof data === 'object') {
        Object.keys(data).forEach((key) => {
          request.field(key, data[key]);
        });
      }

      Request.setEndCallback(request, { resolveFunc, endCallback, resolve, reject });
    });
  }
}

export default ApiClient;
