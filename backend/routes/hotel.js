const express =require("express")
const router =express.Router();
const asyncHandler= require("express-async-handler")
const Hotel =require("../models/Hotels")


router.get("/",asyncHandler(async(req,res)=>{
    const hotels =await Hotel.find();
    res.status(201).json(hotels)
}))

router.get("/:id" ,asyncHandler(async(req,res)=>{
    const hotel =await Hotel.findById(req.params.id);
    if(!hotel){
        return res.status(404).json({message:"not hotel found by this id"})
    }
    res.status(201).json(hotel);
}))

router.post("/",asyncHandler(async(req,res)=>{
    const {name,location,description,rating,images,isAvailable,features ,contactInfo}=req.body;
    const hotel =await Hotel.findOne({name})
    if(hotel){
        return res.status(404).json({message:"hotel already exist"})
    }
    const newHotel = new Hotel({
        name,
        location,
        description,
        rating,
        images,
        isAvailable,
        features,
        contactInfo
    })
    const saved= await newHotel.save();
    res.status(201).json(saved)
    
}))

router.put("/:id",asyncHandler(async(req,res)=>{
    const hotel =await Hotel.findById(req.params.id);
    if(!hotel){
        return res.status(404).json({message:"not hotel found by this id to update"})
    }
    const {name,location,description,rating,images,isAvailable,features ,contactInfo}=req.body;
    const updateHotel =await Hotel.findByIdAndUpdate(req.params.id ,{
        $set:{
            name,
            location,
            description,
            rating,
            images,
            isAvailable,
            features,
            contactInfo
        }
    },{new :true})
    res.status(201).json(updateHotel)
}))

router.delete("/:id" ,asyncHandler(async(req,res)=>{
    const hotel =await Hotel.findById(req.params.id);
    if(!hotel){
        return res.status(404).json({message:"not hotel found by this id to delete"})
    }
    const deletedHotel= await Hotel.findByIdAndDelete(req.params.id);
    res.status(201).json({message:"hotel deleted" ,deletedHotel})
}))

module.exports=router