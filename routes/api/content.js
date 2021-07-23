/*
 * @Author: zxy
 * @Date: 2021-06-30 14:35:01
 * @LastEditTime: 2021-07-16 16:55:47
 * @FilePath: /my-blog-serve/routes/api/content.js
 */
const Router = require('koa-router')
const router = Router()

// 引入程序，日语，组件文章模型
const ProgramContent = require('../../models/ProgramContent')
const JapaneseContent = require('../../models/JapaneseContent')
const ComponentContent = require('../../models/ComponentContent')

router.get('/', async ctx => {
  ctx.body = {
    msg: 123
  }
})

/**
 * @route POST api/content/addContent
 * @description 添加文章
 * @access 接口是公开的
 */
router.post('/addContent', async ctx => {
  let body = ctx.request.body

  let { contentType, cnContentInfo, jaContentInfo } = body

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
  let readyToAddContent = {
    cnContentInfo: {
      title: cnContentInfo.title,
      sakusya: cnContentInfo.sakusya,
      tag: cnContentInfo.tag,
      content: cnContentInfo.content,
      isTop: cnContentInfo.isTop,
      contentType: cnContentInfo.contentType,
      coverImg: cnContentInfo.coverImg,
      markdownContent: cnContentInfo.markdownContent,
      lange: cnContentInfo.lange,
      typeClass: cnContentInfo.typeClass
    },
    jaContentInfo: {
      title: jaContentInfo.title,
      sakusya: jaContentInfo.sakusya,
      tag: jaContentInfo.tag,
      content: jaContentInfo.content,
      isTop: jaContentInfo.isTop,
      contentType: jaContentInfo.contentType,
      coverImg: jaContentInfo.coverImg,
      markdownContent: jaContentInfo.markdownContent,
      lange: jaContentInfo.lange,
      typeClass: jaContentInfo.typeClass
    }
  }

  if (contentType === 'program') {
    let newContent = new ProgramContent(readyToAddContent)
    // 编程
    await saveData(newContent)
  } else if (contentType === 'japanese') {
    let newContent = new JapaneseContent(readyToAddContent)
    // 日语
    await saveData(newContent)
  } else if (contentType === 'component') {
    let newContent = new ComponentContent(readyToAddContent)
    // 组件
    await saveData(newContent)
  }
})

/**
 * @route get api/content/getAllContent
 * @description 获取所有文章，时间降序排列
 * @access 接口是公开的
 */
router.get('/getAllContent', async ctx => {
  let body = ctx.query

  let { contentType } = body
  let list = ''

  if (contentType === 'program') {
    // 编程
    list = await ProgramContent.find().sort({_id: -1})
  } else if (contentType === 'japanese') {
    // 日语
    list = await JapaneseContent.find().sort({_id: -1})
  } else if (contentType === 'component') {
    // 组件
    list = await ComponentContent.find().sort({_id: -1})
  }

  ctx.body = {
    list
  }
})

/**
 * @route delete api/content/deleteContent
 * @description 删除指定文章
 * @access 接口是公开的
 */
