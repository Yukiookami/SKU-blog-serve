/*
 * @Author: zxy
 * @Date: 2021-06-16 17:59:37
 * @LastEditTime: 2021-06-16 18:47:24
 * @FilePath: /my-blog-serve/validator/register.js
 */
const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateRegisterInput (data) {
  let errors = {}

  if (!Validator.isLength(data.name, { min: 2, max: 18 })) {
    errors.name = '名字长度不能小于2并小于18。'
  }

  if (!Validator.isLength(data.password, { min: 6, max: 18 })) {
    errors.password = '密码长度不能小于6并小于18。'
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = '请输入正确的邮箱。'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}