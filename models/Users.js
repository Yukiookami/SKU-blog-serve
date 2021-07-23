/*
 * @Author: zxy
 * @Date: 2021-06-16 14:33:53
 * @LastEditTime: 2021-06-16 15:11:30
 * @FilePath: /my-blog-serve/models/Users.js
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  power: {
    type: Number,
    default: 1
  }
})

module.exports = User = mongoose.model('users', UserSchema)