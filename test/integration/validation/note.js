'use strict'
const Joi = require('joi')

exports.body = {
  options: { stripUnknown: { body: true } },
  body: {
    text: Joi.string().max(256).required(),
  },
}

exports.query = {
  options: { stripUnknown: { body: true } },
  query: {
    text: Joi.string().max(256).required(),
  },
}
