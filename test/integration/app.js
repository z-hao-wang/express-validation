'use strict'

var express = require('express')
var validate = require('../../lib/index')
var http = require('http')
var validation = require('./validation')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var app = express()

app.use(bodyParser.json())
app.use(cookieParser())

app.set('port', 3000)

// generates a response function sending back to user the specified req[key]
function respondWith (key) {
  return function (req, res) {
    res.json(req[key])
  }
}

function status200 (req, res) {
  res.sendStatus(200)
}

app.get('/search', validate(validation.search), status200)
app.get('/user', validate(validation.user.get), status200)

app.get('/account/:id', validate(validation.account), respondWith('params'))
app.get('/note', validate(validation.note.query), respondWith('query'))
app.get('/parsing/cookies', validate(validation.parsing.cookies), respondWith('cookies'))
app.get('/parsing/headers', validate(validation.parsing.headers), respondWith('headers'))
app.get('/parsing/params/:id?', validate(validation.parsing.params), respondWith('params'))
app.get('/parsing/query', validate(validation.parsing.query), respondWith('query'))

app.post('/allow-unknown', validate(validation.allowUnknown), respondWith('body'))
app.post('/array', validate(validation.array), status200)
app.post('/body-array', validate(validation.bodyArray), status200)
app.post('/body-array-complex', validate(validation.bodyArrayComplex), status200)
app.post('/context/:id', validate(validation.context), status200)
app.post('/login', validate(validation.login), status200)
app.post('/logout', validate(validation.logout), status200)
app.post('/options', validate(validation.options), status200)
app.post('/register', validate(validation.register.post), status200)

app.post('/defaults', validate(validation.defaults), respondWith('body'))
app.post('/empty', validate(validation.empty), respondWith('body'))
app.post('/note', validate(validation.note.body), respondWith('body'))
app.post('/parsing/body', validate(validation.parsing.body), respondWith('body'))
app.post('/rename', validate(validation.rename), respondWith('body'))
app.post('/strip', validate(validation.strip), respondWith('body'))

app.put('/user/:id', validate(validation.user.put), status200)

// default errorhandler for express-validation
app.use(function (err, req, res, next) {
  res.status(400).json(err)
})

http.createServer(app)
module.exports = app
