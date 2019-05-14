const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp.js')
const login = async (username, password) => {
  username = escape(username)
  
  // 生成加密密码
  password = genPassword(password)

  password = escape(password)
  // 先用数据
  const sql = `
    select username, realname from users where username=${username} and password=${password};
  `;
  const rows = await exec(sql)
  return rows[0] || {};
  // return exec(sql).then(rows => {
  //   return rows[0] || {};
  // })
};

module.exports = {
  login
};
