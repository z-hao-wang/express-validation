const Joi = require('joi')

module.exports = {
  body: Joi.array().items(Joi.number().valid([1, 2, 3, 4, 5])),
}
