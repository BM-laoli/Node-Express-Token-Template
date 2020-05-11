const express = require('express');
const adminApp = express.Router()


//核心token验证器
adminApp.get('/', async(req, res) => {
    res.send('您已经通过了token验证')
})






module.exports = adminApp