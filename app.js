'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./router')

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', router)

const server = app.listen(5000, function () {
  const { port } = server.address()
  console.log('node run at: ', port)
})