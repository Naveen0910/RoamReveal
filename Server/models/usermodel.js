import mongoose from 'mongoose'

const userModel = new mongoose.Schema({
    name : {
        type:String,
        required:true,
        length:50,
        trim : true,
    },

    username : {
        type: String,
        unique : true,
        length : 20,
        required: true,
        trim : true,

    },

    email : {
        type: String,
        unique:true,
        required: true,
        trim : true,
    },

    password : {
        type : String,
        trim : true,
        min: 6,
        max: 64,
    }
},
    {timestamps:true}
)

export default mongoose.model("User" , userModel)