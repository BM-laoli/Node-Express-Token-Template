const express = require('express');

const app = express();


//解析一遍post参数
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


//路由分发器
app.get('/test', async(req, res) => {
    res.send('测试打通！没问题')
})

app.use('/api', require('./route/index'))


app.listen(3001, async() => {
    console.log('http://localhost:3001');
})