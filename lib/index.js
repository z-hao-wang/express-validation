'use strict'
const Joi = require('joi')
const find = require('lodash/find')
const defaults = require('lodash/defaults')
const ValidationError = require('./validation-error')

const defaultOptions = {
  allowUnknown: true,
  stripUnknown: false,
  flatten: false,
  mutateRequest: true,
  status: 400,
  statusText: 'Bad Request',
}
let globalOptions = {}

const locations = ['body', 'cookies', 'headers', 'params', 'query']

// hasOptions keeps `options` sane
function hasOption (options, property, lookingFor) {
  if (!options) return false
  if (typeof options[property] === 'boolean') return options[property]
  if (
    typeof options === 'object' &&
    typeof options[property] === 'object' &&
    typeof options[property][lookingFor] === 'boolean'
  ) {
    return options[property][lookingFor]
  }
  return false
}

// validation returns an express.js middleware starting from a Joi schema
function validation (schema) {
  if (!schema) throw new Error('Please provide a validation schema')

  // Set default options
  const options = defaults({}, schema.options || {}, globalOptions, defaultOptions)
  const { status, statusText, flatten } = options

  return function validationMiddleware (req, res, next) {
    const errors = []

    for (let i = 0; i < locations.length; i++) {
      const location = locations[i]

      if (schema[location]) {
        const { mutateRequest } = options
        // extracts only required parts from request
        const { body, cookies, headers, params, query } = req
        const context = { body, cookies, headers, params, query }
        // retrieves Joi parameters
        const allowUnknown = hasOption(options, 'allowUnknown', location)
        const stripUnknown = hasOption(options, 'stripUnknown', location)

        const joiOptions = { abortEarly: false, allowUnknown, context, stripUnknown }

        validateProperty(errors, req, schema, location, mutateRequest, joiOptions)
      }
    }

    if (errors.length === 0) return next()
    return next(new ValidationError(errors, status, statusText, flatten))
  }
}

function setOptions (opts) {
  if (!opts) {
    globalOptions = {}
    return
  }

  globalOptions = defaults({}, globalOptions, opts)
}

/**
 * validate checks the current `Request` for validations
 * NOTE: mutates `request` in case the object is valid.
 */
function validateProperty (errObj, request, schema, location, mutateRequest, joiOptions) {
  if (!request || !schema) return

  const { error, value } = Joi.validate(request[location], schema[location], joiOptions)
  if (!error || error.details.length === 0) {
    if (mutateRequest) request[location] = value
    return
  }
  error.details.forEach(function (error) {
    const errorExists = find(errObj, function (item) {
      if (item && item.field === error.path && item.location === location) {
        item.messages.push(error.message)
        item.types.push(error.type)
        return item
      }
      return
    })

    if (!errorExists) {
      errObj.push({
        field: error.path,
        location: location,
        messages: [error.message],
        types: [error.type],
      })
    }
  })
};

exports = module.exports = validation
exports.options = setOptions
exports.ValidationError = ValidationError
