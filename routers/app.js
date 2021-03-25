const express = require('express')


const {sequelize ,User,Post,Comment,Reaction} = require('./models')

const app = express()
app.use(express.json())
//post user info
app.post('/user', async(req,res) =>{
    const {id,name,pass,email,gender,country,dofbirth,add,phn} = req.body
    
    try{
        const user = await User.create({id,name,pass,email,gender,country,dofbirth,add,phn})

        return res.json(user)
    }
    catch(err) {
        console.log(err)
        return res.status(300).json(err)
    }
})
// get user info
app.get('/user',async(req,res) =>{
    try{
        
        const users =await User.findAll()
       
        return res.json(users)
    } catch(err){ 
        return res.status(500).json({error: 'something went wrong'})

    }
})
//return user by id
app.get('/user/:id', async (req,res ) =>{
    const id = req.params.id
    try{
        
        const user = await User.findOne({ where : { id }  })
        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json({error: 'somthing wrong'})
    }
})
//update user
app.put('/user',async(req,res) =>{
    const{id,name,pass,email,gender,country,dofbirth,add,phn} =req.body
    try{
        
        const user =await User.findByPk(id)
        user.name = name
        user.pass = pass
        user.email= email
        user.gender = gender
        user.country = country
        user.dofbirth = dofbirth
        user.add = add
        user.phn = phn
        await user.save()
        return res.json(user)

     }catch (err) {
         console.log(err)
         return res.status(500).json({error:  'something wrong'})
     }
    
}),
//delete user
app.delete('/user/:id',async(req,res)=>{
    const id = req.params.id
    try{
        const user = await User.findOne({where: { id: id}})
        await user.destroy()
        return res.json({message: 'user delete'})
    } catch (err){
        console.log(err)
        return res.status(500).json({error:'somthing went wrong'})
    }
})


//post new post
app.post('/post', async(req,res) =>{
    const {id,date,contant} = req.body
    
    try{
        const post = await Post.create({id,date,contant})

        return res.json(post)
    }
    catch(err) {
        console.log(err)
        return res.status(300).json(err)
    }
})
//return post
app.get('/post',async(req,res) =>{
    try{
        const posts =await Post.findAll()
       
        return res.json(posts)
    } catch(err){ 
        return res.status(300).json({error: 'something went wrong'})

    }
})
//return post by id
app.get('/post/:id', async (req,res ) =>{
    const id = req.params.id
    try{
        const post = await Post.findOne({ where : { id }  })
        return res.json(post)
    } catch (err) {
        console.log(err)
        return res.status(500).json({error: 'somthing wrong'})
    }
})
//update post
app.put('/post',async(req,res) =>{
    const{id,date,contant} =req.body
    try{
        console.log(Post.toString())
        const post =await Post.findByPk(id)
        post.date = date
        post.contant = contant
        await post.save()
        return res.json(post)

     }catch (err) {
         console.log(err)
         return res.status(500).json({error:  'something wrong'})
     }
    
}),
//delete post
app.delete('/post/:id',async(req,res)=>{
    const id = req.params.id
    try{
        const post = await Post.findOne({where: { id: id}})
        await post.destroy()
        return res.json({message: 'post delete'})
    } catch (err){
        console.log(err)
        return res.status(500).json({error:'somthing went wrong'})
    }
})


// post new comment
app.post('/comment', async(req,res) =>{
    const {id,date,contant} = req.body
    
    try{
        const comment = await Comment.create({id,date,contant})

        return res.json(comment)
    }
    catch(err) {
        console.log(err)
        return res.status(300).json(err)
    }
}),
//return comment
app.get('/comment',async(req,res) =>{
    try{
        const comments =await Comment.findAll()
       
        return res.json(comments)
    } catch(err){ 
        return res.status(300).json({error: 'something went wrong'})

    }
}),
//return comment by id
app.get('/comment/:id', async (req,res ) =>{
    const id = req.params.id
    try{
        
        const comment = await Comment.findOne({ where : { id }  })
        return res.json(comment)
    } catch (err) {
        console.log(err)
        return res.status(500).json({error: 'somthing wrong'})
    }
})
//Update comment
app.put('/comment',async(req,res) =>{
    const{id,date,contant} =req.body
    try{
        const comment =await Comment.findByPk(id)
        comment.date = date
        comment.contant = contant
        await comment.save()
        return res.json(comment)

     }catch (err) {
         console.log(err)
         return res.status(500).json({error:  'something wrong'})
     }
    
}),
//delete comment
app.delete('/comment/:id',async(req,res)=>{
    const id = req.params.id
    try{
        const comment = await Comment.findOne({where: { id: id}})
        await comment.destroy()
        return res.json({message: 'Comment delete'})
    } catch (err){
        console.log(err)
        return res.status(500).json({error:'somthing went wrong'})
    }
})



//post new reaction
app.post('/reaction', async(req,res) =>{
    const {id,typereaction} = req.body
    
    try{
        const reaction = await Reaction.create({id,typereaction})

        return res.json(reaction)
    }
    catch(err) {
        console.log(err)
        return res.status(300).json(err)
    }
}),
//return reaction
app.get('/reaction',async(req,res) =>{
    try{
        const reactions =await Reaction.findAll()
       
        return res.json(reactions)
    } catch(err){ 
        return res.status(300).json({error: 'something went wrong'})

    }
}),
//return reaction by id
app.get('/reaction/:id', async (req,res ) =>{
    const id = req.params.id
    try{
        
        const reaction = await Reaction.findOne({ where : { id }  })
        return res.json(reaction)
    } catch (err) {
        console.log(err)
        return res.status(500).json({error: 'somthing wrong'})
    }
})
//Update reaction
app.put('/reaction',async(req,res) =>{
    const{id,typereaction} =req.body
    try{
        const reaction =await Reaction.findByPk(id)
        reaction.typereaction =typereaction
        await reaction.save()
        return res.json(reaction)

     }catch (err) {
         console.log(err)
         return res.status(500).json({error:  'something wrong'})
     }
    
}),
//delete reaction
app.delete('/reaction/:id',async(req,res)=>{
    const id = req.params.id
    try{
        const reaction = await Reaction.findOne({where: { id: id}})
        await reaction.destroy()
        return res.json({message: 'Reaction delete'})
    } catch (err){
        console.log(err)
        return res.status(500).json({error:'somthing went wrong'})
    }
})

app.listen({port:3000},async() => {
    console.log('Server up on http://127.0.0.1:3000')
    await sequelize.sync()
    console.log('Database synced!')
})