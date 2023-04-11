const config = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'dev',
  ALLOW_DOMAIN: process.env.ALLOW_DOMAIN,
  DB_URI: process.env.DB_URI,
  DB_NAME: process.env.DB_NAME,
  XLM: {
    NETWORK: process.env.XLM_NETWORK || 'TESTNET',
    HORIZON_URL: {
      TESTNET: 'https://horizon-testnet.stellar.org',
      PUBLIC: 'https://horizon.stellar.org',
    },
    COLLECTION_NAME: process.env.XLM_COLLECTION_NAME || 'account_collections_xlms',
    ADMIN_ADDRESS: process.env.XLM_ADMIN_ADDRESS,
  },
  XRP: {
    NETWORK: process.env.XRP_NETWORK || 'TESTNET',
    URL: {
      TESTNET: 'wss://s.altnet.rippletest.net:51233',
      PUBLIC: 'wss://xrplcluster.com/',
    },
    COLLECTION_NAME: process.env.XRP_COLLECTION_NAME || 'account_collections_xrps',
    ADMIN_ADDRESS: process.env.XRP_ADMIN_ADDRESS,
  },
};
module.exports = config;
