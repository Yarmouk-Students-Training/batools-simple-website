const express =require("express");
const {sequelize,Comment} = require('.././models');
const route = express();

route.use(express.json());


// post new comment
route.post('/comment', async(req,res) =>{
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
route.get('/comment',async(req,res) =>{
    try{
        const comments =await Comment.findAll()
       
        return res.json(comments)
    } catch(err){ 
        return res.status(300).json({error: 'something went wrong'})

    }
}),
//return comment by id
route.get('/comment/:id', async (req,res ) =>{
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
route.put('/comment',async(req,res) =>{
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
route.delete('/comment/:id',async(req,res)=>{
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


module.exports=route;