//下面我们就是在创建一个库，这个库如果没有mongoose会自己给你创建，然后拿到一个表的操作对象

//1. 引入mongosee
const mongoose = require('mongoose')

// 2.创建连接
mongoose.connect('mongodb://localhost:27017/express-auth', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

//3.创建一个表的shecma规则,.设计一个集合的规则（实际上就是表的规则Schema）
const UserSchma = new mongoose.Schema({

    username: {
        type: String,
        unique: true //只需要usernam为唯一值
    },
    password: {
        type: String,
        set(val) { //val是自定义的保存前的加密,返回的值就是加密之后的密码
            return require('bcrypt').hashSync(val, 10) //进行散列之后的密码,10就是加密强度
        }
    }

})

// 4. l使用规则去创建表
const User = mongoose.model('User', UserSchma) //虽然这个表的名字是User但是实际上数据库创建的时候会给你变成users

// 6.扩展 如何删除集合,通过当前的链字段去加密就好了
// User.db.dropCollection('users')

// 5.  倒出对该集合（表）的操作对象 
module.exports = { User }