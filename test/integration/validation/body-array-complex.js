const Joi = require('joi')

module.exports = {
  body: Joi.array().items(Joi.object({
    from: Joi.number().valid([1, 2, 3, 4, 5]).required(),
    to: Joi.number().min(Joi.ref('from')).required(),
  })),
}
