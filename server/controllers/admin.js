import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import {rm} from "fs";
import { promisify } from "util";
import fs from "fs";
import { User } from "../models/User.js";
export const createCourse = TryCatch(async(req,res) =>{
  const {title,description,category,createdBy,duration,price} = req.body;

  const image = req.file;

  await Courses.create({
    title,
    description,
    category,
    createdBy,
    image:image?.path,
    duration,
    price,
  })

  res.status(201).json({
    message:"Course created successfully"  });
});

// Add Lecture
export const addLectures = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);

  if (!course) {
    return res.status(404).json({
      message: "No course with this ID",
    });
  }

  const { title, description, subject } = req.body; // Include subject in destructuring
  const file = req.file;

  // Validate the subject field
  if (!["Mathematics", "Physics", "Chemistry"].includes(subject)) {
    return res.status(400).json({
      message: "Invalid subject. Must be one of Mathematics, Physics, or Chemistry.",
    });
  }

  const lecture = await Lecture.create({
    title,
    description,
    video: file?.path,
    course: course._id,
    subject, // Include subject in the lecture creation
  });

  res.status(201).json({
    message: "Lecture added successfully",
    lecture,
  });
});

// Delete Lecture
export const deleteLecture = TryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  if (!lecture) {
    return res.status(404).json({
      message: "Lecture not found",
    });
  }

  // Remove video file
  rm(lecture.video, () => {
    console.log("Video deleted");
  });

  await lecture.deleteOne();

  res.json({
    message: "Lecture Deleted",
  });
});

const unlinkAsync = promisify(fs.unlink);

export const deleteCourse = TryCatch(async(req,res)=>{
  const course = await Courses.findById(req.params.id);

  const lectures = await Lecture.find({course: course._id});
  await Promise.all(
    lectures.map(async(lecture)=>{
      await unlinkAsync(lecture.video);
      console.log("video deleted");
    })
  )
  rm(course.image, ()=>{
    console.log("image deleted");
  })
  await Lecture.find({course: req.params.id}).deleteMany()
  await course.deleteOne()

  await User.updateMany({}, {$pull : {subsciption:req.params.id}});

  res.json({
    message:"Course deleted",
  })
})


export const getAllStats = TryCatch(async(req,res)=>{
  const totalCourses = (await Courses.find()).length;
  const totalLectures = (await Lecture.find()).length;
  const totalUsers = (await User.find()).length;

  const stats={
    totalCourses,totalLectures,totalUsers,
  };

  res.json({
    stats,
  })
})
export const getAllUser = TryCatch(async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user._id } }).select(
    "-password"
  );

  res.json({ users });
});

export const updateRole = TryCatch(async (req, res) => {
if(req.user.mainrole !== 'superadmin'){
  return res.status(403).json({
    message:"This endpoint is assign to superadmin only."
  })
}

  const user = await User.findById(req.params.id);

  if (user.role === "user") {
    user.role = "admin";
    await user.save();

    return res.status(200).json({
      message: "Role updated to admin",
    });
  }

  if (user.role === "admin") {
    user.role = "user";
    await user.save();

    return res.status(200).json({
      message: "Role updated",
    });
  }
});