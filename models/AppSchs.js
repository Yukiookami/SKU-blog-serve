/*
 * @Author: zxy
 * @Date: 2021-07-05 16:56:29
 * @LastEditTime: 2021-07-06 09:49:42
 * @FilePath: /my-blog-serve/models/AppSchs.js
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AppSchema = new Schema({
  appName: {
    type: String,
    require: true
  },
  appUrl: {
    type: String,
    require: true
  },
  appPlatform: {
    type: String,
    require: true
  },
  appCover: {
    type: String,
    require: true
  },
  appPackage: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = AppSch = mongoose.model('AppSchs', AppSchema)