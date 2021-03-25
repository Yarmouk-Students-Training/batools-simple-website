const express = require('express')


const {sequelize ,User,Post,Comment,Reaction} = require('./models')

const app = express()
app.use(express.json())

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

app.get('/user',async(req,res) =>{
    try{
        const users =await User.findAll()
       
        return res.json(users)
    } catch(err){ 
        return res.status(500).json({error: 'something went wrong'})

    }
})
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
app.get('/post',async(req,res) =>{
    try{
        const posts =await Post.findAll()
       
        return res.json(posts)
    } catch(err){ 
        return res.status(300).json({error: 'something went wrong'})

    }
})
app.get('post/:id', async (req,res ) =>{
    const id = req.params.id
    try{
        const post = await Post.findOne({
            where : { id } ,
        })
        return res.json(post)
    } catch (err) {
        console.log(err)
        return res.status(500).json({error: 'somthing wrong'})
    }
})
app.put('/post/:id',async(req,res) =>{
    const{id,date,contant} =req.body
    try{
        const post =await Post.findOne({where :{id:id}})
        post.date = date
        post.contant = contant
        await post.save()
        return res.json(post)

     }catch (err) {
         console.log(err)
         return res.status(500).json({error:  'something wrong'})
     }
    
}),
app.delete('/comment/:id',async(req,res)=>{
    const id = req.params.id
    try{
        const post = await Post.find({where: { id: id}})
        await post.destroy()
        return res.json({message: 'post delete'})
    } catch (err){
        console.log(err)
        return res.status(500).json({error:'somthing went wrong'})
    }
})

 


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
app.get('/comment',async(req,res) =>{
    try{
        const comments =await Comment.findAll()
       
        return res.json(comments)
    } catch(err){ 
        return res.status(300).json({error: 'something went wrong'})

    }
}),
app.put('/comment/:id',async(req,res) =>{
    const{id,date,contant} =req.body
    try{
        const comment =await Comment.findOne({where :{id:id}})
        comment.date = date
        comment.contant = contant
        await comment.save()
        return res.json(comment)

     }catch (err) {
         console.log(err)
         return res.status(500).json({error:  'something wrong'})
     }
    
}),
app.delete('/comment/:id',async(req,res)=>{
    const id = req.params.id
    try{
        const comment = await Comment.find({where: { id: id}})
        await comment.destroy()
        return res.json({message: 'Comment delete'})
    } catch (err){
        console.log(err)
        return res.status(500).json({error:'somthing went wrong'})
    }
})

//REACTIO
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
app.get('/reaction',async(req,res) =>{
    try{
        const reactions =await Reaction.findAll()
       
        return res.json(reactions)
    } catch(err){ 
        return res.status(300).json({error: 'something went wrong'})

    }
}),
app.put('/reaction/:id',async(req,res) =>{
    const{id,typereaction} =req.body
    try{
        const Reaction =await Reaction.findOne({where :{id:id}})
        Reaction.typereaction =typereaction
        await Reaction.save()
        return res.json(Reaction)

     }catch (err) {
         console.log(err)
         return res.status(500).json({error:  'something wrong'})
     }
    
}),
app.delete('/reaction/:id',async(req,res)=>{
    const id = req.params.id
    try{
        const Reaction = await Reaction.find({where: { id: id}})
        await Reaction.destroy()
        return res.json({message: 'Reaction delete'})
    } catch (err){
        console.log(err)
        return res.status(500).json({error:'somthing went wrong'})
    }
})

app.listen({port:3000},async() => {
    console.log('Server up on http://127.0.0.1:3000')
    await sequelize.sync({force :true})
    console.log('Database synced!')
})