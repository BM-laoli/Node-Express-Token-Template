const express = require('express');
const auth = require('./middleware/auth')

const app = express();



//解析一遍post参数
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/home', require('./route/home'))

//auth
app.use('/admin', auth.auth, require('./route/admin'))



app.listen(3001, async() => {
    console.log('http://localhost:3001');
})