/*
 * @Author: zxy
 * @Date: 2021-06-16 14:36:47
 * @LastEditTime: 2021-07-07 16:31:42
 * @FilePath: /my-blog-serve/config/tools.js
 */
const bcrypt = require('bcryptjs')

const tools = {
  enbcrypt (password) {
    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    return hash
  }
}

module.exports = tools