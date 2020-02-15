var Joi = require('@hapi/joi');

const validNumbers = [1, 2, 3, 4, 5];
module.exports = {
  body: Joi.object().keys({
    numbers: Joi.array().items(Joi.number().valid(...validNumbers)),
    validate_numbers: Joi.array().items(Joi.number().valid(...validNumbers.slice(0, 2))).optional(),
  }).required(),
};
