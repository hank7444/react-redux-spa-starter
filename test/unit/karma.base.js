var webpackConfig = require('../../webpack/config.test');

module.exports = {
  browsers: ['ChromeHeadless'],
  frameworks: ['jasmine'],
  colors: true,
  autoWatch: true,
  files: [
    './index.js',
  ],
  preprocessors: {
    './index.js': ['webpack', 'sourcemap'],
  },
  reporters: ['spec'],
  specReporter: {
    maxLogLines: 2,
    suppressErrorSummary: true,
    suppressPassed: true,
    suppressSkipped: true,
  },
  webpack: webpackConfig,
  webpackMiddleware: {
    noInfo: true,
  },
  customLaunchers: {
    ChromeHeadless: {
      base: 'Chrome',
      flags: [
        '--headless',
        '--remote-debugging-port=9222',
      ],
    },
  },
};
