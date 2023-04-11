module.exports = Object.freeze({
  SERVER_ERROR: {
    status: 500,
    message: 'Internal Server Error.',
  },
  VALIDATION_ERROR: {
    status: 400,
    message: 'Validation Failed.',
  },
  INSUFFICIENT_BALANCE: {
    status: 520,
    message: 'Insufficient Balance. Please recharge the account before trying again.',
  },
  NO_ADMIN: {
    status: 501,
    message: 'Please create an Admin account',
  },
  CORS_DISABLED: {
    status: 401,
    message: 'CORS Disabled',
  },
  INVALID_ACCOUNT: {
    status: 440,
    message: 'Receiver account does not exist on chain',
  },
});
