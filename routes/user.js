const router = require('koa-router')()
const { SuccessModel, ErrorModel } = require("../model/resModel");
const { set } = require('../db/redis.js')
const { login } = require('../controller/user.js')

router.prefix('/api/user')

router.post('/login', async (ctx, next) => {
	const { username, password } = ctx.request.body
	const data = await login(username, password)
	if ( data.username ){
		// 设置 session
		ctx.session.username = data.username
		ctx.session.realname = data.realname

		ctx.body = new SuccessModel()
		reurn 
	} 

	ctx.body = new ErrorModel('登录失败')
})

router.get('/session-test',async (ctx, next) => {
	if(ctx.session.viewCount == null){
		ctx.session.viewCount = 0
	}
	ctx.session.viewCount++ 
	ctx.body = {
		errno: 0,
		viewCount: ctx.session.viewCount
	}
})

module.exports = router
