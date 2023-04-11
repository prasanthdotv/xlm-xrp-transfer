import StellarSdk from 'stellar-sdk';
import * as xrpl from 'xrpl';

import config from '../config/env';
import stellarClient from './stellarClientProvider.js';
import { XLMAccount, XRPAccount } from '../models/accountDbModel';
import rippleClient from './rippleClientProvider';

const xlmTransfer = async (from, to, amount) => {
  const fromWallet = await XLMAccount.findOne({ address: from }).lean();
  if (!fromWallet) {
    throw Error('NO_ADMIN');
  }
  const adminKeyPair = StellarSdk.Keypair.fromSecret(fromWallet.secret);
  const fromAccount = await stellarClient.loadAccount(from);
  const addressValidity = await verifyStellarAccount(to);
  if (addressValidity) {
    const fee = await stellarClient.fetchBaseFee();
    const transaction = new StellarSdk.TransactionBuilder(fromAccount, {
      fee,
      networkPassphrase: StellarSdk.Networks[config.XLM.NETWORK],
    })
      // Add a payment operation to the transaction
      .addOperation(
        StellarSdk.Operation.payment({
          destination: to,
          // The term native asset refers to lumens
          asset: StellarSdk.Asset.native(),
          amount: amount,
        })
      )
      // Make this transaction valid for the next 30 seconds only
      .setTimeout(30)
      .build();

    // Sign this transaction with the secret key
    transaction.sign(adminKeyPair);

    // Let's see the XDR (encoded in base64) of the transaction we just built
    //   console.log(transaction.toEnvelope().toXDR('base64'));

    const transactionResult = await stellarClient.submitTransaction(transaction);
    return transactionResult;
  }
};

const verifyStellarAccount = async (address) => {
  try {
    await stellarClient.loadAccount(address);
    return true;
  } catch (e) {
    throw new Error('INVALID_ACCOUNT');
  }
};

const xrpTransfer = async (from, to, amount) => {
  const adminWallet = await XRPAccount.findOne({ address: from }).lean();
  const fromWallet = xrpl.Wallet.fromSeed(adminWallet.seed);

  if (!fromWallet) {
    throw Error('NO_ADMIN');
  }

  const addressValidity = await verifyRippleAccount(to);
  if (addressValidity) {
    const transaction = await rippleClient.autofill({
      TransactionType: 'Payment',
      Account: fromWallet.classicAddress,
      Amount: xrpl.xrpToDrops(amount),
      Destination: to,
    });
    const signed = fromWallet.sign(transaction);

    const tx = await rippleClient.submitAndWait(signed.tx_blob);
    return { hash: tx.result.hash };
  }
};

const verifyRippleAccount = async (address) => {
  try {
    await rippleClient.request({
      command: 'account_info',
      account: address,
      ledger_index: 'validated',
    });
    return true;
  } catch (e) {
    throw new Error('INVALID_ACCOUNT');
  }
};

module.exports = {
  xlmTransfer,
  xrpTransfer,
};
