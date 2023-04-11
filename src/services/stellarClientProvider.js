import StellarSdk from 'stellar-sdk';

import config from '../config/env.js';

const server = new StellarSdk.Server(config.XLM.HORIZON_URL[config.XLM.NETWORK]);

module.exports = server;
