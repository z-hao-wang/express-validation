'use strict'

const should = require('should')
const request = require('supertest')
const app = require('./app')

describe('when specified allowUnknown on a specific property', function () {
  it('should not disallow from other request properties', function (done) {
    const payload = {
      id: '7',
      session: '0123456789abcdef',
      another: 'yes',
    }

    request(app).post('/allow-unknown').send(payload).expect(200)
    .end(function (err, res) {
      console.dir(res.body, { depth: null })
      res.statusCode.should.equal(200)
      should(res.body).have.keys('id', 'session', 'another')
      done()
    })
  })
})
