/*
 * @Author: zxy
 * @Date: 2021-06-17 10:05:02
 * @LastEditTime: 2021-07-09 23:46:14
 * @FilePath: /my-blog-serve/routes/api/upload.js
 */
const Router = require("koa-router");

const router = new Router();

const multer = require('@koa/multer');

// 配置
let storage = multer.diskStorage({
  // 文件保存路径, 这里需要自己手动到public下面新建upload文件夹。
  destination: function(req, file, cb) {
    let fileFormat = file.originalname.split(".");
    let lastName = fileFormat[fileFormat.length - 1]

    if (lastName === 'md') {
      cb(null, "public/upload/markdown");
    } else {
      cb(null, "public/upload/static");
    }
  },
  // 修改文件名称
  filename: function(req, file, cb) {
    let fileFormat = file.originalname.split("."); //以点分割成数组，数组的最后一项就是后缀名
    let lastName = fileFormat[fileFormat.length - 1]

    cb(null, Date.now() + "." + lastName);
  }
});
// 加载配置
let upload = multer({
  storage: storage
});

// 上传文件
router.post("/uploadFile", upload.single('file'), async ctx => {
  // 返回结果给前端
  let filename = ctx.file.filename
  let fileFormat = filename.split(".");
  let lastName = fileFormat[fileFormat.length - 1]
  // 本地
  const sabaUrl = ctx.origin
  // 日本
  // const sabaUrl = 'https://jserve.zouxinyu.club'
  // 国内
  // const sabaUrl = 'https://serve.zouxinyu.club'

  ctx.response.status = 200;

  let data = {
    url: ``
  }

  if (lastName === 'md') {
    data.url = `${sabaUrl}/upload/markdown/${filename}`
  } else {
    data.url = `${sabaUrl}/upload/static/${filename}`
  }
  
  ctx.body = data
});

module.exports = router.routes()