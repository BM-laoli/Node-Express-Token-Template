const express = require('express');

const indexApi = express.Router()

const users = require('../middleware/users')


indexApi.post('/register', users.register, async(req, res) => {
    res.send(req.user)
})


indexApi.post('/login', users.login, async(req, res) => {
    res.send(req.user)
})


indexApi.get('/users', users.showUser, async(req, res) => {
    res.send(req.user)
})



module.exports = indexApi