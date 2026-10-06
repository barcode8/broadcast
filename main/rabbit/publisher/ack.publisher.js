import { getChannel } from "../connection.js";

export const publishAckStatus = async (ackStatus) => {
    const channel = getChannel()
    const message = Buffer.from(JSON.stringify(ackStatus));

    channel.publish(
        "ack",
        "ack.confirmation",
        message
    );

    console.log("Ack status published");
}