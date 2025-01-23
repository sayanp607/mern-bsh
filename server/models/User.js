import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  phone: {
  type: String, // Phone stored as a string
  required: true, // Make it mandatory
  unique: true, // Ensure phone numbers are unique
},
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
  },
  isLoggedIn:
   { 
    type: Boolean,
     default: false
     },
  role:{
    type:String,
    default:"user",
  },
  mainrole:{
    type:String,
    default:"user",
  },
  subscription:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Courses",
  }],
  resetPasswordExpire : Date,
  score: {
    type: Number,
    default: 0, // Default score is 0 for all users
  },
},
{timestamps:true,
})

export const User = mongoose.model("User",schema)