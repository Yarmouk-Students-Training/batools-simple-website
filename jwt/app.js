require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');
const {sequelize,User,Post } = require('./models');
const userRouters = require('./routers/userRouters');
const postRouters = require('./routers/postRouters');
const commentRouters = require('./routers/commentRouters');
const reactionRouters = require('./routers/reactionRouters');
const friendRouters = require('./routers/friendRouters')


const app = express()
app.use(express.json());


app.get('/posts', authenticateToken, async(req,res) =>{
    const user = req.userid

    const post = await Post.findOne({where:{userid:user}})

    return res.json(post)
   
})

app.post('/api/login',async(req,res) =>{
    //Authenticate User

    const { name,pass} =req.body;
    const user = await User.findOne({ where : { name, pass }  })
    if(user){

       const accessToken = await jwt.sign({name:user.name}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '20m'})
      return res.json({accessToken : accessToken}) 
    } else {
        return res.json({message: "invalid"})
    }
})

function authenticateToken(req,res,next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,  (err, name) => {
      if (err) return res.sendStatus(403)
       req.name = userid
  
      next()
    })
}





app.listen({port:3000},async() => {
    console.log('Server up on http://127.0.0.1:3000')
    await sequelize.sync()
    console.log('Database synced!')
})

app.use(userRouters)
app.use(postRouters)
app.use(commentRouters)
app.use(reactionRouters)
app.use(friendRouters)
