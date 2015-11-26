var Express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var config = require('../src/config');
var host = process.env.HOST || 'localhost';
var port = config.port;

var app = new Express();

app.use(serveStatic(path.join(__dirname, '..')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(port, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧 production testing server listening on port %s', port);
  }
});
