'use strict';
const {
  querySql,
  queryOne
} = require('../db/index')
const { md5 } = require('../utils/index')
const { PWD_SALT } = require('../utils/constant')

function login(username, password) {
  password = md5(`${password}${PWD_SALT}`)
  const sql = `select * from admin_user where username='${username}' and password='${password}'`
  return querySql(sql)
}

function findUser(username) {
  const sql = `select * from admin_user where username='${username}'`
  return queryOne(sql)
}

module.exports = {
  login,
  findUser
}

