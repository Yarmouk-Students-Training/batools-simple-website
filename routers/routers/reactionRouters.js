const express =require("express");
const {sequelize,Reaction} = require('.././models');
const route = express();

route.use(express.json());

//post new reaction
route.post('/reaction', async(req,res) =>{
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
route.get('/reaction',async(req,res) =>{
    try{
        const reactions =await Reaction.findAll()
       
        return res.json(reactions)
    } catch(err){ 
        return res.status(300).json({error: 'something went wrong'})

    }
}),
//return reaction by id
route.get('/reaction/:id', async (req,res ) =>{
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
route.put('/reaction',async(req,res) =>{
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
route.delete('/reaction/:id',async(req,res)=>{
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

module.exports=route;