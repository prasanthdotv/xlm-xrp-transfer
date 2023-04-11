import express from 'express';
const router = express.Router();

import transactionAPIs from '../controllers/transactionController';
import accountAPIs from '../controllers/accountController';

router.use('/transfer', transactionAPIs);
router.use('/account', accountAPIs);

module.exports = router;