router.delete('/deleteContent', async ctx => {
  let body = ctx.request.body

  let { contentType, id } = body
  let res = ''

  if (contentType === 'program') {
    // 编程
    res = await ProgramContent.findByIdAndDelete(id)
  } else if (contentType === 'japanese') {
    // 日语
    res = await JapaneseContent.findByIdAndDelete(id)
  } else if (contentType === 'component') {
    // 组件
    res = await ComponentContent.findByIdAndDelete(id)
  }

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

/**
 * @route get api/content/getContent
 * @description 根据id获得指定文章
 * @access 接口是公开的
 */
router.get('/getContent', async ctx => {
  let body = ctx.query

  let { id, contentType } = body
  let res = ''

  if (contentType === 'program') {
    // 编程
    res = await ProgramContent.findOne({_id: id})
  } else if (contentType === 'japanese') {
    // 日语
    res = await JapaneseContent.findOne({_id: id})
  } else if (contentType === 'component') {
    // 组件
    res = await ComponentContent.findOne({_id: id})
  }  

  ctx.body = {
    status: 2000,
    list: res
  }
})

/**
 * @route get api/content/getContentByTypeName
 * @description 根据TypeName获得文章
 * @access 接口是公开的
 */
router.get('/getContentByTypeName', async ctx => {
  let body = ctx.query

  let { typeName, contentType, lang } = body

  let res = []

  if (contentType === 'program') {
    // 编程
    if (!+lang) {
      res = await ProgramContent.find({'cnContentInfo.typeClass': typeName}).sort({_id: -1})
    } else {
      res = await ProgramContent.find({'jaContentInfo.typeClass': typeName}).sort({_id: -1})
    }
  } else if (contentType === 'japanese') {
    // 日语
    if (!+lang) {
      res = await JapaneseContent.find({'cnContentInfo.typeClass': typeName}).sort({_id: -1})
    } else {
      res = await JapaneseContent.find({'jaContentInfo.typeClass': typeName}).sort({_id: -1})
    }
  } else if (contentType === 'component') {
    // 组件
    if (!+lang) {
      res = await ComponentContent.find({'cnContentInfo.typeClass': typeName}).sort({_id: -1})
    } else {
      res = await ComponentContent.find({'jaContentInfo.typeClass': typeName}).sort({_id: -1})
    }
  }  

  ctx.body = {
    status: 2000,
    list: res
  }
})

/**
 * @route put api/content/putContent
 * @description 根据id修改指定文章
 * @access 接口是公开的
 */
 router.put('/putContent', async ctx => {
  let body = ctx.request.body

  let { contentType, id, cnContentInfo, jaContentInfo } = body

  // 修改数据库数据
  const changeData = async model => {
    return await model.findByIdAndUpdate(id, readyToPutContent, (err, docs) => {
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

  // 修改模型
  let readyToPutContent = {
    cnContentInfo: {
      title: cnContentInfo.title,
      sakusya: cnContentInfo.sakusya,
      tag: cnContentInfo.tag,
      content: cnContentInfo.content,
      isTop: cnContentInfo.isTop,
      contentType: cnContentInfo.contentType,
      coverImg: cnContentInfo.coverImg,
      markdownContent: cnContentInfo.markdownContent,
      typeClass: cnContentInfo.typeClass
    },
    jaContentInfo: {
      title: jaContentInfo.title,
      sakusya: jaContentInfo.sakusya,
      tag: jaContentInfo.tag,
      content: jaContentInfo.content,
      isTop: jaContentInfo.isTop,
      contentType: jaContentInfo.contentType,
      coverImg: jaContentInfo.coverImg,
      markdownContent: jaContentInfo.markdownContent,
      typeClass: jaContentInfo.typeClass
    }
  }

  if (contentType === 'program') {
    // 编程
    await changeData(ProgramContent)
  } else if (contentType === 'japanese') {
    // 日语
    await changeData(JapaneseContent)
  } else if (contentType === 'component') {
    // 组件
    await changeData(ComponentContent)
  }
})


/**
 * @route get api/content/getTopContent
 * @description 获取置顶文章（限制个数）
 * @access 接口是公开的
 */
router.get('/getTopContent', async ctx => {
  let body = ctx.query

  let { contentType, topNum, langFlag } = body

  let list = ''

  const getDataByLang = async model => {
    if (!langFlag) {
      list = await model.find({'cnContentInfo.isTop': 'true'}).sort({_id: -1}).limit(+topNum)
    } else {
      list = await model.find({'jaContentInfo.isTop': 'true'}).sort({_id: -1}).limit(+topNum)
    }
  }

  if (contentType === 'program') {
    // 编程
    await getDataByLang(ProgramContent)
  } else if (contentType === 'japanese') {
    // 日语
    await getDataByLang(JapaneseContent)
  } else if (contentType === 'component') {
    // 组件
    await getDataByLang(ComponentContent)
  }

  ctx.body = {
    status: 2000,
    list: list
  }
})

module.exports = router.routes()