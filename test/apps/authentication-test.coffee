require '../_helper'
express = require 'express'
assert  = require 'assert'
request = require 'request'
app     = require '../../server'

describe 'authentication', ->
  describe 'GET /login', ->
    body = null
    before (done)->
      request {uri: "http://localhost:#{app.settings.port}/login"}, (err, response, _body) ->
        console.log(_body)
        body = _body
        done()
    it "has user field", ->
      assert.ok /user/.test(body)