import express from 'express';
const router = express.Router();
import { Keypair } from 'stellar-sdk';
import * as xrpl from 'xrpl';

import logger from '../middleware/logger';
import config from '../config/env';
import { XLMAccount, XRPAccount } from '../models/accountDbModel.js';
import httpResponse from '../models/httpResponseModel';
import rippleClient from '../services/rippleClientProvider';

/**
 * To create Admin wallet for Stellar coin transfer and store the details in the DB
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
const createXlmAdmin = async (req, res, next) => {
  try {
    const keypair = Keypair.random();
    const xlmAccCollection = new XLMAccount({
      address: keypair.publicKey(),
      secret: keypair.secret(),
      rawSecretKey: keypair.rawSecretKey(),
      type: keypair.type,
    });
    xlmAccCollection.save();

    logger.info('Added Stellar admin account details to DB');
    /*
    Stellar account needs a reserve amount of XLM to get activated.
    Can be done through https://laboratory.stellar.org/#account-creator?network=test
    for testnet
    */
    return res.send(new httpResponse(true, { address: keypair.publicKey() }));
  } catch (err) {
    next(err);
  }
};

/**
 * To create Admin wallet for Ripple coin transfer and store the details in the DB
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
const createXrpAdmin = async (req, res, next) => {
  try {
    /*
    Ripple account needs a reserve amount of XRP to get activated.
    For testnet it is managed by the code itself.
    In testnet every generated address will be prefunded with 1000 XRPs.
    */
    let wallet;
    if (config.XRP.NETWORK == 'PUBLIC') {
      wallet = xrpl.Wallet.generate();
    } else if (config.XRP.NETWORK == 'TESTNET') {
      const fundResult = await rippleClient.fundWallet(); //Prefunding
      wallet = fundResult.wallet;
    }
    const xrpAccCollection = new XRPAccount({
      address: wallet.classicAddress,
      ...wallet,
    });
    xrpAccCollection.save();

    logger.info('Added Ripple admin account details to DB');

    return res.send(new httpResponse(true, { address: wallet.classicAddress }));
  } catch (err) {
    next(err);
  }
};

router.get('/xlm', createXlmAdmin);
router.get('/xrp', createXrpAdmin);
module.exports = router;
