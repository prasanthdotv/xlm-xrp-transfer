import { Joi } from 'express-validation';

const schema = {
  common: {
    body: Joi.object({
      address: Joi.string().required(),
      amount: Joi.string().required(),
    }),
  },
};

module.exports = schema;
