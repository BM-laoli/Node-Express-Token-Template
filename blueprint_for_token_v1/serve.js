const express = require('express')

//我们使用bcrpit散列加密密码
const { User } = require('./moldes'); //按住ctrl就能查看，当前的对象的类型，可以方便我们排查错误

const app = express()


// 预先处理POST请求处理
app.use(express.urlencoded({ extended: true })) //处理一般的数据www.xx格式
app.use(express.json()) //处理json的格式的post



app.get('/api/users', async(req, res) => {

    //为什么是find就可以了，因为mongoose给你封装了
    const user = await User.find()

    res.send(user)

})

app.post('/api/register', async(req, res) => {

    console.log(req.body);

    //这样就能创建了
    let { username, password } = req.body
    const user = await User.create({
        username: username,
        password: password
    })
    res.send(user)
})
app.post('/api/login', async(req, res) => {

    let { username, password } = req.body

    // 1.先看密码存在吗？
    // 2.再看密码对不对

    const user = await User.findOne({
        username: username
    })

    //中断，422是一般密码错误
    if (!user) {
        return res.status(422).send({ message: '用户名不存在' })
    }
    const isPasswordValid = require('bcrypt').compareSync(password,
        user.password
    )

    if (!isPasswordValid) {
        return res.status(422).send({ message: '密码无效' })
    }

    //生成token，jwtToken
    const jwt = require('jsonwebtoken')
        //生成签名,我们给id丢进去据好了
    const token = jwt.sign({
            //加密的签名
            id: String(user._id),
            //密钥
        }, 'asdasdasdasdasdasdasdasdasdasdasd') //这个东西实际上是一串秘钥，用来对应每一个的tonken验证器，它应该被写一个单独的文件里
    res.send({
        user,
        token

    })



})

//我们需要把这个验证加密加上token给所有的 要求有验证的api，这样就能实现多接口的验证 ，这个就是jwt---token验证器，通过放行就实现了验证

const auth = async(req, res, next) => {
    const jwt = require('jsonwebtoken')
    let raw = String(req.headers.authorization).split(' ').pop()
    const tokenData = jwt.verify(raw, 'asdasdasdasdasdasdasdasdasdasdasd')
    let { id } = tokenData
    //加到req上以便以给下一个中间件使用
    req.user = await User.findById(id)

    if (!req.user) {
        return {
            "messae": "出错了"
        }
    } else {

        next()
    }


}

app.get('/api/profile', auth, async(req, res) => {

    // console.log(req.headers.authorization); //这样就能拿到这个token了

    // const jwt = require('jsonwebtoken')

    // //截取tokne
    // let raw = String(req.headers.authorization).split(' ').pop()

    // //验证和解密 
    // const tokenData = jwt.verify(raw, 'asdasdasdasdasdasdasdasdasdasdasd')
    // console.log(tokenData);

    // //拿去id ，
    // let { id } = tokenData


    // const user = await User.findById(id)
    // res.send(user)


    //更新代码
    res.send(req.user)
})



app.listen(3001, () => {
    console.log('http://localhost:3001');
})