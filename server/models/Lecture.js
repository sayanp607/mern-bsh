import mongoose from "mongoose";

const schema = new mongoose.Schema ({
  title:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
  video:{
    type:String,
    required:true,
  },
  course:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Courses",
    required:true,
  },
  subject: {
    type: String,
    enum: ["Mathematics", "Physics", "Chemistry"],
    required: true,
  },

  createdAt:{
    type:Date,
    default:Date.now(),
  },
  
  });

  export const Lecture = mongoose.model("Lecture",schema)
 