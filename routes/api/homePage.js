/*
 * @Author: zxy
 * @Date: 2021-06-17 20:01:08
 * @LastEditTime: 2021-07-14 12:40:35
 * @FilePath: /my-blog-serve/routes/api/homePage.js
 */
const Router = require('koa-router')
const router = Router()

// 引入homeCovers
const homeCover = require('../../models/homeCovers');

/**
 * @route POST api/homePage/saveCover
 * @description 存储首页图片
 * @access 接口是公开的
 */
router.post('/saveCover', async ctx => {
  let body = ctx.request.body

  let cover = new homeCover({
    coverUrl: body.coverUrl
  })

  // 存储到数据库
  const saveData = async () => {
    try {
      const coverSaved = await cover.save()

      ctx.body = {
        status: 2000,
        url: coverSaved.coverUrl
      }
    } catch (err) {
      ctx.body = {
        status: 0,
        err
      }
    }
  }

  await saveData()
})

/**
 * @route get api/homePage/getAllCover
 * @description 获取所有首页图片，时间降序排列
 * @access 接口是公开的
 */
router.get('/getAllCover', async ctx => {
  let resData = await homeCover.find().sort({_id: -1})
  
  ctx.body = {
    list: resData
  }
})

/**
 * @route delete api/homePage/deleteCover
 * @description 删除指定首页图片
 * @access 接口是公开的
 */
router.delete('/deleteCover', async ctx => {
  let body = ctx.request.body

  let res = await homeCover.findByIdAndDelete(body.id)

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