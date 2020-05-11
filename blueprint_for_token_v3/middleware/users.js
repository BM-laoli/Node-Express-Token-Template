const { User } = require('../model/model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')




module.exports = {

    //注册
    register: async(req, res, next) => {
        // console.log(req.body);
        let { username, password } = req.body

        const user = await User.create({
            username: username,
            password: password
        })
        req.user = user

        next()
    },

    //查看所有用户
    showUser: async(req, res, next) => {

        //为什么是find就可以了，因为mongoose给你封装了
        const user = await User.find();

        req.user = user;
        next();

    },

    //登录器
    login: async(req, res, next) => {

        let { username, password } = req.body

        const user = await User.findOne({
            username: username
        })

        //验证用户名
        if (!user) {
            return res.status(422).send({ message: '用户名不存在' })
        }
        const isPasswordValid = bcrypt.compareSync(password,
            user.password
        )

        //验证密码
        if (!isPasswordValid) {
            return res.status(422).send({ message: '密码无效' })
        }


        //生成token，jwtToken   
        //生成签名,我们给id丢进去就好了
        const token = jwt.sign({
                //加密的签名
                id: String(user._id),
                //密钥
            }, 'asdasdasdasdasdasdasdasdasdasdasd') //这个东西实际上是一串秘钥，用来对应每一个的tonken验证器，它应该被写一个单独的文件里
        req.user = {
            user,
            token

        }



        next()
    }
}