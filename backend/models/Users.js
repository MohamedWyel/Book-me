const mongoose =require('mongoose')

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        maxLength:200,
        minLength:3,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:8,
    },
    role:{
        type:String,
        enum:[
            "admin",
            "guest"
        ],
        default:"guest"
    }

} ,{
    timestamps:true
})
module.exports=mongoose.model("User",userSchema)