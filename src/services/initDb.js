import mongoose from 'mongoose';

import config from '../config/env';
import logger from '../middleware/logger';
const dbURI = config.DB_URI + config.DB_NAME;

mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
  logger.info('Connected to ' + dbURI);
});

mongoose.connection.on('error', (err) => {
  logger.error('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  logger.info('Mongoose default connection disconnected');
  mongoose.connect(dbURI, { server: { auto_reconnect: true } });
});
