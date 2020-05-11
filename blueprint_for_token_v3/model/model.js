const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost:27017/express-auth', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });


const UserSchma = new mongoose.Schema({

    username: {
        type: String,
        unique: true //只需要usernam为唯一值
    },

    password: {
        type: String,
        set(val) { //val是自定义的保存前的加密,返回的值就是加密之后的密码
            return bcrypt.hashSync(val, 10) //进行散列之后的密码,10就是加密强度
        }
    }

})

const User = mongoose.model('User', UserSchma) //虽然这个表的名字是User但是实际上数据库创建的时候会给你变成users

// 6.扩展 如何删除集合,通过当前的链字段去加密就好了
// User.db.dropCollection('users')
module.exports = { User }