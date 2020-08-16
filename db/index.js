'use strict';
const mysql = require('mysql')

const config = require('./config')

function connect() {
  return mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
  })
}

function querySql(sql) {
  console.log('in querySql, sql statement: ', sql)
  const conn = connect()
  return new Promise(((resolve, reject) => {
    try {
      conn.query(sql, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    } catch (e) {
      reject(e)
    } finally {
      conn.end()
    }
  }))
}

function queryOne(sql) {
  console.log('in queryOne, sql statement: ', sql)
  const conn = connect()
  return new Promise(((resolve, reject) => {
    try {
      conn.query(sql, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result[0])
        }
      })
    } catch (e) {
      reject(e)
    } finally {
      conn.end()
    }
  }))
}

module.exports = {
  queryOne,
  querySql
}

