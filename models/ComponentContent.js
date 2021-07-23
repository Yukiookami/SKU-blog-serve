/*
 * @Author: zxy
 * @Date: 2021-06-30 13:15:03
 * @LastEditTime: 2021-07-14 13:22:44
 * @FilePath: /my-blog-serve/models/ComponentContent.js
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ComponentContentSchma = new Schema({
  cnContentInfo: {
    title: {
      type: String,
      require: true
    },
    sakusya: {
      type: String,
      require: true,
      default: 'skuZXY'
    },
    tag: {
      type: String,
      require: true
    },
    content: {
      type: String,
      require: true
    },
    isTop: {
      type: Boolean,
      require: true
    },
    contentType: {
      type: String,
      require: true
    },
    coverImg: {
      type: String,
      require: true
    },
    markdownContent: {
      type: String,
      require: true
    },
    lange: {
      type: String,
      require: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    typeClass: {
      type: String,
      require: true
    },
  },
  jaContentInfo: {
    title: {
      type: String,
      require: true
    },
    sakusya: {
      type: String,
      require: true,
      default: 'skuZXY'
    },
    tag: {
      type: String,
      require: true
    },
    content: {
      type: String,
      require: true
    },
    isTop: {
      type: Boolean,
      require: true
    },
    contentType: {
      type: String,
      require: true
    },
    coverImg: {
      type: String,
      require: true
    },
    markdownContent: {
      type: String,
      require: true
    },
    lange: {
      type: String,
      require: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    typeClass: {
      type: String,
      require: true
    },
  }
})

module.exports = ComponentContent = mongoose.model('componentContents', ComponentContentSchma)