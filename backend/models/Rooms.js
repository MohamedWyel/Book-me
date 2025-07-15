const mongoose =require("mongoose")

const RoomSchema = new mongoose.Schema({
    number:{
        type:Number,
        required:true,
    },
    type:{
        type: String,
        enum:["suit" ,"single" ,"double"],
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    hotel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hotel",
        required:true,
    },  
    isAvailable:{
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available'
    },
    images:[String],
    bed:{
        type:Number,
        required:true,
    },
    meals:{
        type:[String]
    }  

},{
    timestamps:true
})
RoomSchema.index({ number: 1, hotel: 1 }, { unique: true });

module.exports= mongoose.model("Room",RoomSchema)