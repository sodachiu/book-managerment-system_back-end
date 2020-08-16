'use strict';
const {
  CODE_ERROR,
  CODE_SUCCESS,
  CODE_TOKEN_ERROR
} = require('../utils/constant')

class Result {
  constructor(msg, data, options) {
    if (arguments.length === 1) {
      typeof(msg) === 'string' ? this.msg = msg : this.data = data
    } else if (arguments.length === 2) {
      this.msg = msg
      this.data = data
    } else if (arguments.length >= 3) {
      this.msg = msg
      this.data = data
      this.options = options
    }
  }

  createResult() {
    if (!this.code) {
      this.code = CODE_SUCCESS
    }
    if (!this.msg) {
      this.msg = 'success'
    }
    let result = {
      code: this.code,
      msg: this.msg
    }
    if (this.data) {
      result.data = this.data
    }
    if (this.options) {
      result.options = this.options
    }
    return result
  }

  json(res) {
    res.json(this.createResult())
  }

  success(res) {
    this.code = CODE_SUCCESS
    this.json(res)
  }

  fail(res) {
    this.code = CODE_ERROR
    this.msg = 'error'
    this.json(res)
  }

  tokenErr(res) {
    this.code = CODE_TOKEN_ERROR
    this.msg = 'token失效'
    this.json(res)
  }
}

module.exports = Result

