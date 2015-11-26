import superagent from 'superagent';
import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;

  if (config.useMockApi) {
    return 'http://localhost:' + config.mockApiPort + adjustedPath;
  }
  return adjustedPath;
}

class ApiClient {
  constructor() {
    methods.forEach((method) =>
      this[method] = (path, { params, data, output } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));
        let resolveFunc = (body) => resolve(body);

        if (params) {
          request.query(params);
        }

        if (data) {
          request.send(data);
        }

        if (output && output instanceof Function) {
          resolveFunc = (body) => output(body, resolve);
        }
        request.end((err, { body } = {}) => err ? reject(body || err) : resolveFunc(body));

      }));
  }
}

export default new ApiClient();
