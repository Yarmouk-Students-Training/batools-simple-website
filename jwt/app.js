require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');
const {sequelize,User,Post ,refreshToken} = require('./models');
const userRouters = require('./routers/userRouters');
const postRouters = require('./routers/postRouters');
const commentRouters = require('./routers/commentRouters');
const reactionRouters = require('./routers/reactionRouters');
const friendRouters = require('./routers/friendRouters');
const refreshtoken = require('./models/refreshtoken');


const app = express()
app.use(express.json());


app.get('/posts', authenticateToken, async(req,res) =>{
    const email = req.email
    console.log(email)
    const user = await User.findOne({where: {email}})
    const post = await Post.findOne({where:{userid:user.id}})

    return res.json(post)
   
})
app.post('/refreshtoken', async (req, res) => {
    const {refresht} = req.body;
    const Refreshtoken = await refreshToken.findOne({wehere:{refreshtoken:refresht}})
    if(Refreshtoken != null){
       jwt.sign(Refreshtoken, process.env.REFRESH_TOKEN_SECRET,(err,email) =>{
           if(err){
            res.json(err)
         }
         else
         {
            const accessToken =  jwt.sign({email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '20m'})
            return res.json({accessToken : accessToken})
         }
       })
    }
    else {
        return res.json({message: "invalid"})
    }
    })


app.post('/api/login',async(req,res) =>{
    //Authenticate User

    const {email,pass} =req.body;
    const user = await User.findOne({ where : { email, pass }  })
    if(user){

       const accessToken = await jwt.sign({email:user.email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '20m'})
       const refreshTokens = await jwt.sign({email:user.email}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '70d'})
       await refreshToken.create({refreshtoken:refreshTokens})
      return res.json({accessToken : accessToken,refreshTokens: refreshTokens}) 
    } else {
        return res.json({message: "invalid"})
    }
})

function authenticateToken(req,res,next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,  (err, email) => {
      if (err) return res.sendStatus(403)
       req.email = email.email
  
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
