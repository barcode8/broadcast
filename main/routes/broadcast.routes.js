import { Router } from "express";
import { broadcastMessage, getAllMessages } from "../controllers/broadcast.controller.js";

const router = Router()

router.route("/").post(broadcastMessage)
router.route("/").get(getAllMessages)

export default router