'use strict'

const should = require('should')
const request = require('supertest')
const app = require('./app')

describe('when specified stripUnknown on a specific property', function () {
  it('should be stripped from request', function (done) {
    const payload = {
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      password: '12356',
    }

    request(app).post('/note').send(payload).expect(200)
    .end(function (err, res) {
      res.statusCode.should.equal(200)
      should(res.body).not.have.key('password')
      should(res.body).have.key('text')
      done()
    })
  })

  it('should not strip from other properties', function (done) {
    const payload = {
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      password: '12356',
    }

    request(app).get('/note').query(payload).expect(200)
    .end(function (err, res) {
      res.statusCode.should.equal(200)
      should(res.body).have.key('password')
      should(res.body).have.key('text')
      done()
    })
  })
})
