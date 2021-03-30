const express = require('express');
const {sequelize } = require('./models');
const userRouters = require('./routers/userRouters');
const postRouters = require('./routers/postRouters');
const commentRouters = require('./routers/commentRouters');
const reactionRouters = require('./routers/reactionRouters');
const friendRouters = require('./routers/friendRouters')


const app = express()
app.use(express.json());

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
