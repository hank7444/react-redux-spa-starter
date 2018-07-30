const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const build = require('./../build.settings');
const babelConfig = require('./babelConfig');

babelConfig.presets.push('react-hmre');
babelConfig.plugins.push(
  ['react-transform', {
    transforms: [{
      transform: 'react-transform-hmr',
      imports: ['react'],
      locals: ['module'],
    }, {
      transform: 'react-transform-catch-errors',
      imports: ['react', 'redbox-react'],
    }],
  }],
);

module.exports = {
  mode: 'development',
  // devtool: 'eval-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    bundle: ['./src/index.js'],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          /node_modules/,
        ],
        use: [
          {
            loader: 'babel-loader',
            options: babelConfig,
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf)(\?*[a-z|A-Z|0-9]*)$/,
        use: ['url?prefix=font/&limit=5000'],
      },
      {
        test: /\.(jpe?g|png|gif|svg|cur)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../src'),
    ],
    extensions: ['.json', '.js', '.css', '.scss'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'static/index.tpl',
      inject: 'body',
      chunks: ['bundle', 'node-static'],
      filename: 'index.html',
    }),

    build.defineJsConstants(),
  ],
};
