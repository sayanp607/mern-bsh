import { User } from "../models/User.js";
import  Question  from "../models/Question.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {sendMail, sendForgotMail } from "../middlewares/sendMail.js";
import TryCatch from "../middlewares/TryCatch.js";
export const register = TryCatch(async (req, res) => {
  const { name, email, password, phone } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !password || !phone) {
    return res.status(400).json({
      message: "All fields (name, email, password, phone) are required.",
    });
  }

  // Check if the user already exists
  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  // Hash the password
  const hashPassword = await bcrypt.hash(password, 10);

  // Create a user object with the phone number included
  user = {
    name,
    email,
    password: hashPassword,
    phone,
  };

  const otp = Math.floor(Math.random() * 1000000);
  const activationToken = jwt.sign(
    {
      user,
      otp,
    },
    process.env.Activation_Secret,
    {
      expiresIn: "5m",
    }
  );

  const data = {
    name,
    otp,
  };

  await sendMail(email, "Bong Study Hub", data);

  res.status(200).json({
    message: "OTP sent to your email",
    activationToken,
  });
});



export const verifyUser = TryCatch(async (req, res) => {
  const { otp, activationToken } = req.body;
  const verify = jwt.verify(activationToken, process.env.Activation_Secret);

  if (!verify) {
    return res.status(400).json({
      message: "OTP expired",
    });
  }

  if (verify.otp !== otp) {
    return res.status(400).json({
      message: "Wrong OTP",
    });
  }

  await User.create({
    name: verify.user.name,
    email: verify.user.email,
    password: verify.user.password,
    phone: verify.user.phone, // Store the phone number
  });

  res.json({
    message: "User registered",
  });
});


export const loginUser = TryCatch(async (req, res) => {
  const { email, password, phone } = req.body;

  // Check if all fields are provided
  if (!email || !password || !phone) {
    return res.status(400).json({
      message: "All fields (email, password, phone) are required.",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "No user with this email exists",
    });
  }

  if (user.phone !== phone) {
    return res.status(400).json({
      message: "Phone number does not match our records",
    });
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    return res.status(400).json({
      message: "Wrong password",
    });
  }

  const token = jwt.sign({ _id: user._id }, process.env.Jwt_Sec, {
    expiresIn: "15d",
  });

  res.json({
    message: `Welcome back ${user.name}`,
    token,
    user,
  });
});



export const myProfile = TryCatch(async(req,res)=>{
  const user = await User.findById(req.user._id)

  res.json({user});
})

export const ForgotPassword = TryCatch(async(req,res) =>{
  const {email} = req.body;
  const user = await User.findOne({email});

  if(!user) {
    return res.status(404).json({
      message:"No user with this email",
    })
  }

  const token = jwt.sign({email}, process.env.Forgot_Secret);

  const data = {email,token};

  await sendForgotMail("Bong Study Hub",data);

  user.resetPasswordExpire = Date.now() + 5*60*1000;

  await user.save();

  res.json({
    message:"Reset password link sent to your email"
  })
})


export const resetPassword = TryCatch(async(req,res) =>{
  const decodedData = jwt.verify(req.query.token, process.env.Forgot_Secret);

  const user = await User.findOne({email: decodedData.email})
  if(!user){
    return res.status(404).json({
      message:"no user with this email",
    })
  }

  if(user.resetPasswordExpire === null){
    return  res.status(400).json({
        message:"Token expired",
    })
  }

  if(user.resetPasswordExpire < Date.now()){
    return  res.status(400).json({
        message:"Token expired",
    })
  }

  const password = await bcrypt.hash(req.body.password,10);

  user.password = password;

  user.resetPasswordExpire = null;

  await user.save();

  res.json({message:"Password reset."})
})

// Submit Answer and Calculate Score
export const submitAnswer = TryCatch(async (req, res) => {
  const { questionId, answer } = req.body;
  const userId = req.user._id; // Assuming `isAuth` middleware adds `user` to the request

  // Validate request data
  if (!questionId || answer === undefined) {
    return res.status(400).json({ message: "Question ID and answer are required." });
  }

  const user = await User.findById(userId);
  const question = await Question.findById(questionId);

  if (!question) {
    return res.status(404).json({ message: "Question not found" });
  }

  const isCorrect = question.correctOption === answer; // Ensure type consistency
  const marks = isCorrect ? 4 : -1;

  user.score += marks;
  await user.save();

  return res.status(200).json({
    message: isCorrect ? "Correct Answer!" : "Wrong Answer!",
    currentScore: user.score,
  });
});

// Get Leaderboard
export const getLeaderboard = TryCatch(async (req, res) => {
  const leaderboard = await User.find()
    .sort({ score: -1 }) // Sort by score in descending order
    .select("name email score") // Select fields to return
    .limit(10); // Limit to top 10 users

  res.status(200).json(leaderboard);
});
