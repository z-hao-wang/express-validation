'use strict';
require('should');
var validation = require('../lib/index');

describe('when Joi throws an error', function () {

  it('should gracely handle the custom Joi Error', function () {

    var validationHandler = validation(require('./validation/joi-error'));
    var fakeReq = {
      body: {
        email: 33,
        password: '12356'
      }
    };

    validationHandler(fakeReq, undefined, function next (err) {
      err.should.be.instanceof(validation.ValidationError);
      err.errors.length.should.equal(1);
      err.status.should.equal(400);
      err.statusText.should.equal('Bad Request');
    });
  });

});
