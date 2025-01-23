import mongoose from "mongoose";

const liveClassSchema = new mongoose.Schema({
  link: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const LiveClass = mongoose.model("LiveClass", liveClassSchema);

export default LiveClass;
