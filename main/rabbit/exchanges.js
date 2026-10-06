import { getChannel } from "./connection.js";

export const setupExchanges = async () => {
    const channel = getChannel();

    await channel.assertExchange("broadcast", "topic", {
        durable: true,
    });

    await channel.assertExchange("ack", "topic", {
        durable: true,
    });
};