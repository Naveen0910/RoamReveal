import mongoose from "mongoose";


const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    image: {
      type: String,
      required: true,
    },

    creator: {
      type:mongoose.Types.ObjectId,
      required:true,
      ref:'User'
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
