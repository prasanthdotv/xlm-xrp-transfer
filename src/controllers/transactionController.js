import express from 'express';
const router = express.Router();

import config from '../config/env';
import { validate } from 'express-validation';
import validatorSchema from '../validators/transferAPIvalidators';
import httpResponse from '../models/httpResponseModel';
import { xlmTransfer, xrpTransfer } from '../services/transactionService';

const xlmTransaction = async (req, res, next) => {
  try {
    const from = config.XLM.ADMIN_ADDRESS;
    const to = req.body.address;
    const amount = req.body.amount;
    const receipt = await xlmTransfer(from, to, amount);
    res.send(new httpResponse(true, { txnHash: receipt.hash }, null));
  } catch (e) {
    next(e);
  }
};

const xrpTransaction = async (req, res, next) => {
  try {
    const from = config.XRP.ADMIN_ADDRESS;
    const to = req.body.address;
    const amount = req.body.amount;
    const receipt = await xrpTransfer(from, to, amount);
    res.send(new httpResponse(true, { txnHash: receipt.hash }, null));
  } catch (e) {
    next(e);
  }
};

router.post('/xlm', validate(validatorSchema.common, { keyByField: true }), xlmTransaction);
router.post('/xrp', validate(validatorSchema.common, { keyByField: true }), xrpTransaction);

module.exports = router;
