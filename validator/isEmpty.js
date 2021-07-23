/*
 * @Author: zxy
 * @Date: 2021-06-16 18:03:00
 * @LastEditTime: 2021-06-16 18:06:04
 * @FilePath: /my-blog-serve/validator/isEmpty.js
 */
/**
 * @description: 判断是否为空 
 * @param {*} value
 * @return {*}
 */
const isEmpty = value => {
  return value === undefined || value === null || 
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)
}

module.exports = isEmpty