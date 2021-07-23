/*
 * @Author: zxy
 * @Date: 2021-07-01 17:06:10
 * @LastEditTime: 2021-07-11 15:58:30
 * @FilePath: /my-blog-serve/routes/api/typeClass.js
 */
const Router = require('koa-router')
const router = Router()

// 引入类型模型
const typeClassCollection = require('../../models/typeClassCollections')

/**
 * @route get api/typeClass/getAllTypeClass
 * @description 获得所有类型
 * @access 接口是公开的
 */
router.get('/getAllTypeClass', async ctx => {
  let resData = await typeClassCollection.find().sort({_id: -1})

  ctx.body = {
    status: 2000,
    list: resData
  }
})

/**
 * @route get api/typeClass/getTypeClassById
 * @description 获得所有类型
 * @access 接口是公开的
 */
router.get('/getTypeClassById', async ctx => {
  let body = ctx.query

  let { id } = body

  let resData = await typeClassCollection.findOne({_id: id})

  ctx.body = {
    status: 2000,
    data: resData
  }
})

/**
 * @route post api/typeClass/addTypeClass
 * @description 新增类型
 * @access 接口是公开的
 */
router.post('/addTypeClass', async ctx => {
  let body = ctx.request.body
  let { typeClassObj, typeClassObjJP } = body

  // 存储到数据库
  const saveData = async model => {
    try {
      const contentSaved = await model.save()
      
      ctx.body = {
        status: 2000,
        id: contentSaved
      }
    } catch (err) {
      ctx.body = {
        status: 0,
        err
      }
    }
  }

  // 存储模型
  let readeToSave = {
    cnTypeClassInfo: {
      typeName: typeClassObj.typeName,
      typeIcon: typeClassObj.typeIcon,
      typeCover: typeClassObj.typeCover,
      contentType: typeClassObj.contentType
    },
    jaTypeClassInfo: {
      typeName: typeClassObjJP.typeName,
      typeIcon: typeClassObjJP.typeIcon,
      typeCover: typeClassObjJP.typeCover,
      contentType: typeClassObj.contentType
    }
  }

  let nowTypeClass = new typeClassCollection(readeToSave)

  await saveData(nowTypeClass)
})

/**
 * @route delete api/typeClass/deleteTypeClass
 * @description 删除类型
 * @access 接口是公开的
 */
router.delete('/deleteTypeClass', async ctx => {
  let body = ctx.request.body
  let { id } = body

  res = await typeClassCollection.findByIdAndDelete(id)

  if (res) {
    ctx.body = {
      status: 2000,
      res
    }
  } else {
    ctx.body = {
      status: 0,
      err: '删除失败'
    }
  }
})

module.exports = router.routes()