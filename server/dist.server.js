var Express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var build = require('./../build.settings');


var host = process.env.HOST || 'localhost';
var port = '8080';
var app = new Express();

app.use(serveStatic(path.join(__dirname, '../dist'), {
  index: ['index.html'],
}));

/*
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../static/dist/index.html'));
});
*/

app.listen(port, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧 dist testing server listening on port %s', port);
  }
});
