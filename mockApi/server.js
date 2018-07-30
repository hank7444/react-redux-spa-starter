import path from 'path';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import bodyParser from 'body-parser';

import { DEFAULT_ERR_MSG_HASH } from 'src/shared/request/ApiErrorCode';
import { getDomainConfig } from '../build.settings';

// routes
import auth from './routes/auth';
import countries from './routes/countries';
import me from './routes/me';
import version from './routes/version';

const { PAGE_NOT_FOUND } = DEFAULT_ERR_MSG_HASH;

const CONTENT_TYPE_ARY = [
  'text/plain',
  'text/html',
  'application/json',
  'application/xml',
  'application/x-www-form-urlencoded',
];

const config = getDomainConfig();
const app = express();


app.use(cors());

// API Server
app.use(session({
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000,
  },
}));


app.use((req, res, next) => {

  if (req.headers['content-type']) {

    // client 傳來 content-type 後面多一個;, 會導致 bodyParser 無法處理
    const contentTypeAry = req.headers['content-type'].replace(';', '').split(' ');

    if (CONTENT_TYPE_ARY.indexOf(contentTypeAry[0]) !== -1) {
      req.headers['content-type'] = contentTypeAry[0];
    } else {
      console.error('==> ERROR: content-type is not supported!!');
    }
  }

  next();
});


app.use(bodyParser.json({
  limit: '200mb',
}));

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '200mb',
  parameterLimit: 100000,
}));

app.use('/myapi/auth', auth);
app.use('/myapi/version', version);
app.use('/myapi/countries', countries);
app.use('/myapi/me', me);


// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(PAGE_NOT_FOUND.status).json(PAGE_NOT_FOUND);
});

const runnable = app.listen(config.__MOCK_API_PORT__, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('==> 🌎 Mock API is running on port %s', config.__MOCK_API_PORT__);
});

if (!config.__MOCK_API_PORT__) {
  console.error('==> ERROR: No PORT environment variable has been specified');
}
