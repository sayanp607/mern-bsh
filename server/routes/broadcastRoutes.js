import express from "express";
import { broadcastToLoggedInUsers } from "../controllers/broadcastController.js";

const router = express.Router();

router.post("/broadcast", broadcastToLoggedInUsers);

export default router;
