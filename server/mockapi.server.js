#!/usr/bin/env node

var path = require('path');

require('app-module-path').addPath(path.join(__dirname, '..'));
require('./server.babel'); // babel registration (runtime transpilation for node)
require('../mockApi/server');
