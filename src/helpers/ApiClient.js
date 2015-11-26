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
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        if (params) {
          request.query(params);
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));

        /*
        request.end(function(err, body) {

          console.log('body', body);
          return err ? reject(body || err) : resolve(body);
        });
        */


        /*
        request.end(function(err) {
          var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

          var body = _ref2.body;

          console.log('body', body);
          return err ? reject(body || err) : resolve(body);
        });
        */

      }));
  }
}

const ApiClient = _ApiClient;

export default ApiClient;
