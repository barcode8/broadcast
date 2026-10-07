import { getChannel } from "./connection.js";

export const setupBindings = async () => {
    const channel = getChannel();

    await channel.bindQueue(
        "admin.queue",
        "broadcast",
        "broadcast.*"
    );

    await channel.bindQueue(
        "user1.queue",
        "broadcast",
        "broadcast.user.*"
    );

    await channel.bindQueue(
        "user2.queue",
        "broadcast",
        "broadcast.user.*"
    );

    await channel.bindQueue(
        "ack.queue",
        "ack",
        "ack.confirmation"
    );
};