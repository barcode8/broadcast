import Ack from "../schemas/ack.schema.js";

export const createAckRecord = async ({messageId, consumer, ackStatus}) => {
    return await Ack.create({
        messageId,
        consumer,
        ackStatus
    })
}