import { Router } from "express";
import { getAckById } from "../controllers/ack.controller.js";

const router = Router()

router.route("/:messageID").get(getAckById)

export default router