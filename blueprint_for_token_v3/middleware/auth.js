const jwt = require('jsonwebtoken')

const { User } = require('../model/model')
module.exports = {
    auth: async(req, res, next) => {
        //注意啊这个字段是我们前端需要实现的，因为这是后台要求的
        let raw = String(req.headers.authorization).split(' ').pop() //我为啥要用空格分隔，因为我发起请求的时候多加了一个字段，

        const tokenData = jwt.verify(raw, 'asdasdasdasdasdasdasdasdasdasdasd')
        let { id } = tokenData
        //加到req上以便以给下一个中间件使用
        req.user = await User.findById(id)
        next()

    }
}