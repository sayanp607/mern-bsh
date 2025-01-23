import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./database/db.js"
import Razorpay from "razorpay"
import cors from "cors"
dotenv.config()
import noteRoutes from "./routes/noteRoutes.js"
import paymentRoutes from './routes/paymentRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
// import userRoutes from './routes/userRoutes.js';
import liveClassRoutes from "./routes/liveClassRoutes.js";
import broadcastRoutes from "./routes/broadcastRoutes.js";


export const instance = new Razorpay({
  key_id : process.env.Razorpay_Key,
  key_secret: process.env.Razorpay_Secret,
})
const app = express()


//using middlewares
app.use(express.json());
app.use(cors());
const port = process.env.PORT

app.get('/', (req,res)=>{
  res.send("server is working")
})

app.use("/uploads",express.static("uploads"))
//import routes
import userRoutes from "./routes/user.js";
import courseRoutes from "./routes/course.js"
import adminRoutes from "./routes/admin.js"
//using routes
app.use("/api",userRoutes);
app.use("/api",courseRoutes);
app.use("/api",adminRoutes);
app.use("/api/notes", noteRoutes);
app.use('/api/questions', questionRoutes);
app.use("/api/liveclasses", liveClassRoutes);
app.use("/api", broadcastRoutes);
// app.use('/api/users', userRoutes);

// Payment Routes
app.use('/api', paymentRoutes);

app.listen(port, ()=>{
  console.log(`server is running on http://localhost:${port}`)
  connectDb()
})