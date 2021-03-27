const express =require("express");
const {sequelize,Friend} = require('.././models');
const route = express();

route.use(express.json());

route.post('/friend',async(req,res)=>{
    const{firstuser,seconduser,accept} =req.body
    try {
        const friend =await Friend.create({firstuser,seconduser,accept})
        return res.json(friend)
    }
    catch(err){
        console.log(err)
        return res.status(300).json(err)
    }
})
route.get('/friend',async(req,res) =>{
    try{
        const friend =await Friend.findAll()

        return res.json(friend)

    }catch(err) {
        console.log(err)
        return res.status(300).json({error:'something went wrong'})
    }
})
route.put('/friend',async(req,res) =>{
    const {firstuser,seconduser,accept} =req.body
    try{
    var friend = await Friend.findOne({where:{firstuser,seconduser}})
    if(!friend)
      friend =await Friend.findOne({where:{firstuser:seconduser, seconduser:firstuser}})
    friend.accept=accept
    await friend.save()

    return res.json(friend)
  } catch(err) {
      console.log(err)
      return res.status(300).json({error:'somthing went wrong'})
  }
})
route.delete('/friend/:firstuser/:seconduser',async(req,res)=>{
    const firstuser = req.params.firstuser
    const seconduser = req.params.seconduser

    try {
      var friend =await Friend.findOne({where:{firstuser,seconduser} } )
      if(!friend)
        friend = await Friend.findOne({where:{firstuser:seconduser, seconduser:firstuser}})
      await friend.destroy()
      return res.json({ message: 'friend deleted!'})
  }catch(err) {
    console.log(err)
    return res.status(300).json({error:'somthing went wrong'})
}

})
module.exports=route;