import { getChannel } from "../connection.js";

export const publishAdminMessages = async (broadcastMessage) => {
    const channel = getChannel()
    const message = Buffer.from(JSON.stringify(broadcastMessage));

    channel.publish(
        "broadcast",
        "broadcast.admin.message",
        message
    );

    console.log("Admin message published");
}

export const publishUserMessages = async (broadcastMessage) => {
    const channel = getChannel()
    const message = Buffer.from(JSON.stringify(broadcastMessage));

    channel.publish(
        "broadcast",
        "broadcast.user.message",
        message
    );

    console.log("User message published");
}