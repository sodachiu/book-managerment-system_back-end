'use strict';

const express = require('express')
const boom = require('boom')
const { body, validationResult } = require('express-validator')

const Result = require('../../modules/Result')
const { login, findUser } = require('../../service/user')
const { createToken } = require('../jwt')
const router = express.Router()

router.post(
  '/login',
  [
    body('username').isString().withMessage('username类型错误'),
    body('password').isString().withMessage('password类型错误')
  ],
  (req, res, next) => {
    const { username, password } = req.body
    login(username, password).then(user => {
      // body params type validate
      const { errors } = validationResult(req)
      if (errors && errors.length !== 0) {
        console.log('express-validator err in login: ', errors)
        next(boom.badRequest('参数类型错误'))
      }

      // no user matched
      if (!user || user.length === 0) {
        throw new Error('用户名不存在')
      }

      // matched
      const [{ username }] = user
      const token = createToken({ username })
      console.log('login success, token: ', token)
      new Result('用户信息验证成功', { token }).success(res)

    }).catch(err => {
      console.log('login err: ', err)
      new Result('用户名不存在', err).fail(res)
    })
})

router.get('/info', (req, res, next) => {
  console.log('into /user/info')

  const { username } = req.user
  if (!username) {
    new Result().tokenErr(res)
  }

  findUser(username).then(user => {
    if (!user || user.length === 0) {
      throw new Error('用户名不存在')
    }

    const { avatar, role } = user
    console.log('get user/info avatar: ', avatar, ' and roles: ', role)
    new Result('用户信息获取成功', {
      roles: role,
      avatar
    }).success(res)
  }).catch(err => {
    console.log('get user/info err: ', err)
    new Result('用户名不存在').fail(res)
  })
})

module.exports = router