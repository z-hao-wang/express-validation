'use strict'
var Joi = require('joi')

module.exports = {
  options: { allowUnknown: { cookies: false } },
  body: {
    id: Joi.string().regex(/^[0-9]+$/).required(),
    session: Joi.string().regex(/^[a-zA-Z0-9]{16}$/).required(),
  },
}
