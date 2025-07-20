const express = require("express")
const router =express.Router()
const asyncHandler =require("express-async-handler")
const Booking =require("../models/Booking")
const Room =require("../models/Rooms")
const User=require("../models/Users")

router.post('/' ,asyncHandler(async(req,res)=>{
    const {roomId,userId,checkIn,checkOut,status,paymentMethod,isPaid }=req.body
    const room =await Room.findById(roomId)
    if(!room){
        return res.status(400).json({message:"no room"})
    }
    const user =await User.findById(userId)
    if(!user){
        return res.status(400).json({message:"no user"})
    }
    const startDate =new Date(checkIn)
    const endDate =new Date(checkOut)
    if(startDate>endDate){
        return res.status(404).json({message:"check out must be after check in"})
    }
    const days= (endDate-startDate)/(1000*60*60*24)
    const totalPrice =days * room.price;

    const booked =await Booking.find(
        {roomId,
        checkIn:{$lt:checkOut},
        checkOut:{$gt:checkIn}
        }
    )
    if(booked.length!==0){
        return res.status(400).json({message:"room already booked"})
    }

    const book = new Booking({
    roomId,
    userId,
    checkIn,
    checkOut,
    status,
    paymentMethod,
    isPaid,
    totalPrice
    })
    await book.save()
    return res.status(200).json({message:"booking successful",book})

}))

router.get('/:userId',asyncHandler(async(req,res)=>{
    const user =await User.findById(req.params.userId)
    if(!user){
        return res.status(400).json({message:"user not exist"})
    }
    const userBooking =await Booking.find({userId:req.params.userId,status:{$ne:"cancelled"}})
    if(!userBooking){
        return res.status(400).json({message:"user have not booking"})
    }
    res.status(200).json({userBooking})
}))

router.put('/confirm',asyncHandler(async(req,res)=>{
    const {userId,roomId}=req.body
    const room =await Room.findById(roomId)
    if(!room){
        return res.status(400).json({message:"no room"})
    }
    const user =await User.findById(userId)
    if(!user){
        return res.status(400).json({message:"no user"})
    }
    const roomUser =await Booking.find({userId ,roomId})
    if(roomUser.length===0){
        return res.status(400).json({message:"no booking"})
    }
    const updated =await Booking.findOneAndUpdate(
        {userId ,roomId},
        {status:"confirmed",isPaid:true},
        {new :true}
    )
    res.status(200).json({message :"confirmed" ,updated})
    
}))

router.put('/cancel',asyncHandler(async(req,res)=>{
     const {userId,roomId}=req.body
    const room =await Room.findById(roomId)
    if(!room){
        return res.status(400).json({message:"no room"})
    }
    const user =await User.findById(userId)
    if(!user){
        return res.status(400).json({message:"no user"})
    }
    const roomUser =await Booking.findOne({userId ,roomId})
    if(!roomUser){
        return res.status(400).json({message:"no booking to cancel"})
    }
    if(roomUser.isPaid){
        return res.status(400).json({message:"cannot cancel u paid"})

    }
    const updated =await Booking.findOneAndUpdate(
        {userId ,roomId},
        {status:"cancelled"},
        {new :true}
    )
    res.status(200).json({message :"cancelled" ,updated})
    
}))



module.exports=router