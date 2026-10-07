import Message from "../schemas/message.schema.js";
import { publishUserMessages, publishAdminMessages } from "../rabbit/publisher/broadcast.publisher.js";

export const broadcastMessage = async (req, res) => {
    const {content, clearance} = req.body

    const trimmedContent = content.trim()
    const normalisedClearance = clearance.toString().trim().toLowerCase()

    if(normalisedClearance !== "user" && normalisedClearance !== "admin"){
        return res
        .status(400)
        .json({
            success : false,
            response : "Pick from user or admin"
        })
    }

    const message = await Message.create({
        content : trimmedContent,
        clearance : normalisedClearance
    })

    if(normalisedClearance === "user"){
        publishUserMessages(message)
        publishAdminMessages(message)
        return res
        .status(201)
        .json({
            success : true,
            response : "Message sent for broadcasting",
            message
        })
    }

    if(normalisedClearance === "admin"){
        publishAdminMessages(message)
        return res
        .status(201)
        .json({
            success : true,
            response : "Message sent for broadcasting",
            message
        })
    }

    return res
    .status(400)
    .json({
        success : false,
        response : "Broadcast failed"
    })
}

export const getAllMessages = async (req, res) => {
    const messages = await Message.find()

    if(!messages){
        return res
        .status(404)
        .json({
            success : false,
            message : "Failed to find messages"
        })
    }

    return res
    .status(200)
    .json({
        success : true,
        message : "Messages successfully found",
        messages
    })
}

