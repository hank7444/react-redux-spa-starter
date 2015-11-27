var Express = require('express');
var webpack = require('webpack');
var path = require('path');
var serveStatic = require('serve-static');

var webpackConfig = require('./dev.config');
var config = require('../src/config');

var compiler = webpack(webpackConfig);

var host = process.env.HOST || 'localhost';
var port = config.port;
var serverOptions = {
  quiet: true,
  noInfo: false,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  stats: {colors: true}
};

var app = new Express();

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));
app.use(serveStatic(path.join(__dirname, '..')));

/*
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});
*/

app.listen(port, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', port);
  }
});
