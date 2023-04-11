import * as xrpl from 'xrpl';

import config from '../config/env';

const client = new xrpl.Client(config.XRP.URL[config.XRP.NETWORK]);

(async () => {
  await client.connect();
})();

module.exports = client;
