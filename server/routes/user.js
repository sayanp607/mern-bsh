import express from "express"
import { ForgotPassword, loginUser, myProfile, register, resetPassword, verifyUser,  submitAnswer,
  getLeaderboard  } from "../controllers/user.js";
import { isAuth } from "../middlewares/isAuth.js";
import { addProgress, getYourProgress } from "../controllers/course.js";

const router = express.Router();

router.post('/user/register', register)
router.post('/user/verify',verifyUser)
router.post('/user/login',loginUser)
router.get('/user/me',isAuth,myProfile)
router.post('/user/forgot', ForgotPassword)
router.post('/user/reset', resetPassword)
router.post('/user/progress', isAuth,addProgress)
router.get('/user/progress', isAuth,getYourProgress)
// New routes
router.post("/user/answer", isAuth, submitAnswer); // Submit an answer
router.get("/user/leaderboard", getLeaderboard); // get leaderboard
export default router;