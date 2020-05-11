const express = require('express');

const indexApi = express.Router()

const users = require('../middleware/users')

const auth = require('../middleware/auth')


indexApi.post('/register', users.register, async(req, res) => {
    res.send(req.user)
})


indexApi.post('/login', users.login, async(req, res) => {
    res.send(req.user)
})


indexApi.get('/users', users.showUser, async(req, res) => {
    res.send(req.user)
})






//核心token验证器
indexApi.get('/profile', auth.auth, async(req, res) => {
    res.send(req.user)
})






module.exports = indexApi