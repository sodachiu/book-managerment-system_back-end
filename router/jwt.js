'use strict';
const jwt = require('jsonwebtoken')

const {
  PRIVATE_KEY,
  TOKEN_EXPIRED
} = require('../utils/constant')

function createToken(payload) {
  if ('[object Object]' !== Object.prototype.toString.apply(payload)) {
    payload = { payload }
  }
  return jwt.sign(payload, PRIVATE_KEY, { expiresIn: TOKEN_EXPIRED })
}

function decode(authorization) {
  if (!authorization) {
    throw new Error('无效 token')
  }

  let token = ''
  if (authorization.indexOf('Bearer ') === 0) {
    token = authorization.replace('Bearer ', '')
  } else {
    token = authorization
  }

  return jwt.decode(token, PRIVATE_KEY)
}

module.exports = {
  createToken,
  decode
}

