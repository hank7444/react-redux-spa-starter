var webpack = require('webpack');

module.exports = function(config) {

  var plugins = [
    'karma-webpack',
    'karma-jasmine',
    'karma-mocha-reporter',
    'karma-sourcemap-loader',
    'karma-chrome-launcher'
  ];

  var browsers = ['Chrome'];
  var autoWatch = true;
  var singleRun = false;

  if (process.env.TEST_ENV === 'all') {

    browsers = browsers.concat(['Safari', 'Firefox']);

    plugins = plugins.concat([
      'karma-firefox-launcher',
      'karma-safari-launcher'
    ]);
    autoWatch = false;
    singleRun = true;
  }

  config.set({

    browsers: browsers,

    frameworks: ['jasmine'],

    colors: true,
    autoWatch: autoWatch,
    singleRun: singleRun,

    files: [
      //'./node_modules/phantomjs-polyfill/bind-polyfill.js',
      './webpack/test.preprocessors.js'
    ],

    preprocessors: {
      './webpack/test.preprocessors.js': ['webpack', 'sourcemap']
    },

    reporters: ['mocha'],

    plugins: plugins,

    webpack: require('./webpack/test.config'),
    webpackServer: {
      noInfo: true
    }

  });
};
