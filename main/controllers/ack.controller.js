import Ack from "../schemas/ack.schema.js"

export const getAckById = async(req, res) => {
    const {messageID} = req.params

    const ackRecord = await Ack.find({
        messageId : messageID
    })

    if(!ackRecord){
        return res
        .status(404)
        .json({
            success : false,
            message : "Failed to find acknowledgement records for this message"
        })
    }

    return res
    .status(200)
    .json({
        success : true,
        message : "Successfully found acknowledgement records for this message",
        ackRecord
    })
}