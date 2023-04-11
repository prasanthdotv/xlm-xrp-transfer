import validator from 'express-validation';

import logger from '../middleware/logger.js';
import errors from '../constants/errors.js';
import httpResponse from '../models/httpResponseModel.js';

const errorHandler = (err, req, res, next) => {
  logger.error(err);
  if (err instanceof validator.ValidationError) {
    return res
      .status(errors.VALIDATION_ERROR.status)
      .send(
        new httpResponse(false, null, { message: errors.VALIDATION_ERROR.message, details: err })
      );
  } else if (err && Object.keys(errors).includes(err.message)) {
    const ERR = errors[err.message];
    return res.status(ERR.status).send(new httpResponse(false, null, { message: ERR.message }));
  } else {
    return res
      .status(errors.SERVER_ERROR.status)
      .send(new httpResponse(false, null, { message: errors.SERVER_ERROR.message }));
  }
};

module.exports = errorHandler;
