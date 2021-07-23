/*
 * @Author: zxy
 * @Date: 2021-06-17 19:50:26
 * @LastEditTime: 2021-06-17 19:59:20
 * @FilePath: /my-blog-serve/models/HomeImage.js
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CoverSchema = new Schema({
  coverUrl: {
    type: String,
    require: true
  }
})

module.exports = homeCover = mongoose.model('homeCovers', CoverSchema)