const webpack = require('webpack');
const ip = require('ip');

const ENV = process.env.ENV || 'local';
const PROTOCOL = 'https';
const hostIP = ip.address() || 'localhost';
const now = new Date();

const defaultDomain = {
  __TIMESTAMP__: new Date().getTime(),
  __ENV__: ENV,
  __DEVELOPMENT__: false,
  __FASHION_ENGINE_SERVER__: '',
  __IS_STATIC_SERVER_HOST__: true,
  __SERVER_URL__: `${PROTOCOL}://test.myserver.com`,
  __GOOGLE_CLIENT__: '',
  __FACEBOOK_CLIENT__: '',
  __GA_TRACK_ID__: '',
  __MOCK_API_HOST__: 'http://localhost',
  __MOCK_API_PORT__: 3030,
  __MOCK_API_IS_USE__: true,
  __WHY_DID_YOU_UPDATE: false,
};


const config = {
  local: {
    webpack: './webpack/config.local.js',
    domain: Object.assign({}, defaultDomain, {
      __DEVELOPMENT__: true,
      __FASHION_ENGINE_SERVER__: '',
      __SENTRY_DISABLED__: true,
    }),
  },
  dev: {
    webpack: './webpack/config.dev.js',
    domain: Object.assign({}, defaultDomain, {
      __DEVELOPMENT__: true,
      __IS_STATIC_SERVER_HOST__: false,
    }),
  },
  stage: {
    webpack: './webpack/config.stage.js',
    domain: Object.assign({}, defaultDomain, {
      __SERVER_URL__: `${PROTOCOL}://beta.myserver.me`,
      __GOOGLE_CLIENT__: '',
      __FACEBOOK_CLIENT__: '',
      __GA_TRACK_ID__: '',
      __IS_STATIC_SERVER_HOST__: false,
    }),
  },
  production: {
    webpack: './webpack/config.prod.js',
    domain: Object.assign({}, defaultDomain, {
      __SERVER_URL__: `${PROTOCOL}://www.myserver.me`,
      __GOOGLE_CLIENT__: '',
      __FACEBOOK_CLIENT__: '',
      __GA_TRACK_ID__: '',
      __IS_STATIC_SERVER_HOST__: false,
    }),
  },
};

function getEnvConfig() {
  if (ENV && config[ENV]) {
    return config[ENV];
  }
  return config.local;
}

const build = {
  defineJsConstants() {
    const constants = getEnvConfig().domain;

    Object.keys(constants).forEach((key) => {
      constants[key] = JSON.stringify(constants[key]);
    });

    if (ENV === 'production') {
      constants['process.env'] = {
        NODE_ENV: JSON.stringify('production'),
      };
    }

    return new webpack.DefinePlugin(constants);
  },
  getWebpackConfig() {
    return getEnvConfig().webpack;
  },
  getDomainConfig() {
    return getEnvConfig().domain;
  },
  getHostIP() {
    return hostIP;
  },
};

module.exports = build;
