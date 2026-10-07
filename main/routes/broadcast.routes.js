import { Router } from "express";
import { broadcastMessage } from "../controllers/broadcast.controller.js";

const router = Router()

router.route("/").post(broadcastMessage)

export default router