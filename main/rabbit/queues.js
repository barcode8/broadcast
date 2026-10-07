import { getChannel } from "./connection.js";

export const setupQueues = async () => {
    const channel = getChannel();

    await channel.assertQueue("admin.queue", {
        durable: true,
    });

    await channel.assertQueue("user1.queue", {
        durable: true,
    });

    await channel.assertQueue("user2.queue", {
        durable: true,
    });

    await channel.assertQueue("ack.queue", {
        durable: true
    })
};