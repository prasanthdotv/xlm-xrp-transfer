const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../config/env');

const accountSchema = new Schema(
  {
    address: String,
  },
  { strict: false }
);

const XLMAccount = mongoose.model(config.XLM.COLLECTION_NAME, accountSchema);
const XRPAccount = mongoose.model(config.XRP.COLLECTION_NAME, accountSchema);

module.exports = { XLMAccount, XRPAccount };
