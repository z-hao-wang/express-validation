'use strict';

var Joi = require('@hapi/joi');

module.exports = {
  params: Joi.object().keys({
    id : Joi.number().integer().required()
  })
};
