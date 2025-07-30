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

router.get("/search/:searchItem",asyncHandler(async(req,res)=>{
        const isRating = !isNaN(Number(req.params.searchItem));
        const q={
            $or:[
                {name:{$regex:req.params.searchItem ,$options:"i"}},
                {location:{$regex:req.params.searchItem ,$options:"i"}},
            ]
        }
        if(isRating){
            q.$or.push({rating:Number(req.params.searchItem)});
        }
    const hotels =await Hotel.find(q);

    if(hotels.length===0||!hotels){
        return res.status(400).json({message:"no hotel found"})
    }
    res.status(200).json(hotels)
}))

router.get("/filter/:sort", asyncHandler(async (req, res) => {
    let sortOption = {};

    if (req.params.sort === "htl") {
        sortOption = { avgPrice: -1 }; 
    } else if (req.params.sort === "lth") {
        sortOption = { avgPrice: 1 }; 
    }
    else if(req.params.sort==="rhtl"){
        sortOption = { rating: -1 };
    }
    else if(req.params.sort==="rltl"){
        sortOption = { rating: 1 };
    }

    const hotels = await Hotel.find({}).sort(sortOption);
    return res.status(200).json(hotels);
}));

module.exports=router