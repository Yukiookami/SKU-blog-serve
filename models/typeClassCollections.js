/*
 * @Author: zxy
 * @Date: 2021-07-01 16:48:29
 * @LastEditTime: 2021-07-11 15:51:38
 * @FilePath: /my-blog-serve/models/typeClassCollections.js
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TypeClassSchema = new Schema({
  cnTypeClassInfo: {
    typeName: {
      type: String,
      require: true
    },
    typeIcon: {
      type: String,
      require: true
    },
    typeCover: {
      type: String,
      require: true
    },
    contentType: {
      type: String,
      default: 'program'
    }
  },
  jaTypeClassInfo: {
    typeName: {
      type: String,
      require: true
    },
    typeIcon: {
      type: String,
      require: true
    },
    typeCover: {
      type: String,
      require: true
    },
    contentType: {
      type: String,
      default: 'program'
    }
  }
})

module.exports = typeClassCollection = mongoose.model('typeClassCollections', TypeClassSchema)