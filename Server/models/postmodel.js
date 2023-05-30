import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    photo:{
        data : Buffer,
        contentType : String,
    },
    likes:{
        type:Number,
        default:0,
    },
    dislikes:{
        type:Number,
        default:0,
    },
    comments:[
        {
            type:String,
            user : {type: mongoose.Schema.Types.ObjectId , ref:"User"},
        }
    ],
    user:{type:mongoose.Schema.Types.ObjectId , ref:'User'}
},
{timestamps:true},
)

postSchema.pre('find', function (next) {
    this.populate('user');
    next();
  });

export default mongoose.model('Post' , postSchema)