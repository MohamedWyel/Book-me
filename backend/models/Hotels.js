const mongoose =require("mongoose")

const HotelSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    location:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    rating:{
        type:Number
    },
    images:{
        type:[String]
    },
    isAvailable:{
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available'
    },
     contactInfo:{
        phone:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        }

    },
    features:{
        type:[String]
    }
},{
    timestamps:true
})

module.exports =mongoose.model("Hotel" , HotelSchema);