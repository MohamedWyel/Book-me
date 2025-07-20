const express =require('express')
const router =express.Router();
const asyncHandler =require("express-async-handler")
const bycrpt =require('bcryptjs')
const User =require("../models/Users") 
const jwt =require('jsonwebtoken')


router.post('/register',asyncHandler(async(req ,res)=>{
    const {userName ,email ,role} =req.body;
    const checkEmail =await User.findOne({email:email})
    if(checkEmail){
        return res.status(400).json({message: "User already exist"})
    }
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!pattern.test(email)){
        return res.status(404).json({message:"email not vaild"})
    }
    passwordPattern=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
    if(!passwordPattern.test(req.body.password)){
        return res.status(404).json({message:"password not vaild"})
    }
    const salt = await bycrpt.genSalt(10)
    req.body.password = await bycrpt.hash(req.body.password ,salt)

    const newUser=  new User({
        userName,
        password:req.body.password,
        email,
        role
    })
    const result= await newUser.save();
    const token =jwt.sign({id:result._id, role:result.role},process.env.JWT_SECRET ,{expiresIn:"150d"});
    const {password ,...others} =result._doc
    res.status(201).json({...others ,token});
}))


router.post('/login' ,asyncHandler(async(req,res)=>{
    const checkEmail =await User.findOne({email:req.body.email})
    if(!checkEmail){
        return res.status(400).json({message :"user not exist"})
    }
    const isPassMatch = await bycrpt.compare(req.body.password,checkEmail.password);
    if(!isPassMatch){
        return res.status(400).json({message:"wrong password"})
    }
    const token =jwt.sign({id:checkEmail._id, role:checkEmail.role},process.env.JWT_SECRET ,{expiresIn:"150d"});
    const {password ,...others} =checkEmail._doc
    res.status(201).json({...others ,token});

}))

module.exports=router