'use strict';

var Joi = require('@hapi/joi');

module.exports = {
  query: Joi.object().keys({
    q: Joi.string().required()
  })
};
