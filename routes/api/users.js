/*
 * @Author: zxy
 * @Date: 2021-06-16 14:34:47
 * @LastEditTime: 2021-07-07 16:24:29
 * @FilePath: /my-blog-serve/routes/api/users.js
 */
const Router = require('koa-router')
const router = Router()
const tools = require('../../config/tools')
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs')
const { secretOrKey } = require('../../config/keys')
const jwt = require('jsonwebtoken');

// 引入User
const User = require('../../models/Users');

// 引入验证
const valRes = require('../../validator/register')
const varChang = require('../../validator/changeUser')

/**
 * @route POST api/users/register
 * @description 注册接口地址
 * @access 接口是公开的
 */
router.post('/register', async ctx => {
  let body = ctx.request.body

  const { errors, isValid } = valRes(body)

  if (!isValid) {
    ctx.body = {
      status: 0,
      errors
    }
  } else {
    const findResult = await User.find({$or: [
      {email: body.email},
      {name: body.name}
    ]})
  
    if (findResult.length > 0) {
      ctx.body = {
        status: 0,
        msg: '该邮箱或用户名已被使用'
      }
    } else {
      const avatar = gravatar.url(body.email, {
        s: '200', 
        r: 'pg', 
        d: 'mm'
      });
  
      let newUser = new User({
        name: body.name,
        email: body.email,
        avatar,
        password: tools.enbcrypt(body.password),
        power: body.power
      })
  
      // 存储到数据库
      const saveData = async () => {
        try {
          const userSaved = await newUser.save()
  
          ctx.body = {
            status: 2000,
            id: userSaved.id,
            name: userSaved.name
          }
        } catch (err) {
          ctx.body(err)
        }
      }
  
      await saveData()
    }
  }
})

/**
 * @route POST api/users/login
 * @description 登录接口地址
 * @access 接口是公开的
 */
router.post('/login', async ctx => {
  let body = ctx.request.body

  const findResult = await User.findOne({
    name: body.name
  })

  if (findResult) {
    if (bcrypt.compareSync(body.password, findResult.password)) {
      // 生成token
      const token = jwt.sign({ 
        id: findResult.id,
        name: findResult.name,
        avatar: findResult.avatar
      }, secretOrKey, { expiresIn: 3600 * 24 * 7});
      
      ctx.body = {
        status: 2000,
        token: "Bearer " + token
      }
    } else {
      ctx.body = {
        status: 0,
        msg: '用户名或密码错误'
      }
    }
  } else { 
    ctx.body = {
      status: 0,
      msg: '用户不存在'
    }
  }
})

/**
 * @route POST api/users/changeUser
 * @description 更改用户接口地址
 * @access 接口是公开的
 */
router.post("/changeUser", async ctx => {
  let body = ctx.request.body
  // body.password = tools.enbcrypt(body.password)
  
  const findResult = await User.findOne({
    name: body.name
  })

  if (findResult && bcrypt.compareSync(body.password, findResult.password)) {
    const { errors, isValid } = varChang(body)

    if (!isValid) {
      ctx.body = {
        status: 0,
        errors
      }
    } else {
      findResult.password = tools.enbcrypt(body.nPassword)
      findResult.email = body.email

      // 存储到数据库
      const saveData = async () => {
        try {
          const userSaved = await findResult.save()
  
          ctx.body = {
            status: 2000,
            id: userSaved.id,
            name: userSaved.name
          }
        } catch (err) {
          ctx.body(err)
        }
      }
  
      await saveData()
    }
  } else {
    ctx.body = {
      status: 0,
      msg: '该用户不存在或原密码有误'
    }
  }
})

/**
 * @route delete api/users/delUser
 * @description 删除用户
 * @access 接口是公开的
 */
router.delete('/delUser', async ctx => {
  let body = ctx.request.body

  const findResult = await User.findOne({
    name: body.name
  })

  let res = await User.findByIdAndDelete(findResult.id)

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