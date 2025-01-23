import express from "express";
import { getLiveClasses, createLiveClass, deleteLiveClass } from "../controllers/liveClassController.js";
import { isAdmin, isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

// Route to fetch all live classes
router.get("/", isAuth, getLiveClasses);

// Route to add a new live class
router.post("/create", isAuth,isAdmin, createLiveClass);
//delete

router.delete("/delete/:id", isAuth,isAdmin, deleteLiveClass);

export default router;
