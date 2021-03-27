const express =require("express");
const {sequelize,Post} = require('.././models');
const route = express();

route.use(express.json());

//post new post
route.post('/post', async(req,res) =>{
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
route.get('/post',async(req,res) =>{
    try{
        const posts =await Post.findAll()
       
        return res.json(posts)
    } catch(err){ 
        return res.status(300).json({error: 'something went wrong'})

    }
})
//return post by id
route.get('/post/:id', async (req,res ) =>{
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
route.put('/post',async(req,res) =>{
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
route.delete('/post/:id',async(req,res)=>{
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


module.exports=route;