'use strict'
require('should')
const app = require('./app')
const request = require('supertest')

describe('when the request body is an array', function () {
  it('should handle it correctly', function (done) {
    const payload = [4, 2, 1]

    request(app).post('/body-array').send(payload).expect(200)
    .end(function (err, res) {
      res.statusCode.should.equal(200)
      done()
    })
  })

  it('should validate complex array bodies as well', function (done) {
    const payload = [
      { from: 5, to: 10 },
      { from: 4, to: 7 },
    ]

    request(app).post('/body-array-complex').send(payload).expect(200)
    .end(function (err, res) {
      res.statusCode.should.equal(200)
      done()
    })
  })
})
