import { getChannel } from "./connection.js";

export const sendAckConfirmation = async (ack) => {
    const channel = getChannel()
    const ackMessage = Buffer.from(JSON.stringify(ack))

    channel.publish(
        "ack",
        "ack.confirmation",
        ackMessage
    )

    console.log("Ack confirmation sent")
}