const express =require("express");
const {sequelize,User} = require('.././models');
const route = express();

route.use(express.json());

route.post('/user', async(req,res) =>{
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
route.get('/user',async(req,res) =>{
    try{
        
        const users =await User.findAll()
       
        return res.json(users)
    } catch(err){ 
        return res.status(500).json({error: 'something went wrong'})

    }
})

//return user by id
route.get('/user/:id', async (req,res ) =>{
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
route.put('/user',async(req,res) =>{
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
route.delete('/user/:id',async(req,res)=>{
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

module.exports=route;
