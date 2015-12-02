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
          {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
          {test: /\.json$/, loader: 'json-loader' },
          {test: /\.css$/, loader: 'style-loader!css-loader'},
          {test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'},
          {test: /\.(jpe?g|png|gif|svg)$/, loader: 'url', query: {limit: 8192}}
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
    webpackServer: {
      noInfo: true
    }

  });
};
