const xss = require('xss')
const { exec, escape } = require('../db/mysql')

const getList = async (author, keyword) => {
    //先返回假数据（格式正确）
    let sql = 'select * from blogs where 1=1 '
    if(author) {
      sql += `and author='${author}' `
    }

    if(keyword) {
      sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    // 返回 promise
    return await exec(sql)
}

const getDetail = async (id) => {
    // 先返回假数据
  const sql = `select * from blogs where id='${id}'`
  const rows = await exec(sql)
  return rows[0]
    // return await exec(sql).then(rows => {
    //   return rows[0]
    // })

}

const newBlog = async (blogData = {}) => {
    // blogData 是一个博客对象,包含 title content 属性
    const title = xss(blogData.title)
    const content = blogData.content
    const author = blogData.author
    const createTime = Date.now()
    const sql = `
        insert into blogs (title,content,createtime,author) values ('${title}','${content}',${createTime},'${author}');
    `;
    const inserData = await exec(sql)
    return {
      id: inserData.insertId
    }
    // return exec(sql).then(inserData => {
    //   return {
    //     id: inserData.insertId
    //   }
    // })
}

const updateBlog = async (id, blogData) => {
    // id就是要更新的 id
    console.log('update blog', id, blogData)

    const title = blogData.title
    const content = blogData.content
    const createTime = Date.now()
    const sql = `
        update blogs set title='${title}', content='${content}', createTime=${createTime} where id=${id} ;
    `;
    const updateData = await exec(sql)
    if(updateData.affectedRows > 0){
      return true
    }
      return false
    // return exec(sql).then(updateData => {
    //   if ( updateData.affectedRows > 0 ){
    //     return true
    //   }

    //   return false
    // })
}

const delBlog = async (id, author) => {
  const sql = `delete from blogs where id='${id}' and author='${author}'`;
  const delData = await exec(sql)
  if (delData.affectedRows >0 ){
    return true
  }
  return false
  // return exec(sql).then(delData => {
  //   if (delData.affectedRows >0 ){
  //     return true
  //   }
  //   return false
  // })
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
