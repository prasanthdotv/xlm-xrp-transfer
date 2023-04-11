import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import log4js from 'log4js';
import 'dotenv/config';

require('./services/initDb');
import routes from './routes/routes.js';
import errorHandler from './middleware/errorHandler.js';
import corsOptionsDelegate from './middleware/corsHandler';
import env from './config/env';
import corsEnabledURLs from './constants/corsUrls';

const app = express();

if (env.NODE_ENV == 'production') {
  if (env.ALLOW_DOMAIN) {
    corsEnabledURLs.push(env.ALLOW_DOMAIN.toLowerCase());
  }
  app.use(cors(corsOptionsDelegate));
} else {
  app.use(cors());
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(log4js.connectLogger(log4js.getLogger(), { level: 'auto' }));

app.use('/api', routes);
app.use(errorHandler);

module.exports = app;
