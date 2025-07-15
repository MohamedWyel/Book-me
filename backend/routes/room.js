const express =require("express")
const router =express.Router()
const asyncHandler =require("express-async-handler")
const Room =require("../models/Rooms")
const Hotel = require("../models/Hotels")

router.get('/' ,asyncHandler(async(req,res)=>{
    const rooms =await Room.find();
    res.status(201).json(rooms)
}))

router.get('/:id' ,asyncHandler(async(req,res)=>{
    const room =await Room.findById(req.params.id)
    if(!room){
        return res.status(404).json({message:"no room"})
    }
    res.status(201).json(room)
}))

router.get('/hotel/:id' ,asyncHandler(async(req,res)=>{
    const rooms =await Room.find({hotel:req.params.id})
    if(!rooms){
        return res.status(404).json({message:"no rooms found"})
    }
    res.status(201).json(rooms)
}))

router.post('/' ,asyncHandler(async(req,res)=>{
    const {number , type ,price ,hotel ,isAvailable,images,bed,meals} =req.body
    const existHotel =await Hotel.findById(hotel)
    if(!existHotel){
        return res.status(404).json({message :"there are no hotel to add room"})
    }
    const isRoom =await Room.findOne({number,hotel})
    if(isRoom){
        return res.status(404).json({message :"room already exist"})
    }
    const newRoom = new Room ({
        number,
        type,
        price,
        hotel,
        isAvailable,
        images,
        bed,
        meals
    })
    const add =await newRoom.save();
    res.status(201).json(add)
}))

router.put('/:id' ,asyncHandler(async(req,res)=>{
    const {number , type ,price ,hotel ,isAvailable,images,bed,meals} =req.body
    const existRoom =await Room.findById(req.params.id);
    if(!existRoom){
        return res.status(404).json({message:"no room to update"})
    }
    const updateRoom =await Room.findByIdAndUpdate(req.params.id,{
        $set:{
            number,
            type,
            price,
            hotel,
            isAvailable,
            images,
            bed,
            meals
        }
    },{new:true})
    res.status(201).json(updateRoom)
}))

router.delete("/:id" ,asyncHandler(async(req,res)=>{
    const existRoom =await Room.findById(req.params.id)
    if(!existRoom){
        return res.status(404).json({message:"no room to delete"})
    }
    const deletedRoom =await Room.findByIdAndDelete(req.params.id)
    res.status(201).json({message:"room deleted" ,deletedRoom})
}))

module.exports=router
