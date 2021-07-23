/*
 * @Author: zxy
 * @Date: 2021-07-06 14:25:30
 * @LastEditTime: 2021-07-06 15:58:53
 * @FilePath: /my-blog-serve/routes/api/appKanri.js
 */
const Router = require('koa-router')
const router = Router()

// 引入app模型
const AppSch = require('../../models/AppSchs')

/**
 * @route post api/appKanri/addApp
 * @description 增加app
 * @access 接口是公开的
 */
router.post('/addApp', async ctx => {
  let body = ctx.request.body
  console.log(body)

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

  let newApp = new AppSch(body)

  await saveData(newApp)
})

/**
 * @route get api/appKanri/getAllApp
 * @description 获得所有APP
 * @access 接口是公开的
 */
router.get('/getAllApp', async ctx => {
  let resData = await AppSch.find().sort({_id: -1})

  ctx.body = {
    status: 2000,
    list: resData
  }
})

/**
 * @route get api/appKanri/getAppById
 * @description 根据id获得app
 * @access 接口是公开的
 */
router.get('/getAppById', async ctx => {
  let body = ctx.query

  let { id } = body

  res = await AppSch.findOne({_id: id})

  ctx.body = {
    status: 2000,
    data: res
  }
})

/**
 * @route get api/appKanri/changeAppById
 * @description 根据id修改app
 * @access 接口是公开的
 */
router.put('/changeAppById', async ctx => {
  let body = ctx.request.body

  let { id, changeObj } = body

  // 修改数据库数据
  const changeData = async (model, changeObj) => {
    await model.findByIdAndUpdate(id, changeObj, (err, docs) => {
      if(err) {
        ctx.body = {
          status: 0,
          err
        }
      } else {
        ctx.body = {
          status: 2000,
          docs
        }
      }
    })
  }

  await changeData(AppSch, changeObj)
})

/**
 * @route delete api/appKanri/deleteAppById
 * @description 根据id删除app
 * @access 接口是公开的
 */
router.delete('/deleteAppById', async ctx => {
  let body = ctx.request.body
  console.log(body)

  let { id } = body
  let res = await AppSch.findByIdAndDelete(id)

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