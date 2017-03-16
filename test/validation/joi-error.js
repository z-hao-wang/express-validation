'use strict';

var Joi = require('joi');

module.exports = {
  body: {
    email: Joi.string().error(new Error('Expected a string, actually!')),
    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
  }
};
