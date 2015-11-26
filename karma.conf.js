var webpack = require('webpack');

module.exports = function(config) {

  var plugins = [
    'karma-webpack',
    'karma-mocha',
    'karma-mocha-reporter',
    'karma-sourcemap-loader',
    'karma-chrome-launcher',
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

    singleRun: !!process.env.CONTINUOUS_INTEGRATION,

    frameworks: [ 'mocha' ],

    files: [
      //'./node_modules/phantomjs-polyfill/bind-polyfill.js',
      './webpack/test.config.js'
    ],

    preprocessors: {
      './webpack/test.config.js': ['webpack', 'sourcemap']
    },

    reporters: ['mocha'],

    plugins: plugins,

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.(jpe?g|png|gif|svg)$/, loader: 'url', query: {limit: 10240} },
          { test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
          { test: /\.json$/, loader: 'json-loader' },
          { test: /\.less$/, loader: 'style!css!less' },
          { test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap' }
        ]
      },
      resolve: {
        modulesDirectories: [
          'src',
          'node_modules'
        ],
        extensions: ['', '.json', '.js']
      },
      plugins: [
        new webpack.IgnorePlugin(/\.json$/),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          __CLIENT__: true,
          __SERVER__: false,
          __DEVELOPMENT__: true,
          __DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE
        })
      ]
    },
    colors: true,
    autoWatch: autoWatch,
    singleRun: singleRun,
    webpackServer: {
      noInfo: true
    }

  });
};
