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

class _ApiClient {
  constructor() {
    methods.forEach((method) =>
      this[method] = (path, { params, data, output } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        if (params) {
          request.query(params);
        }

        if (data) {
          request.send(data);
        }

        if (output) {
          request.end((err, { body } = {}) => err ? reject(body || err) : output(body, resolve));
        } else {
          request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
        }


      }));
  }
}

const ApiClient = _ApiClient;

export default ApiClient;
