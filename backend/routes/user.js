const express =require("express")
const router =express.Router();
const asyncHandler =require("express-async-handler")
const User =require("../models/Users")
const bcrypt =require('bcryptjs')

router.get('/' , asyncHandler(async(req,res)=>{
    const users= await User.find().select("-password")
    res.status(200).json(users)
}))

router.get('/:id',asyncHandler(async(req,res)=>{
    const user =  await User.findById(req.params.id).select("-password")
    if(!user){
        return res.status(404).json({message : "user not found"})
    }
    res.status(200).json(user)
}))

router.delete("/:id" ,asyncHandler(async(req,res)=>{
    const user =await User.findById(req.params.id)
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
    const deletedUser= await User.findByIdAndDelete(req.params.id);
    res.status(200).json({message :"user deleted" , deletedUser})
}))

router.put('/:id' , asyncHandler(async(req,res)=>{
    if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        req.body.password =await bcrypt.hash(req.body.password,salt)
    }
    const newUser =await User.findByIdAndUpdate(req.params.id, {
        $set:{
            email:req.body.email,
            userName:req.body.userName,
            password:req.body.password
        }
    },{new :true}).select("-password")
    res.status(200).json({message: "user updated" , newUser})
}))

module.exports=router