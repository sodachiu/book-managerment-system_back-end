'use strict';
const express = require('express')
const boom = require('boom')

const userRouter = require('../router/user')
const Result = require('../modules/Result')
const { jwtAuth } = require('./jwt')

const router = express.Router()
router.use(jwtAuth)
router.use('/user', userRouter)

router.use((req, res, next) => {
  next(boom.notFound('page not found'))
})

router.use((err, req, res, next) => {
  console.log('err: ', err)
  if (err.name === 'UnauthorizedError') {
    new Result(err).tokenErr(res)
  } else {
    // complete boom status
    new Result(err).fail(res)
  }
})

module.exports = router
