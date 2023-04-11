import log4js from 'log4js';
import fs from 'fs';

import config from '../config/log4js.js';

try {
  fs.mkdirSync('./log');
} catch (e) {
  if (e.code != 'EEXIST') {
    console.error('Could not set up log directory, error was: ', e);
    process.exit(1);
  }
}
log4js.configure(config);

const logger = log4js.getLogger();

module.exports = logger;
