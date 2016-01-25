//require('babel-polyfill');
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var assetsPath = path.resolve(__dirname, '../static/dist');
var host = 'localhost';
var port = 3000;

var babelrc = fs.readFileSync('./.babelrc');
var babelrcObject = {};

try {
  babelrcObject = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

var babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};
var babelLoaderQuery = Object.assign({}, babelrcObject, babelrcObjectDevelopment);
delete babelLoaderQuery.env;

babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];
if (babelLoaderQuery.plugins.indexOf('react-transform') < 0) {
  babelLoaderQuery.plugins.push('react-transform');
}

babelLoaderQuery.extra = babelLoaderQuery.extra || {};
if (!babelLoaderQuery.extra['react-transform']) {
  babelLoaderQuery.extra['react-transform'] = {};
}
if (!babelLoaderQuery.extra['react-transform'].transforms) {
  babelLoaderQuery.extra['react-transform'].transforms = [];
}
babelLoaderQuery.extra['react-transform'].transforms.push({
  transform: 'react-transform-hmr',
  imports: ['react'],
  locals: ['module']
});


module.exports = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      'babel-polyfill',
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
      './src/index.js'
    ]
  },
  output: {
    path: assetsPath,
    filename: 'bundle.js',
    publicPath: 'http://' + host + ':' + port + '/static/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          plugins: ['transform-runtime', 'transform-decorators-legacy'],
          presets: ['es2015', 'stage-0', 'react', 'react-hmre'],
        },
        "plugins": [
        // must be an array with options object as second item
        ["react-transform", {
          // must be an array of objects
          "transforms": [{
            // can be an NPM module name or a local path
            "transform": "react-transform-hmr",
            // see transform docs for "imports" and "locals" dependencies
            "imports": ["react"],
            "locals": ["module"]
          }, {
            // you can have many transforms, not just one
            "transform": "react-transform-catch-errors",
            "imports": ["react", "redbox-react"]
          }, {
            // can be an NPM module name or a local path
            "transform": "./src/my-custom-transform"
          }]
          // by default we only look for `React.createClass` (and ES6 classes)
          // but you can tell the plugin to look for different component factories:
          // factoryMethods: ["React.createClass", "createClass"]
        }]
      ]
      },
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'},
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.(jpe?g|png|gif|svg)$/, loader: 'url', query: {limit: 8192}} // // 當圖片大小小於 xk 時使用 base64 URL, 其餘使用直接連接到圖片的 URL
    ]
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js']
  },
  plugins: [
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true,
      __DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE
    })
  ]
};
